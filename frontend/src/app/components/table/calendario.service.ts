import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {

  private urlCodigoServidor = 'http://localhost:8080/ferias-servidor';

  private ano: number;
  private nomeMes: string[];
  private diaSemana: string[];
  public servidores: any[];
  private ferias: any[];
  

  constructor(private http: HttpClient) {
    // Inicializa os valores do serviço, como o ano, nome dos meses, dias da semana, servidores e férias.
    this.ano = new Date().getFullYear();
    this.nomeMes = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    this.diaSemana = ["", "S", "T", "Q", "Q", "S", "S", "D"];
    this.servidores = [];
    this.ferias = [];
   }
   

   getServidorCodigo(codigo: number): Observable<string[]> {
    const url = `${this.urlCodigoServidor}/divisao/codigo/${codigo}`;
    return this.http.get<string[]>(url);
   }

  
   
   geraCalendarioMes(mes: number): string {
    const datas: Date[] = [];
    const dt = new Date(this.ano, mes - 1, 1);
    const dtFim = new Date(this.ano, mes, 0);
  
    while (dt <= dtFim) {
      datas.push(new Date(dt));
      dt.setDate(dt.getDate() + 1);
    }
  
    let retorno = "<table>";
  
    // Cabeçalho dos dias da semana
    retorno += "<tr>";
    retorno += "<td>Nome</td>";
    for (const data of datas) {
      const estiloCSS = (data.getDay() === 0 || data.getDay() === 6) ? " class='fimSemana'" : "";
      retorno += `<td ${estiloCSS}>${this.diaSemana[data.getDay()]}</td>`;
    }
    retorno += "</tr>";
  
    // Dados dos servidores
    for (const servidor of this.servidores) {
      retorno += "<tr>";
      retorno += `<td class='nomeServidor'>${servidor.nome}</td>`;
      for (const data of datas) {
        const result = this.temAfastamento(servidor.matricula, data, this.ferias);
        let estiloCSS = "";
        switch (result) {
          case 1:
            estiloCSS = "class='feriasAnoCorrente'";
            break;
          case 2:
            estiloCSS = "class='feriasAnoAnterior'";
            break;
          case 3:
            estiloCSS = "class='feriasNaoHomologadas'";
            break;
          case 4:
            estiloCSS = "class='licencaCapacitacao'";
            break;
          case 5:
            estiloCSS = "class='bancoHoras'";
            break;
          default:
            estiloCSS = (data.getDay() === 0 || data.getDay() === 6) ? " class='fimSemana'" : "";
        }
        retorno += `<td ${estiloCSS}>${data.getDate()}</td>`;
      }
      retorno += "</tr>";
    }
  
    retorno += "</table>";
    return retorno;
  }

  temAfastamento(matricula: string, data: Date, ferias: any[]): number | false {
    for (const evento of ferias) {
      if (evento.matricula === matricula) {
        if (evento.inicio <= data && data <= evento.fim) {
          if (evento.tipo === 'FERIAS_SERVIDOR' || evento.tipo === 'FERIAS_ESTAGIARIOS') {
            return evento.ano === this.getAno() ? 1 : 2;
          }
          if (evento.tipo === 'FERIAS_NAO_HOMOLOGADAS') {
            return 3;
          }
          if (evento.tipo === 'CAPACITACAO') {
            return 4;
          }
          if (evento.tipo === 'BANCO_HORAS') {
            return 5;
          }
        }
      }
    }
    return false;
  }
  
  private getAno(): number {
    return new Date().getFullYear();
  }
}