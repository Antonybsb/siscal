package com.api.siscal.dtos;

import java.math.BigDecimal;

public class FeriasServidorDTO {

    private String nome;
    private String sigla;
    private BigDecimal codigo;
    private int matricula;

    public FeriasServidorDTO(String nome, String sigla, BigDecimal codigo, int matricula) {
        this.nome = nome;
        this.sigla = sigla;
        this.codigo = codigo;
        this.matricula = matricula;
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

}


