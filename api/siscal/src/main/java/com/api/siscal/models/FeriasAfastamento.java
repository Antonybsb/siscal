package com.api.siscal.models;


import jakarta.persistence.*;

import java.util.Date;
import java.util.Objects;

@Entity
@Table(name = "FERIAS_AFASTAMENTOS")
@IdClass(FeriasAfastamentoPK.class)
public class FeriasAfastamento {

    @Column(name = "TIPO_AFASTAMENTO")
    private String idTipoAafastamento;

    @Id
    @Column(name = "servidor")
    private int servidor;

    @Column(name = "ExercicioAno")
    private int exercicioAno;
    @Id
    @Column(name = "GozoDataInicio")
    private Date gozoDataInicio;
    @Id
    @Column(name = "GozoDataFim")
    private Date gozoDataFim;

    @Column(name = "statusHomologacao")
    private String statusHomologacao;

    @ManyToOne
    @JoinColumn(name = "id_tipo_afastamento")
    private FeriasTipoAfastamento feriasTipoAfastamento;

    public FeriasAfastamento() {

    }

    public FeriasAfastamento(String idTipoAafastamento, int servidor, int exercicioAno, Date gozoDataInicio, Date gozoDataFim, String statusHomologacao, FeriasTipoAfastamento feriasTipoAfastamento) {
        this.idTipoAafastamento = idTipoAafastamento;
        this.servidor = servidor;
        this.exercicioAno = exercicioAno;
        this.gozoDataInicio = gozoDataInicio;
        this.gozoDataFim = gozoDataFim;
        this.statusHomologacao = statusHomologacao;
        this.feriasTipoAfastamento = feriasTipoAfastamento;
    }


    public String getIdTipoAafastamento() {
        return idTipoAafastamento;
    }

    public void setIdTipoAafastamento(String idTipoAafastamento) {
        this.idTipoAafastamento = idTipoAafastamento;
    }

    public int getServidor() {
        return servidor;
    }

    public void setServidor(int servidor) {
        this.servidor = servidor;
    }

    public int getExercicioAno() {
        return exercicioAno;
    }

    public void setExercicioAno(int exercicioAno) {
        this.exercicioAno = exercicioAno;
    }

    public Date getGozoDataInicio() {
        return gozoDataInicio;
    }

    public void setGozoDataInicio(Date gozoDataInicio) {
        this.gozoDataInicio = gozoDataInicio;
    }

    public Date getGozoDataFim() {
        return gozoDataFim;
    }

    public void setGozoDataFim(Date gozoDataFim) {
        this.gozoDataFim = gozoDataFim;
    }

    public String getStatusHomologacao() {
        return statusHomologacao;
    }

    public void setStatusHomologacao(String statusHomologacao) {
        this.statusHomologacao = statusHomologacao;
    }

    public FeriasTipoAfastamento getFeriasTipoAfastamento() {
        return feriasTipoAfastamento;
    }

    public void setFeriasTipoAfastamento(FeriasTipoAfastamento feriasTipoAfastamento) {
        this.feriasTipoAfastamento = feriasTipoAfastamento;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof FeriasAfastamento that)) return false;
        return idTipoAafastamento == that.idTipoAafastamento && getServidor() == that.getServidor() && getExercicioAno() == that.getExercicioAno() && Objects.equals(getGozoDataInicio(), that.getGozoDataInicio()) && Objects.equals(getGozoDataFim(), that.getGozoDataFim()) && Objects.equals(getStatusHomologacao(), that.getStatusHomologacao()) && Objects.equals(getFeriasTipoAfastamento(), that.getFeriasTipoAfastamento());
    }

    @Override
    public int hashCode() {
        return Objects.hash(idTipoAafastamento, getServidor(), getExercicioAno(), getGozoDataInicio(), getGozoDataFim(), getStatusHomologacao(), getFeriasTipoAfastamento());
    }

    @Override
    public String toString() {
        return "FeriasAfastamento{" +
                "idTipoAafastamento=" + idTipoAafastamento +
                ", servidor=" + servidor +
                ", exercicioAno=" + exercicioAno +
                ", gozoDataInicio=" + gozoDataInicio +
                ", gozoDataFim=" + gozoDataFim +
                ", statusHomologacao='" + statusHomologacao + '\'' +
                ", feriasTipoAfastamento=" + feriasTipoAfastamento +
                '}';
    }
}
