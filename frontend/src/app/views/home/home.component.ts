// import { CalendarioService } from 'src/app/components/table/calendario.service';
import { HomeModel } from "./../models/home-model";
import { Component, OnInit } from "@angular/core";
import { SelectService } from "src/app/components/table/select.service";
import { Afastamentos } from "../models/afastamentos";

interface Departamento {
  value: string;
  viewValue: string;
}

interface DiaSemana {
  dia: any;
  diaSemana: string;
}

interface Mes {
  nome: string;
  semanas: DiaSemana[][];
}

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  afastamentos: Afastamentos[] = [];
  meses!: Mes[];
  anos: number[] = [];
  siglas: string[] = [];
  anoSelecionado!: number;
  siglaSelecionada: string = "";
  codigoSelecionado!: number;
  getNomeServidores: string[] = [];

  constructor(
    private selectService: SelectService
  ) {}

  ngOnInit(): void {
    this.carregarAnos();
    this.carregarDivisoes();
    this.carregarNomeServidores();
    this.onAnoSelecionadoChange(); // Para carregar os meses iniciais
    this.buscarAfastamentosPorAnoESigla(); // Buscar afastamentos iniciais

  }

  gerarMeses(ano: number): Mes[] {
    const meses: Mes[] = [];

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
        const diaSemana = data.toLocaleString("default", { weekday: "narrow" });
        semana.push({ dia, diaSemana });

        if (data.getDay() === 6 || dia === numeroDias) {
          semanas.push(semana);
          semana = [];
        }

        dia++;
      }

      meses.push({ nome: nomeMes, semanas });
    }

    return meses;
  }

  carregarAnos() {
    this.selectService.getAnos().subscribe((anos: number[]) => {
      this.anos = anos;
      if (!this.anoSelecionado) {
        const anoAtual = new Date().getFullYear();
        this.anoSelecionado = this.anos.includes(anoAtual) ? anoAtual : this.anos[0];
      }
    });
  }

  onAnoSelecionadoChange(): void {
    // Carregar os meses do ano selecionado
    this.meses = this.gerarMeses(this.anoSelecionado);

    // Verifica se tanto o ano como a sigla estão selecionados
    if (this.anoSelecionado && this.siglaSelecionada) {
      // Chama a função para buscar os afastamentos com base no ano e sigla selecionados
      this.buscarAfastamentos(this.anoSelecionado, this.siglaSelecionada);
    }
  }

  onSiglaSelecionadaChange(): void {
    // Verifica se tanto o ano como a sigla estão selecionados
    if (this.anoSelecionado && this.siglaSelecionada) {
      // Chama a função para buscar os afastamentos com base no ano e sigla selecionados
      this.buscarAfastamentos(this.anoSelecionado, this.siglaSelecionada);
    }
  }

  buscarAfastamentosPorAnoESigla(): void {
    // Verifica se tanto o ano como a sigla estão selecionados
    if (this.anoSelecionado && this.siglaSelecionada) {
      // Chama a função para buscar os afastamentos com base no ano e sigla selecionados
      this.buscarAfastamentos(this.anoSelecionado, this.siglaSelecionada);
    }
  }

  
  

  


  carregarNomeServidores() {
    this.selectService.getNomeServidores().subscribe((nomes) => {
      this.getNomeServidores = nomes;
    });
  }

  carregarDivisoes(): void {
    this.selectService.getDivisoes().subscribe(
      (siglas) => {
        this.siglas = siglas;
        console.log("Departamentos carregados:", this.siglas);
      },
      (error: any) => {
        console.error("Ocorreu um erro ao carregar as divisões:", error);
      }
    );
  }

  carregarServidoresPorSigla(sigla: string): void {
    this.selectService.getServidoresPorSigla(sigla).subscribe(
      (servidores: string[]) => {
        this.getNomeServidores = servidores;
      },
      (error: any) => {
        console.error("Ocorreu um erro ao carregar os servidores:", error);
      }
    );
  }

  buscarAfastamentos(ano: number, sigla: string): void {
    this.selectService.buscarAfastamentosPorAnoESigla(ano, sigla).subscribe(
      (afastamentos: Afastamentos[]) => {
        this.afastamentos = afastamentos;
        this.meses = this.gerarMeses(ano);
        console.log("Afastamentos por matrícula", this.afastamentos);
      },
      (error: any) => {
        console.error('Ocorreu um erro ao buscar os afastamentos:', error);
      }
    );
  }

  verificarAfastamento(dia: string, nomeServidor: string): boolean {
    const afastamentosDoServidor = this.afastamentos.filter(
      (afastamento) => afastamento.servidor.toString() === nomeServidor
    );
    const dataDia = new Date(dia);
    return afastamentosDoServidor.some(
      (afastamento) => {
        return dataDia >= afastamento.gozoDataInicio && dataDia <= afastamento.gozoDataFim;
      }
    );
  }

  getTipoAfastamento(dia: string, nomeServidor: string): string {
    const afastamentosDoServidor = this.afastamentos.filter(
      (afastamento) => afastamento.servidor.toString() === nomeServidor
    );
    const dataDia = new Date(dia);
    const afastamento = afastamentosDoServidor.find(
      (afastamento) => {
        return dataDia >= afastamento.gozoDataInicio && dataDia <= afastamento.gozoDataFim;
      }
    );
    return afastamento ? afastamento.feriasTipoAfastamento.descricao : '';
  }

  getAfastamentoColor(dia: string, nomeServidor: string): string {
    const afastamentosDoServidor = this.afastamentos.filter(
      (afastamento) => afastamento.servidor.toString() === nomeServidor
    );
    const dataDia = new Date(dia);
    const afastamento = afastamentosDoServidor.find(
      (afastamento) => {
        return dataDia >= afastamento.gozoDataInicio && dataDia <= afastamento.gozoDataFim;
      }
    );

    if (afastamento) {
      switch (afastamento.feriasTipoAfastamento.idTipoAfastamento) {
        case 1:
          return 'blue'; // Férias do ano corrente
        case 2:
          return 'orange'; // Férias do ano anterior
        case 3:
          return 'purple'; // Licença capacitação
        case 4:
          return 'green'; // Não homologadas
        case 5:
          return 'lightblue'; // Banco de horas
        default:
          return 'transparent'; // Caso não corresponda a nenhum tipo conhecido
      }
    }

    return 'transparent'; // Caso não haja afastamento nesse dia para esse servidor
  }
}
