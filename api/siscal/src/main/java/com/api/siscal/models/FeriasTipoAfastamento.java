package com.api.siscal.models;

import jakarta.persistence.*;

import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "FERIAS_TIPO_AFASTAMENTO")
public class FeriasTipoAfastamento {
    @Id
    @Column(name = "ID_TIPO_AFASTAMENTO")
    private int idTipoAfastamento;

    @Column(name = "DESCRICAO")
    private String descricao;

    @OneToMany
    private List<FeriasAfastamento> feriasAfastamentos;

    public FeriasTipoAfastamento(int idTipoAfastamento, String descricao) {
        this.idTipoAfastamento = idTipoAfastamento;
        this.descricao = descricao;
    }

    public int getIdTipoAfastamento() {
        return idTipoAfastamento;
    }

    public void setIdTipoAfastamento(int idTipoAfastamento) {
        this.idTipoAfastamento = idTipoAfastamento;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }



    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FeriasTipoAfastamento that = (FeriasTipoAfastamento) o;
        return idTipoAfastamento == that.idTipoAfastamento && Objects.equals(descricao, that.descricao);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idTipoAfastamento, descricao);
    }

    @Override
    public String toString() {
        return "FeriasTipoAfastamento{" +
                "idTipoAfastamento=" + idTipoAfastamento +
                ", descricao='" + descricao + '\'' +
                '}';
    }
}
