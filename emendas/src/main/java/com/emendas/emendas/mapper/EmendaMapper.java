package com.emendas.emendas.mapper;

import com.emendas.emendas.dto.EmendaDTO;
import com.emendas.emendas.model.Emenda;

public class EmendaMapper {

    public static EmendaDTO toDTO(EmendaDTO emenda) {
        EmendaDTO dto = new EmendaDTO();
        dto.setId(emenda.getId());
        dto.setNumero(emenda.getNumero());
        dto.setAutor(emenda.getAutor());
        dto.setDescricao(emenda.getDescricao());
        dto.setValor(emenda.getValor());
        dto.setStatus(emenda.getStatus());
        dto.setObjetivo(emenda.getObjetivo());
        dto.setMunicipio(emenda.getMunicipio());
        dto.setData(emenda.getData());
        return dto;
    }

    public static Emenda toEntity(EmendaDTO dto) {
        Emenda emenda = new Emenda();
        emenda.setId(dto.getId());
        emenda.setNumero(dto.getNumero());
        emenda.setAutor(dto.getAutor());
        emenda.setDescricao(dto.getDescricao());
        emenda.setValor(dto.getValor());
        emenda.setStatus(dto.getStatus());
        emenda.setObjetivo(dto.getObjetivo());
        emenda.setMunicipio(dto.getMunicipio());
        emenda.setData(dto.getData());
        return emenda;
    }
}
