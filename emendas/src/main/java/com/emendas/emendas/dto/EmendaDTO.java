package com.emendas.emendas.dto;

import com.emendas.emendas.enums.Status;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmendaDTO {

    private Long id;

    @NotBlank(message = "Número é obrigatório")
    private String numero;

    @NotBlank(message = "Descrição é obrigatória")
    private String descricao;

    @NotBlank(message = "Autor é obrigatório")
    private String autor;

    @NotNull(message = "Valor é obrigatório")
    @PositiveOrZero(message = "Valor deve ser zero ou positivo")
    private Double valor;  // Wrapper para poder validar NotNull

    @NotNull(message = "Status é obrigatório")
    private Status status;


    @NotBlank(message = "Objetivo é obrigatório")
    private String objetivo;

    @NotBlank(message = "Município é obrigatório")
    private String municipio;

    @NotNull(message = "Data é obrigatória")
    private LocalDate data;
}
