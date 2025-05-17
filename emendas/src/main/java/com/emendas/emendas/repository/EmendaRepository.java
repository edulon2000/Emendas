package com.emendas.emendas.repository;

import com.emendas.emendas.model.Emenda;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmendaRepository extends JpaRepository<Emenda, Long> {
}
