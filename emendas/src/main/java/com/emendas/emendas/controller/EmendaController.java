package com.emendas.emendas.controller;

import com.emendas.emendas.dto.EmendaDTO;
import com.emendas.emendas.mapper.EmendaMapper;
import com.emendas.emendas.model.Emenda;
import com.emendas.emendas.service.EmendaService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/emendas")
@CrossOrigin(origins = "*")
public class EmendaController {

    private final EmendaService service;

    public EmendaController(EmendaService service) {
        this.service = service;
    }

    @GetMapping
    public List<EmendaDTO> listar() {
        return service.listarTodas()
                .stream()
                .map(EmendaMapper::toDTO)
                .collect(Collectors.toList());
    }
    @GetMapping("/{id}")
    public ResponseEntity<EmendaDTO> buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @PostMapping
    public EmendaDTO criar(@Valid @RequestBody EmendaDTO dto) {
        Emenda emenda = EmendaMapper.toEntity(dto);
        return EmendaMapper.toDTO(service.salvar(emenda));
    }

    @PutMapping("/{id}")
    public EmendaDTO atualizar(@PathVariable Long id, @Valid @RequestBody EmendaDTO dto) {
        EmendaDTO atualizada = service.atualizar(id, EmendaMapper.toEntity(dto));
        return EmendaMapper.toDTO(atualizada);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        service.excluir(id);
    }
}
