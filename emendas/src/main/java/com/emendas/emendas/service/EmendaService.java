package com.emendas.emendas.service;

import com.emendas.emendas.model.Emenda;
import com.emendas.emendas.repository.EmendaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmendaService {

    private final EmendaRepository repository;

    public EmendaService(EmendaRepository repository) {
        this.repository = repository;
    }

    public List<Emenda> listarTodas() {
        return repository.findAll();
    }

    public Optional<Emenda> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public Emenda salvar(Emenda emenda) {
        return repository.save(emenda);
    }

    public Emenda atualizar(Long id, Emenda novaEmenda) {
        return repository.findById(id).map(emenda -> {
            emenda.setTitulo(novaEmenda.getTitulo());
            emenda.setDescricao(novaEmenda.getDescricao());
            emenda.setAutor(novaEmenda.getAutor());
            emenda.setValor(novaEmenda.getValor());
            emenda.setData(novaEmenda.getData());
            emenda.setStatus(novaEmenda.getStatus());
            return repository.save(emenda);
        }).orElseThrow(() -> new RuntimeException("Emenda não encontrada com id " + id));
    }

    public void excluir(Long id) {
        repository.deleteById(id);
    }
}