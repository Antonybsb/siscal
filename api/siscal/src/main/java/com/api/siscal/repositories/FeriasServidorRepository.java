package com.api.siscal.repositories;

import com.api.siscal.models.FeriasServidor;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface FeriasServidorRepository extends JpaRepository<FeriasServidor, Integer> {
    @Query("SELECT f.nome FROM FeriasServidor f")
    List<String> getAllNomes();

    @Query("SELECT f.nome FROM FeriasServidor f WHERE f.sigla = :sigla")
    List<String> getServidorDepartamento(@Param("sigla") String sigla);

//    @Query("SELECT f.nome FROM FeriasServidor f WHERE f.sigla IN ('DTI//DST', 'DTI//DDS', 'DTI//DO')")
//    List<String> getServidorDivisao();

    @Query("SELECT f.nome FROM FeriasServidor f WHERE f.codigo = :codigo")
    List<String> getServidorCodigo(@Param("codigo") Number codigo);

    @Query("SELECT f.sigla FROM FeriasServidor f WHERE f.sigla IN ('DTI/DST', 'DTI/DDS', 'DTI/DO')")
    List<String> getServidorDivisao();


}
