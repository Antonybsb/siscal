package com.api.siscal.repositories;

import com.api.siscal.models.FeriasAfastamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeriasAfastamentoRepository extends JpaRepository<FeriasAfastamento, Integer> {
}
