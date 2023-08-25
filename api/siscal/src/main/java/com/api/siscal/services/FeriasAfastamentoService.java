package com.api.siscal.services;

import com.api.siscal.models.FeriasAfastamento;
import com.api.siscal.repositories.FeriasAfastamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class FeriasAfastamentoService {


    FeriasAfastamentoRepository feriasAfastamentoRepository;

    @Autowired
    public FeriasAfastamentoService(FeriasAfastamentoRepository feriasAfastamentoRepository) {
        this.feriasAfastamentoRepository = feriasAfastamentoRepository;
    }

    public List<FeriasAfastamento> buscarAfastamentos() {
        return feriasAfastamentoRepository.findAll();
    }

    public List<FeriasAfastamento> buscarAfastamentosPorMatricula(int servidor) {
        return feriasAfastamentoRepository.findByServidor(servidor);
    }

    public List<FeriasAfastamento> buscarAfastamentosPorServidorEAno(int servidor, int ano) {
        return feriasAfastamentoRepository.findByAfastamentosAnoAndServidor(servidor, ano);
    }

    public List<FeriasAfastamento> buscarAfastamentosPorAnoECodigo(int exercicioAno, BigDecimal codigo) {
        return feriasAfastamentoRepository.buscarAfastamentosPorAnoECodigo(exercicioAno, codigo);
    }



}