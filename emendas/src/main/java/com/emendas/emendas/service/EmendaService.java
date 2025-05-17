package com.emendas.emendas.service;

import com.emendas.emendas.dto.EmendaDTO;
import com.emendas.emendas.model.Emenda;
import com.emendas.emendas.repository.EmendaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EmendaService {

    private final EmendaRepository repository;

    public EmendaService(EmendaRepository repository) {
        this.repository = repository;
    }

    public List<EmendaDTO> listarTodas() {
        return repository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<EmendaDTO> buscarPorId(Long id) {
        return repository.findById(id)
                .map(this::toDTO);
    }

    public EmendaDTO salvar(Emenda dto) {
        Emenda emenda = toEntity(dto);
        Emenda salva = repository.save(emenda);
        return toDTO(salva);
    }

    public EmendaDTO atualizar(Long id, Emenda novaEmendaDTO) {
        return repository.findById(id).map(emenda -> {
            emenda.setNumero(novaEmendaDTO.getNumero());
            emenda.setAutor(novaEmendaDTO.getAutor());
            emenda.setDescricao(novaEmendaDTO.getDescricao());
            emenda.setValor(novaEmendaDTO.getValor());
            emenda.setStatus(novaEmendaDTO.getStatus());
            emenda.setObjetivo(novaEmendaDTO.getObjetivo());
            emenda.setMunicipio(novaEmendaDTO.getMunicipio());
            emenda.setData(novaEmendaDTO.getData());
            Emenda atualizado = repository.save(emenda);
            return toDTO(atualizado);
        }).orElseThrow(() -> new RuntimeException("Emenda não encontrada com id " + id));
    }

    public void excluir(Long id) {
        repository.deleteById(id);
    }

    // Conversão de DTO para Entidade
    private Emenda toEntity(Emenda dto) {
        return Emenda.builder()
                .id(dto.getId())
                .numero(dto.getNumero())
                .autor(dto.getAutor())
                .descricao(dto.getDescricao())
                .valor(dto.getValor())
                .status(dto.getStatus())
                .objetivo(dto.getObjetivo())
                .municipio(dto.getMunicipio())
                .data(dto.getData())
                .build();
    }

    // Conversão de Entidade para DTO
    private EmendaDTO toDTO(Emenda emenda) {
        return EmendaDTO.builder()
                .id(emenda.getId())
                .numero(emenda.getNumero())
                .autor(emenda.getAutor())
                .descricao(emenda.getDescricao())
                .valor(emenda.getValor())
                .status(emenda.getStatus())
                .objetivo(emenda.getObjetivo())
                .municipio(emenda.getMunicipio())
                .data(emenda.getData())
                .build();
    }
}
