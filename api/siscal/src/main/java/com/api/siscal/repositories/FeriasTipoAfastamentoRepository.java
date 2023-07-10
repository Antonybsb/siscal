package com.api.siscal.repositories;

import com.api.siscal.models.FeriasTipoAfastamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface FeriasTipoAfastamentoRepository extends JpaRepository<FeriasTipoAfastamento, Integer> {
}
