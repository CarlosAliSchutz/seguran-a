package br.com.cwi.api.controller.request;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
public class SenhaNovaRequest {

    @Email(message = "E-mail precisa ser válido.")
    @NotBlank(message = "Preencha o campo e-mail.")
    private String email;
}
