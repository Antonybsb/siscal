package com.api.siscal.services;

import com.api.siscal.models.FeriasAfastamento;
import com.api.siscal.repositories.FeriasAfastamentoRepository;
import com.api.siscal.repositories.FeriasServidorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class FeriasServidorService {

    @Autowired
    FeriasServidorRepository feriasServidorRepository;
    FeriasAfastamentoRepository afastamentosRepository;

    public FeriasServidorService(FeriasServidorRepository feriasServidorRepository, FeriasAfastamentoRepository afastamentosRepository) {
        this.feriasServidorRepository = feriasServidorRepository;
        this.afastamentosRepository = afastamentosRepository;
    }

    public List<String> getServidorDivisao() {
        return feriasServidorRepository.getServidorDivisao();
    }

    public List<String> getServidorDepartamento(String siglaDepartamento) {
        return feriasServidorRepository.getServidorDepartamento(siglaDepartamento);
    }


    public List<String> getAllNomes() {
        return feriasServidorRepository.getAllNomes();
    }


    public List<String> getServidoresCodigo(BigDecimal codigo) {
        return feriasServidorRepository.getServidorCodigo(codigo);
    }

//    public List<String> obterTiposAfastamentosPorServidor(int servidorId) {
//        List<FeriasAfastamento> afastamentos = afastamentosRepository.findByServidor(servidorId);
//        List<String> tiposAfastamenos = new ArrayList<>();
//        for (FeriasAfastamento afastamento : afastamentos) {
//            String tipoAfastamento = afastamento.getFeriasTipoAfastamento().getDescricao();
//            tiposAfastamenos.add(tipoAfastamento);
//        }
//        return tiposAfastamenos;
//    }








}


/*

FeriasServidorService.
O Service é como um intermediário entre a Controller (que recebe as requisições) e o banco de dados.

O método getAllFeriasServidores() nesse Service tem a função de buscar todas as informações dos servidores de férias no banco de dados.

Primeiro, o método chama o repositório (feriasServidorRepository) para buscar todos os registros de servidores de férias no banco de dados.

Em seguida, ele percorre a lista de servidores de férias retornados do banco de dados e cria um novo objeto chamado FeriasServidorDTO.
Esse objeto contém apenas as informações que desejamos retornar, neste caso, o nome do servidor de férias.

Depois de criar o objeto FeriasServidorDTO com o nome do servidor, o método adiciona esse objeto a uma lista.

Por fim, quando todos os registros foram percorridos e adicionados à lista, o método retorna essa lista de objetos FeriasServidorDTO para a Controller,
que pode então enviar essa resposta de volta para quem fez a requisição.

Resumindo, o Service é responsável por buscar as informações no banco de dados e formatá-las de acordo com a necessidade. Neste caso,
ele busca os servidores de férias, extrai o nome deles e os encapsula em objetos FeriasServidorDTO, que são
retornados para a Controller. A Controller, por sua vez, pode enviar essa lista de nomes como resposta para quem fez a requisição.



*          +-----------------+
          |     Controller    |
           +-----------------+
                 |  |
        Recebe a requisição HTTP
                 |  |
          +-----------------+
          | FeriasServidorService |
          +-----------------+
                 |  |
        Faz a lógica de negócio
        (busca no banco de dados,
         formatação dos dados)
                 |  |
          +-----------------+
          | FeriasServidorRepository |
          +-----------------+
                 |  |
         Interage com o banco de dados
                 |  |
* */
