package br.com.cwi.api.controller;


import br.com.cwi.api.controller.request.SenhaAtualizadaRequest;
import br.com.cwi.api.controller.request.SenhaNovaRequest;
import br.com.cwi.api.repository.UsuarioRepository;
import br.com.cwi.api.service.UsuarioSenhaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/email")
public class SenhaNovaController {

    @Autowired
    private UsuarioSenhaService usuarioSenhaService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/esqueci-senha")
    public void esqueciSenha(@RequestBody @Valid SenhaNovaRequest request) {
        usuarioSenhaService.gerarToken(request);
    }

    @PostMapping("/trocar-senha/{token}")
    public void trocarSenha(@Valid @RequestBody SenhaAtualizadaRequest request, @PathVariable String token) {
        usuarioSenhaService.trocarSenha(request.getSenha(), token);
    }

}
