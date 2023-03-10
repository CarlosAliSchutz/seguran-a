package br.com.cwi.api.service;

import br.com.cwi.api.security.controller.response.UsuarioResponse;
import br.com.cwi.api.repository.UsuarioRepository;
import br.com.cwi.api.security.domain.Usuario;
import br.com.cwi.api.security.service.UsuarioAutenticadoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import static br.com.cwi.api.mapper.UsuarioMapper.toResponse;
import static org.springframework.http.HttpStatus.UNPROCESSABLE_ENTITY;

@Service
public class BuscarUsuarioService {

    @Autowired
    private UsuarioAutenticadoService usuarioAutenticadoService;

    @Autowired
    private UsuarioRepository usuarioRepository;


    public UsuarioResponse buscar() {
        Usuario usuarioAutenticado = usuarioAutenticadoService.get();


        return toResponse(usuarioAutenticado);
    }

    public Usuario porId(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(UNPROCESSABLE_ENTITY, "Usuário não encontrado."));
    }

    public Usuario buscarUsuario(String email) {
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(UNPROCESSABLE_ENTITY, "Email não encontrado"));
    }
}
