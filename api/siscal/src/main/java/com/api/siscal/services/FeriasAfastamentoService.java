package com.api.siscal.services;

import com.api.siscal.models.FeriasAfastamento;
import com.api.siscal.repositories.FeriasAfastamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeriasAfastamentoService {


    FeriasAfastamentoRepository feriasAfastamentoRepository;

    @Autowired
    public FeriasAfastamentoService(FeriasAfastamentoRepository feriasAfastamentoRepository) {
        this.feriasAfastamentoRepository = feriasAfastamentoRepository;
    }

    public List<FeriasAfastamento> buscarAfastamentosPorMatricula(int matricula) {
        return feriasAfastamentoRepository.findByMatricula(matricula);
    }








}