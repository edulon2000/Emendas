package com.emendas.emendas.controller;

import com.emendas.emendas.model.Emenda;
import com.emendas.emendas.service.EmendaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/emendas")
@CrossOrigin(origins = "*")
public class EmendaController {

    private final EmendaService service;

    public EmendaController(EmendaService service) {
        this.service = service;
    }

    @GetMapping
    public List<Emenda> listar() {
        return service.listarTodas();
    }

    @PostMapping
    public Emenda criar(@RequestBody Emenda emenda) {
        return service.salvar(emenda);
    }

    @PutMapping("/{id}")
    public Emenda atualizar(@PathVariable Long id, @RequestBody Emenda emenda) {
        return service.atualizar(id, emenda);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        service.excluir(id);
    }
}