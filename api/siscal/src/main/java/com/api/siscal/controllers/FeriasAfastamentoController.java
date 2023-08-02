package com.api.siscal.controllers;

import com.api.siscal.models.FeriasAfastamento;
import com.api.siscal.services.FeriasAfastamentoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/ferias-servidor")

public class FeriasAfastamentoController {

    private final FeriasAfastamentoService feriasAfastamentoService;


    public FeriasAfastamentoController(FeriasAfastamentoService feriasAfastamentoService) {
        this.feriasAfastamentoService = feriasAfastamentoService;
    }

    @GetMapping("/afastamentos")
    public ResponseEntity<List<FeriasAfastamento>> buscarAfastamentos() {
        List<FeriasAfastamento> afastamentos = feriasAfastamentoService.buscarAfastamentos();

        if (afastamentos.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(afastamentos);
        }
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

    @GetMapping("/afastamentos/{servidor}/{ano}")
    public ResponseEntity<List<FeriasAfastamento>> buscarAfastamentosPorServidorEAno(
            @PathVariable int servidor, @PathVariable int ano
    ) {
        List<FeriasAfastamento> afastamentos = feriasAfastamentoService.buscarAfastamentosPorServidorEAno(servidor, ano);
        if (afastamentos.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(afastamentos);
        }
    }

    @GetMapping("/{ano}/afastamentos/{codigo}")
    public ResponseEntity<List<FeriasAfastamento>> buscarAfastamentosPorAnoECodigo(@PathVariable int ano, @PathVariable BigDecimal codigo) {
        List<FeriasAfastamento> afastamentos = feriasAfastamentoService.buscarAfastamentosPorAnoECodigo(ano, codigo);

        if (afastamentos.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(afastamentos);
        }
    }





}