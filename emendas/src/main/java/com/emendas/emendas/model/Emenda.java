package com.emendas.emendas.model;

import com.emendas.emendas.enums.Status;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Emenda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String numero;
    private String autor;
    private String descricao;
    private double valor;
    @Enumerated(EnumType.STRING) // ou ORDINAL, veja observação abaixo
    private Status status;
    private String municipio;
    private LocalDate data;
}