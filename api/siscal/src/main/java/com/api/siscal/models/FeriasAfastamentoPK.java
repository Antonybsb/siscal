package com.api.siscal.models;


import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;


public class FeriasAfastamentoPK implements Serializable {

    protected int servidor;
    protected Date gozoDataInicio;
    protected Date gozoDataFim;

    public FeriasAfastamentoPK() {

    }
    public FeriasAfastamentoPK(int servidor, Date gozoDataInicio, Date gozoDataFim) {
        this.servidor = servidor;
        this.gozoDataInicio = gozoDataInicio;
        this.gozoDataFim = gozoDataFim;
    }


}
