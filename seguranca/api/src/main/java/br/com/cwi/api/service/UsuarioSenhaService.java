package br.com.cwi.api.service;

import br.com.cwi.api.controller.request.SenhaNovaRequest;
import br.com.cwi.api.domain.SenhaToken;
import br.com.cwi.api.repository.UsuarioRepository;
import br.com.cwi.api.security.domain.Usuario;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.token.KeyBasedPersistenceTokenService;
import org.springframework.security.core.token.SecureRandomFactoryBean;
import org.springframework.security.core.token.Token;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.time.Duration;
import java.time.Instant;
import java.util.Base64;
import java.util.Date;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Service
@RequiredArgsConstructor
public class UsuarioSenhaService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private BuscarUsuarioService buscarUsuarioService;

    @Autowired
    private EmailService emailService;

    @SneakyThrows
    public void gerarToken(SenhaNovaRequest request) {
        Usuario usuario = buscarUsuarioService.buscarUsuario(request.getEmail());

        KeyBasedPersistenceTokenService tokenService = getInstanceFor(usuario);

        Token token = tokenService.allocateToken(usuario.getEmail());

        emailService.enviar(request.getEmail(),
                "Solicitação de recuperação de senha",
                "Pode redefinir sua senha acessando este link: http://localhost:3000/redefinir-senha/" + token.getKey());
    }

    private KeyBasedPersistenceTokenService getInstanceFor(Usuario usuario) throws Exception {
        KeyBasedPersistenceTokenService tokenService = new KeyBasedPersistenceTokenService();

        tokenService.setServerSecret(usuario.getSenha());
        tokenService.setServerInteger(16);
        tokenService.setSecureRandom(new SecureRandomFactoryBean().getObject());
        return tokenService;
    }

    @SneakyThrows
    @Transactional
    public void trocarSenha(String novaSenha, String token) {
        SenhaToken senhaToken = readPublicData(token);

        if(isExpired(senhaToken)) {
            throw new ResponseStatusException(BAD_REQUEST, "Token expirado");
        }

        Usuario usuario = buscarUsuarioService.buscarUsuario(senhaToken.getEmail());

        KeyBasedPersistenceTokenService tokenService = this.getInstanceFor(usuario);
        tokenService.verifyToken(token);

        usuario.setSenha(this.passwordEncoder.encode(novaSenha));
        usuarioRepository.save(usuario);
    }

    private boolean isExpired(SenhaToken senhaToken) {
        Instant createdAt = new Date(senhaToken.getCriadoEm()).toInstant();
        Instant now = new Date().toInstant();
        return createdAt.plus(Duration.ofMinutes(5)).isBefore(now);
    }

    private SenhaToken readPublicData(String token) {
        String tokenDecoded = new String(Base64.getDecoder().decode(token));
        String[] tokenParts = tokenDecoded.split(":");
        Long timestamp = Long.parseLong(tokenParts[0]);
        String email = tokenParts[2];
        return new SenhaToken(email, timestamp);
    }
}
