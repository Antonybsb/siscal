export interface Afastamentos {
    idTipoAafastamento: string;
    servidor: number;
    exercicioAno: number;
    gozoDataInicio: Date;
    gozoDataFim: Date;
    statusHomologacao: string;
    feriasTipoAfastamento: {
    idTipoAfastamento: number;
    descricao: string;
  };
}
