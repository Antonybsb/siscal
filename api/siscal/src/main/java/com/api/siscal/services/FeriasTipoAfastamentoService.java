package com.api.siscal.services;

import com.api.siscal.repositories.FeriasAfastamentoRepository;
import com.api.siscal.repositories.FeriasTipoAfastamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class FeriasTipoAfastamentoService {


    final
     FeriasTipoAfastamentoRepository feriasTipoAfastamentoRepository;

    public FeriasTipoAfastamentoService(FeriasTipoAfastamentoRepository feriasTipoAfastamentoRepository ) {
        this.feriasTipoAfastamentoRepository = feriasTipoAfastamentoRepository;
    }

}
