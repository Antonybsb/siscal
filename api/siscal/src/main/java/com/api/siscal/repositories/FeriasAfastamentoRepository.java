package com.api.siscal.repositories;

import com.api.siscal.models.FeriasAfastamento;
import com.api.siscal.models.FeriasAfastamentoPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeriasAfastamentoRepository extends JpaRepository<FeriasAfastamento, FeriasAfastamentoPK> {
    @Query("SELECT af FROM FeriasAfastamento af WHERE af.servidor = :matricula")
    List<FeriasAfastamento> findByMatricula(@Param("matricula") int matricula);
}