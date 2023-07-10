package com.api.siscal.services;

import com.api.siscal.models.FeriasAfastamento;
import com.api.siscal.repositories.FeriasAfastamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.Month;
import java.time.format.TextStyle;
import java.util.Locale;
import java.util.Optional;

@Service
public class FeriasAfastamentoService {

    @Autowired
    FeriasAfastamentoRepository feriasAfastamentoRepository;

    public FeriasAfastamentoService(FeriasAfastamentoRepository feriasAfastamentoRepository) {
        this.feriasAfastamentoRepository = feriasAfastamentoRepository;
    }

    public Optional<FeriasAfastamento> findById(int id) {
        return  feriasAfastamentoRepository.findById(id);
    }








}
