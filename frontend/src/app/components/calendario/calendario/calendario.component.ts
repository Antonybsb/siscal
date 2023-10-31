import { HttpClient } from '@angular/common/http';
import { GerarMesesService } from './../../../services/gerar-meses.service';
import { Input, OnInit, SimpleChanges } from "@angular/core";
import { Component } from "@angular/core";
import { NomeServidorService } from "../../table/nome-servidor.service";
import { Mes } from 'src/app/interfaces/mes';
import { DiaSemana } from 'src/app/interfaces/dia-semana';
import { SelectService } from '../../table/select.service';
import { Afastamentos } from 'src/app/views/models/afastamentos';

interface DiaCalendario {
  data: Date;
  isAfastado: boolean;
  cor: string;
}



@Component({
  selector: "app-calendario",
  templateUrl: "./calendario.component.html",
  styleUrls: ["./calendario.component.css"],
})
export class CalendarioComponent implements OnInit {
  @Input() nomesServidores: string[] = [];
  @Input() siglaSelecionada: string = "";

  nomes: string[] = [];
  meses: Mes[] = [];
  anoSelecionado: number = new Date().getFullYear();
  afastamentos: Afastamentos[] = [];
  servidor: number[] = [];
  ano: number[] = [];
  calendarioDias: DiaCalendario[] = [];


  constructor(
    private gerarMesesService: GerarMesesService, 
    private nomeServidorService: NomeServidorService, 
    private selectService: SelectService, 
    private http: HttpClient) {}

  ngOnInit(): void {
    this.meses = this.gerarMesesService.gerarMeses(this.anoSelecionado);
    this.atualizarMeses(this.anoSelecionado);
    this.carregarNomes();
    this.buscarAfastamentos(3049, 2020);//Deletar
    
  }

  onSiglaSelecionadaChange(siglaSelecionada: string): void {
    this.carregarNomes();
  }


  // Atualiza nomes quando a siglaSelecionada é alterada
  ngOnChanges(changes: SimpleChanges): void {
    // Atualize os nomes quando a siglaSelecionada é alterada
    if (
      changes["siglaSelecionada"] &&
      !changes["siglaSelecionada"].firstChange
    ) {
      if (this["siglaSelecionada"]) {
        this.nomeServidorService
          .carregarNomesPorSigla(this["siglaSelecionada"])
          .subscribe((nomes) => {
            this.nomes = nomes;
          });
      }
    }
  }

  private carregarNomes(): void {
    if (this.siglaSelecionada) {
      this.nomeServidorService
        .carregarNomesPorSigla(this.siglaSelecionada)
        .subscribe(
          (nomes) => {
            this.nomes = nomes;
          },
          (erro) => {
            console.error("Erro ao obter os funcionários:", erro);
          }
        );
    }
  }

  buscarAfastamentos(servidor: number, ano: number) {
    console.log('Iniciando busca de afastamentos...');
    const baseUrl = this.selectService.getBaseUrl();
    const url = `${baseUrl}/afastamentos/${servidor}/${ano}`;
    console.log('URL da solicitação:', url);
    this.http.get<Afastamentos[]>(url)
      .subscribe((afastamentos) => {
        console.log('Afastamentos recuperados:', afastamentos);
        this.afastamentos = afastamentos;
        console.log('Afastamentos definidos na propriedade afastamentos:', this.afastamentos);
        this.processarAfastamentos();
      });
  }
  

  processarAfastamentos() {
    console.log('Iniciando o processamento de afastamentos...');
    this.afastamentos.forEach((afastamento) => {
      const dataInicio = new Date(afastamento.gozoDataInicio);
      const dataFim = new Date(afastamento.gozoDataFim);
  
      for (const dia of this.calendarioDias) {
        if (dia.data >= dataInicio && dia.data <= dataFim) {
          dia.isAfastado = true;
          dia.cor = this.getAfastamentosColor(afastamento.idTipoAfastamento);
        console.log('Dia:', dia.data);
        console.log('Data de Início:', dataInicio);
        console.log('Data de Fim:', dataFim);
        console.log('É Afastado?', dia.isAfastado);
        console.log('Cor:', dia.cor);
        }
      }
    });
  }
  

  getAfastamentosColor(idTipoAfastamento: string): string {
    const coresAfastamento: { [key: string]: string } = {
      "Ferias Ano Corrente": "#0476D9",
      "Ferias Ano Anterior": "#F57A18",
      "Licença Capacitação": "#B300F5",
      "Não Homologadas": "#8fca10",
      "Banco de Horas": "#0CD7F5",
    };
    return coresAfastamento[idTipoAfastamento] || "black"; // Cor padrão se não encontrar
  }
  

  atualizarMeses(ano: number): void {
    this.anoSelecionado = ano;
    this.meses = this.gerarMesesService.gerarMeses(ano);

    this.meses.forEach((mes) => {
      mes.colspan = mes.semanas.length * (mes.semanas[0].length || 1);
    })
  }

  calculateColspan(semanas: DiaSemana[][]): number {
    let totalColspan = 0;
    for (const semana of semanas) {
      totalColspan += semana.length;
    }
    // Adicione 1 para incluir o último dia do mês
    totalColspan += 1;
    return totalColspan;
  }
}


