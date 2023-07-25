package com.api.siscal.controllers;

import com.api.siscal.models.FeriasAfastamento;
import com.api.siscal.services.FeriasAfastamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/ferias-servidor")

public class FeriasAfastamentoController {

    private final FeriasAfastamentoService feriasAfastamentoService;


    public FeriasAfastamentoController(FeriasAfastamentoService feriasAfastamentoService) {
        this.feriasAfastamentoService = feriasAfastamentoService;
    }

    @GetMapping("/{matricula}/afastamentos")
    public ResponseEntity<List<FeriasAfastamento>> buscarAfastamentosPorMatricula(@PathVariable int matricula) {
        List<FeriasAfastamento> afastamentos = feriasAfastamentoService.buscarAfastamentosPorMatricula(matricula);

        //Verifica se há afastamentos para a matrícula fornecida
        if (afastamentos.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(afastamentos);
        }
    }



}