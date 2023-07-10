package com.api.siscal.controllers;

import com.api.siscal.services.FeriasAfastamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(value = "/ferias-servidor")

public class FeriasAfastamentoController {

    private final FeriasAfastamentoService feriasAfastamentoService;

    @Autowired
    public FeriasAfastamentoController(FeriasAfastamentoService feriasAfastamentoService) {
        this.feriasAfastamentoService = feriasAfastamentoService;
    }

//    @GetMapping("/calendario/{ano}")
//    public void gerarCalendario(@PathVariable int ano) {
//        feriasAfastamentoService.gerarCalendario(ano);
//    }

}
