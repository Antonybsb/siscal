package com.api.siscal.repositories;

import com.api.siscal.models.FeriasAfastamento;
import com.api.siscal.models.FeriasAfastamentoPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface FeriasAfastamentoRepository extends JpaRepository<FeriasAfastamento, FeriasAfastamentoPK> {
    @Query("SELECT af FROM FeriasAfastamento af WHERE af.servidor = :servidor")
    List<FeriasAfastamento> findByServidor(@Param("servidor") int servidor);

    @Query("SELECT afastamento FROM FeriasAfastamento afastamento WHERE afastamento.servidor = :servidor AND afastamento.exercicioAno = :ano")
    List<FeriasAfastamento> findByAfastamentosAnoAndServidor(@Param("servidor") int servidor, @Param("ano") int ano);

    @Query("SELECT a FROM FeriasAfastamento a JOIN a.feriasTipoAfastamento fta JOIN FeriasServidor fs ON a.servidor = fs.servidor WHERE a.exercicioAno = :exercicioAno AND fs.codigo = :codigo")
    List<FeriasAfastamento> buscarAfastamentosPorAnoECodigo(@Param("exercicioAno") int exercicioAno, @Param("codigo") BigDecimal codigo);

}











