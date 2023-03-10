package br.com.cwi.api.security.controller.request;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class UsuarioRequest {

    @NotBlank(message = "Nome não pode ser vazio.")
    private String nome;

    @NotBlank(message = "Telefone não pode ser vazio.")
    private String telefone;

    @NotNull(message = "Email não pode ser vazio.")
    @Email
    private String email;

    @NotBlank(message = "Senha não pode ser vazio.")
    private String senha;

    @NotNull(message = "Foto não pode ser vazio.")
    private String foto;
}
