package br.com.cwi.api.service;

import br.com.cwi.api.controller.request.EditarUsuarioRequest;
import br.com.cwi.api.security.controller.response.UsuarioResponse;
import br.com.cwi.api.mapper.UsuarioMapper;
import br.com.cwi.api.repository.UsuarioRepository;
import br.com.cwi.api.security.domain.Usuario;
import br.com.cwi.api.security.service.UsuarioAutenticadoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class EditarUsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UsuarioAutenticadoService usuarioAutenticadoService;

    public UsuarioResponse editar(EditarUsuarioRequest request) {

        Usuario usuarioAutenticado = usuarioAutenticadoService.get();

        usuarioAutenticado.setNome(request.getNome());
        usuarioAutenticado.setTelefone(request.getTelefone());
        usuarioAutenticado.setEmail(request.getEmail());
        usuarioAutenticado.setSenha(passwordEncoder.encode(request.getSenha()));
        usuarioAutenticado.setFoto(request.getFoto());
        usuarioAutenticado.setAtualizadoEm(LocalDateTime.now());

        usuarioRepository.save(usuarioAutenticado);

        return UsuarioMapper.toResponse(usuarioAutenticado);
    }
}
