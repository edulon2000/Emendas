package com.emendas.emendas.model;

import com.emendas.emendas.enums.Status;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
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
@Table(name = "emenda")
public class Emenda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 100, unique = true)
    private String numero;
    private String autor;
    private String descricao;
    @Positive
    private double valor;
    @Enumerated(EnumType.STRING) // ou ORDINAL, veja observação abaixo
    private Status status;
    private String municipio;
    @PastOrPresent
    private LocalDate data;
}