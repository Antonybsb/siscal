import { Injectable } from "@angular/core";
import { Mes } from "../interfaces/mes";
import { DiaSemana } from "../interfaces/dia-semana";

@Injectable({
  providedIn: "root",
})
export class GerarMesesService {
  constructor() {}

  gerarMeses(ano: number): Mes[] {
    const meses: Mes[] = [];
    const diasDaSemana: string[] = ["D", "S", "T", "Q", "Q", "S", "S"];
    const finaisDeSemana: number[] = [0, 6]; // Índices dos dias da semana que são finais de semana (domingo e sábado)
    for (let mes = 0; mes < 12; mes++) {
      const dataInicial = new Date(ano, mes, 1);
      const nomeMes = dataInicial
        .toLocaleString("default", { month: "long" })
        .toLocaleUpperCase();
      const numeroDias = new Date(ano, mes + 1, 0).getDate();
      const semanas: DiaSemana[][] = [];
      let semana: DiaSemana[] = [];
      let dia = 1;
      while (dia <= numeroDias) {
        const data = new Date(ano, mes, dia);
        const diaSemanaNumero = data.getDay(); // Dia da semana em formato numérico (0 a 6)
        const diaSemana = diasDaSemana[diaSemanaNumero]; // Obtém o nome do dia da semana (D, S, T, Q, etc.)
        semana.push({ data, dia, diaSemana });
        if (data.getDay() === 6 || dia === numeroDias) {
          semanas.push(semana);
          semana = [];
        }
        dia++;
      }
      meses.push({ nome: nomeMes, semanas, colspan: 0 });
    }
    return meses;
  }
}
