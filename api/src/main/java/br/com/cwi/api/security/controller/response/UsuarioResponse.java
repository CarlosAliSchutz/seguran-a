package br.com.cwi.api.security.controller.response;

import lombok.*;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UsuarioResponse {

    private Long idUsuario;
    private String nome;
    private String telefone;
    private String email;
    private String foto;
    private List<String> funcao;
}
