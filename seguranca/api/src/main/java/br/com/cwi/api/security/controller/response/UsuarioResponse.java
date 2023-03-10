package br.com.cwi.api.security.controller.response;

import lombok.*;

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
}
