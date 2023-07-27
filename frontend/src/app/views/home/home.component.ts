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
  codigoDepartamentoSelecionado: string = "";

  constructor(private selectService: SelectService) {}

  ngOnInit(): void {
    this.carregarAnos();
    this.carregarDivisoes();
    this.carregarNomeServidores();
    this.onAnoSelecionadoChange(); // Para carregar os meses iniciais

    const codigoDepartamentoInicial = "415006200"; // Coloque aqui o código do departamento inicial como string
    this.carregarServidoresPorSigla(codigoDepartamentoInicial);

   
  }

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
        this.anoSelecionado = this.anos.includes(anoAtual)
          ? anoAtual
          : this.anos[0];
      }
    });
  }

  onAnoSelecionadoChange(): void {
    console.log("Sigla selecionada:", this.siglaSelecionada);
    console.log("Ano selecionado:", this.anoSelecionado);
    // Carregar os meses do ano selecionado
    this.meses = this.gerarMeses(this.anoSelecionado);
    console.log("Meses gerados:", this.meses); // Adicione esta linha
    
    // Verifica se tanto o ano como a sigla estão selecionados
    if (this.anoSelecionado && this.siglaSelecionada) {
      // Chama a função para buscar os afastamentos com base no ano e sigla selecionados
      this.buscarAfastamentosPorAnoESigla();
    }
  }

  onSiglaSelecionadaChange(): void {
    if (this.siglaSelecionada) {
      // Verificar a opção selecionada e atribuir o código correto
      if (this.siglaSelecionada === "DTI/DO") {
        this.codigoDepartamentoSelecionado = "415006400";
      } else if (this.siglaSelecionada === "DTI/DDS") {
        this.codigoDepartamentoSelecionado = "415006200";
      } else if (this.siglaSelecionada === "DTI/DST") {
        this.codigoDepartamentoSelecionado = "415006500";
      } else {
        // Opção inválida, você pode tratar esse caso se desejar
        this.codigoDepartamentoSelecionado = "";
      }

      // Carregar os servidores do departamento selecionado
      this.carregarServidoresPorSigla(this.codigoDepartamentoSelecionado);
    }
  }

  buscarAfastamentosPorAnoESigla(): void {
    if (this.anoSelecionado && this.siglaSelecionada) {
      this.selectService
        .buscarAfastamentosPorAnoESigla(
          this.anoSelecionado,
          this.siglaSelecionada
        )
        .subscribe(
          (afastamentos: Afastamentos[]) => {
            console.log("Afastamentos encontrados:", afastamentos);
            this.afastamentos = afastamentos;
            console.log("Afastamentos preenchidos:", this.afastamentos); // Adicione esta linha
            this.meses = this.gerarMeses(this.anoSelecionado);
            console.log("Meses gerados:", this.meses);
            this.getNomeServidores = afastamentos.map((afastamento) =>
              afastamento.servidor.toString()
            );
          },
          (error: any) => {
            console.error("Ocorreu um erro ao buscar os afastamentos:", error);
          }
        );
    }
  }

  carregarNomeServidores() {
    this.selectService.getNomeServidores().subscribe((nomes) => {
      this.getNomeServidores = nomes;
      console.log("Nomes dos servidores:", this.getNomeServidores); // Adicione esta linha
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
    console.log("Iniciando busca de afastamentos...");

    this.selectService.buscarAfastamentosPorAnoESigla(ano, sigla).subscribe(
      (afastamentos: Afastamentos[]) => {
        console.log("Afastamentos encontrados:", afastamentos);

        this.afastamentos = afastamentos;
        this.meses = this.gerarMeses(ano);
        console.log("Meses gerados:", this.meses);
      },
      (error: any) => {
        console.error("Ocorreu um erro ao buscar os afastamentos:", error);
      }
    );

    console.log("Busca de afastamentos concluída.");
  }

  verificarAfastamento(dia: string, nomeServidor: string): boolean {
    const afastamentosDoServidor = this.afastamentos.filter(
      (afastamento) => afastamento.servidor.toString() === nomeServidor
    );
    const dataDia = new Date(dia);
    return afastamentosDoServidor.some((afastamento) => {
      return (
        dataDia >= afastamento.gozoDataInicio &&
        dataDia <= afastamento.gozoDataFim
      );
    });
  }

  getTipoAfastamento(dia: string, nomeServidor: string): string {
    const afastamentosDoServidor = this.afastamentos.filter(
      (afastamento) => afastamento.servidor.toString() === nomeServidor
    );
    const dataDia = new Date(dia);
    const afastamento = afastamentosDoServidor.find((afastamento) => {
      return (
        dataDia >= afastamento.gozoDataInicio &&
        dataDia <= afastamento.gozoDataFim
      );
    });
    return afastamento ? afastamento.feriasTipoAfastamento.descricao : "";
  }

  getAfastamentoColor(dia: string, nomeServidor: string): string {
    const afastamentosDoServidor = this.afastamentos.filter(
      (afastamento) => afastamento.servidor.toString() === nomeServidor
    );
    const dataDia = new Date(dia);
    const afastamento = afastamentosDoServidor.find((afastamento) => {
      return (
        dataDia >= afastamento.gozoDataInicio &&
        dataDia <= afastamento.gozoDataFim
      );
    });

    if (afastamento) {
      switch (afastamento.feriasTipoAfastamento.idTipoAfastamento) {
        case 1:
          console.log("Tipo de afastamento: Férias do ano corrente");
          return "blue"; // Férias do ano corrente
        case 2:
          console.log("Tipo de afastamento: Férias do ano anterior");
          return "orange"; // Férias do ano anterior
        case 3:
          console.log("Tipo de afastamento: Licença capacitação");
          return "purple"; // Licença capacitação
        case 4:
          console.log("Tipo de afastamento: Não homologadas");
          return "green"; // Não homologadas
        case 5:
          console.log("Tipo de afastamento: Banco de horas");
          return "lightblue"; // Banco de horas
        default:
          console.log("Tipo de afastamento: Desconhecido");
          return "transparent"; // Caso não corresponda a nenhum tipo conhecido
      }
    }
  
    return "transparent"; // Caso não haja afastamento nesse dia para esse servidor
  }

  getAfastamentoTooltip(dia: string, nomeServidor: string): string {
    const afastamentosDoServidor = this.afastamentos.filter(
      (afastamento) => afastamento.servidor.toString() === nomeServidor
    );
    const dataDia = new Date(dia);
    const afastamento = afastamentosDoServidor.find((afastamento) => {
      return (
        dataDia >= afastamento.gozoDataInicio &&
        dataDia <= afastamento.gozoDataFim
      );
    });
    return afastamento
      ? afastamento.feriasTipoAfastamento.descricao
      : "Sem afastamento";
  }
}
