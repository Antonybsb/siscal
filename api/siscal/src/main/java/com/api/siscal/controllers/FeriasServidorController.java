package com.api.siscal.controllers;

import com.api.siscal.models.FeriasAfastamento;
import com.api.siscal.services.FeriasServidorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin
@RequestMapping(value = "/ferias-servidor")
public class FeriasServidorController {


    //A anotação @Autowired não é mais considerado
    // uma boa prática para injeção de dependência de atributos obrigatórios.
    // Desde a versão 4 do Spring a prática recomendada é o uso de injeção de dependência por construtor
    FeriasServidorService feriasServidorService;

    public FeriasServidorController(FeriasServidorService feriasServidorService) {
        this.feriasServidorService = feriasServidorService;
    }

    @GetMapping
    public List findAll () {
        return feriasServidorService.getAllNomes();

    }

    @GetMapping("/siglas")
    public Set<String> getSiglas() {
        return new HashSet<>(feriasServidorService.getServidorDivisao());
        }


    @GetMapping("/divisao/sigla/{sigla}")
    public ResponseEntity<List<String>> getServidorDepartamento(@PathVariable String sigla) {
        List<String> nomes = feriasServidorService.getServidorDepartamento(sigla);
        return ResponseEntity.ok(nomes);
    }


//    @GetMapping("/servidor-divisao")
//    public ResponseEntity<List<String>> getServidorDivisao() {
//        List<String> nomes = feriasServidorService.getServidorDivisao();
//        return ResponseEntity.ok(nomes);
//    }

    @GetMapping("/divisao/codigo/{codigo}")
    public ResponseEntity<List<String>> getServidoresCodigo(@PathVariable BigDecimal codigo) {
        List<String> nomes = feriasServidorService.getServidoresCodigo(codigo);
        return ResponseEntity.ok(nomes);
    }

//    @GetMapping("/{servidorId}/tipos-afastamentos")
//    public ResponseEntity<List<String>> obterTiposAfastamentos(@PathVariable int servidorId) {
//        List<String> tiposAfastamentos = feriasServidorService.obterTiposAfastamentosPorServidor(servidorId);
//        return ResponseEntity.ok(tiposAfastamentos);
//    }




    }

