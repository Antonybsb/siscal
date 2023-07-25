package com.api.siscal.dtos;

import jakarta.persistence.Column;

import java.math.BigDecimal;

public class FeriasServidorDTO {

    private String nome;
    private String sigla;
    private BigDecimal codigo;
    private int matricula;
    private int servidor;

    public FeriasServidorDTO(String nome, String sigla, BigDecimal codigo, int matricula, int servidor) {
        this.nome = nome;
        this.sigla = sigla;
        this.codigo = codigo;
        this.matricula = matricula;
        this.servidor = servidor;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSigla() {
        return sigla;
    }

    public void setSigla(String sigla) {
        this.sigla = sigla;
    }

    public BigDecimal getCodigo() {
        return codigo;
    }

    public void setCodigo(BigDecimal codigo) {
        this.codigo = codigo;
    }

    public int getMatricula() {
        return matricula;
    }

    public void setMatricula(int matricula) {
        this.matricula = matricula;
    }

    public int getServidor() {
        return servidor;
    }

    public void setServidor(int servidor) {
        this.servidor = servidor;
    }
}


