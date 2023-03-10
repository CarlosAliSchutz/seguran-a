package br.com.cwi.api.security.controller;

import br.com.cwi.api.controller.request.EditarUsuarioRequest;
import br.com.cwi.api.security.controller.request.UsuarioRequest;
import br.com.cwi.api.security.controller.response.UsuarioResponse;
import br.com.cwi.api.service.BuscarUsuarioService;
import br.com.cwi.api.service.EditarUsuarioService;
import br.com.cwi.api.service.IncluirUsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private IncluirUsuarioService incluirUsuarioService;

    @Autowired
    private BuscarUsuarioService buscarUsuarioService;

    @Autowired
    private EditarUsuarioService editarUsuarioService;

    @PostMapping
    @ResponseStatus(CREATED)
    public UsuarioResponse incluir(@Valid @RequestBody UsuarioRequest request) {
        return incluirUsuarioService.incluir(request);
    }

    @GetMapping("/me")
    @ResponseStatus(OK)
    public UsuarioResponse buscar() {
        return buscarUsuarioService.buscar();
    }

    @PutMapping
    @ResponseStatus(OK)
    public UsuarioResponse editar(@Valid @RequestBody EditarUsuarioRequest request) {
        return editarUsuarioService.editar(request);
    }
}
