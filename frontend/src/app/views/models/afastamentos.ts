export interface Afastamentos {
    
    idTipoAfastamento: string;
    servidor: number;
    exercicioAno: number;
    gozoDataInicio: Date;
    gozoDataFim: Date;
    statusHomologacao: string;
    descricao: string;
    feriasTipoAfastamento: {
    idTipoAfastamento: number;
    descricao: string;
  };
}
