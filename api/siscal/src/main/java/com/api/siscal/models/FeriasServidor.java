package com.api.siscal.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

@Entity
@Table(name = "FERIAS_SERVIDOR")
public class FeriasServidor implements Serializable {

    @Id
    @Column(name = "SERVIDOR")
    private int servidor;

    @Column(name = "USUARIO")
    private String usuario;

    @Column(name = "MATRICULA")
    private int matricula;

    @Column(name = "NOME")
    private String nome;

    @Column(name = "SIGLA")
    private String sigla;

    @Column(name = "CODIGO")
    private BigDecimal codigo;

    @Column(name = "DESCRICAO")
    private String descricao;

    @Column(name = "TIPO_SERVIDOR")
    private int tipoServidor;


    public FeriasServidor(int servidor, String usuario, int matricula, String nome, String sigla, BigDecimal codigo, String descricao, int tipoServidor) {
        this.servidor = servidor;
        this.usuario = usuario;
        this.matricula = matricula;
        this.nome = nome;
        this.sigla = sigla;
        this.codigo = codigo;
        this.descricao = descricao;
        this.tipoServidor = tipoServidor;

    }

    public int getServidor() {
        return servidor;
    }

    public void setServidor(int servidor) {
        this.servidor = servidor;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public int getMatricula() {
        return matricula;
    }

    public void setMatricula(int matricula) {
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

    public Number getCodigo() {
        return codigo;
    }

    public void setCodigo(BigDecimal codigo) {
        this.codigo = codigo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public int getTipoServidor() {
        return tipoServidor;
    }

    public void setTipoServidor(int tipoServidor) {
        this.tipoServidor = tipoServidor;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof FeriasServidor that)) return false;
        return getMatricula() == that.getMatricula();
    }

    @Override
    public int hashCode() {
        return Objects.hash(getMatricula());
    }

    @Override
    public String toString() {
        return "FeriasServidor{" +
                "servidor=" + servidor +
                ", usuario='" + usuario + '\'' +
                ", matricula=" + matricula +
                ", nome='" + nome + '\'' +
                ", sigla='" + sigla + '\'' +
                ", codigo=" + codigo +
                ", descricao='" + descricao + '\'' +
                ", tipoServidor=" + tipoServidor +
                '}';
    }
}
