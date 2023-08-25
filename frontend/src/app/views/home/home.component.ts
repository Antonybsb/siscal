// import { CalendarioService } from 'src/app/components/table/calendario.service';
import { Component, OnInit } from "@angular/core";
import { SelectService } from "src/app/components/table/select.service";
import { Afastamentos } from "../models/afastamentos";


interface DiaSemana {
  dia: any;
  diaSemana: string;
  background?: string;
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
  meses!: Mes[];
  anos: number[] = [];
  siglas: string[] = ['DTI', 'DTI/DDS', 'DTI/DO', 'DTI/DST'];
  anoSelecionado!: number;
  siglaSelecionada: string = "";
  getNomeServidores: string[] = [];
  codigoDepartamentoSelecionado: number = 0;
  servidoresDoDepartamento: string[] = [];
  mesesGerados: number[] = [];
  // afastamentosAgendados: Afastamentos[] = [];
  afastamentosPorServidor: { codigo: number, afastamentos: Afastamentos[] }[] = [];
  afastamentos: Afastamentos[] = [];
  erroAoBuscarAfastamentos = false;


  constructor(private selectService: SelectService) {
  }

  ngOnInit(): void {
    this.carregarAnos();
    this.carregarNomeServidores();
    this.onAnoSelecionadoChange(); // Para carregar os meses iniciais
    // this.carregarAfastamentosPorDepartamento();

    const codigoDepartamentoInicial = "415006200"; // Coloque aqui o código do departamento inicial como string
    this.carregarServidoresPorSigla(codigoDepartamentoInicial);

    this.getNomeServidores.forEach((nomeServidor) => {
      const codigoServidor = parseInt(nomeServidor.split('-')[0], 10);
      this.buscarAfastamentosPorServidorEano(codigoServidor, this.anoSelecionado);
    });

   
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

  onSiglaSelecionadaChange(): void {
    console.log("Sigla selecionada:", this.siglaSelecionada);
    console.log("Codigo Departamento selecionado:", this.codigoDepartamentoSelecionado);
  
    if (this.siglaSelecionada) {
      // Verificar a opção selecionada e atribuir o código correto
      if (this.siglaSelecionada === "DTI") {
        this.codigoDepartamentoSelecionado = 415006100;
      } else if (this.siglaSelecionada === "DTI/DDS") {
        this.codigoDepartamentoSelecionado = 415006200;
      } else if (this.siglaSelecionada === "DTI/DO") {
        this.codigoDepartamentoSelecionado = 415006400;
      } else if (this.siglaSelecionada === "DTI/DST") {
        this.codigoDepartamentoSelecionado = 415006500;
      } else {
        // Opção inválida, você pode tratar esse caso se desejar
        this.codigoDepartamentoSelecionado = 0;
      }
      this.carregarServidoresPorSigla(this.codigoDepartamentoSelecionado.toString());
      this.carregarNomeServidores();

    }
  }


  onAnoSelecionadoChange(): void {
    console.log("Ano selecionado:", this.anoSelecionado);
    // Carregar os meses do ano selecionado
    this.meses = this.gerarMeses(this.anoSelecionado);
    console.log("Meses gerados:", this.meses); // Adicione esta linha
    
    // Verifica se tanto o ano como a sigla estão selecionados
    if (this.anoSelecionado && this.siglaSelecionada) {
      // Chama a função para buscar os afastamentos com base no ano e sigla selecionados
      //  this.carregarAfastamentosPorDepartamento();
      
    }
  }

  carregarNomeServidores() {
    if (this.codigoDepartamentoSelecionado) {
      this.selectService.getNomeServidores(this.codigoDepartamentoSelecionado).subscribe((nomes) => {
        this.getNomeServidores = nomes.sort();
        console.log('Nomes dos servidores:', this.getNomeServidores);
  
        // Inicializa a estrutura de dados para associar códigos de servidor aos afastamentos
        this.afastamentosPorServidor = this.getNomeServidores.map((nomeServidor) => {
          const codigoServidor = parseInt(nomeServidor.split('-')[0], 10);
          return {
            codigo: codigoServidor,
            afastamentos: [],
          };
        });
  
        // Agora, a cada nome de servidor, chame a função para buscar os afastamentos
        this.getNomeServidores.forEach((nomeServidor) => {
          const codigoServidor = parseInt(nomeServidor.split('-')[0], 10);
          if (this.anoSelecionado) { // Verifique se o ano está definido
            this.buscarAfastamentosPorServidorEano(codigoServidor, this.anoSelecionado);
          }
        });
      });
    }
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

  buscarAfastamentosPorServidorEano( servidor: number, ano: number) {
    this.selectService.buscarAfastamentosPorServidorEano(servidor, ano)
    .subscribe(
      afastamentos => {
        this.afastamentos = afastamentos;
        console.log('Afastamentos encontrados', afastamentos)
        this.erroAoBuscarAfastamentos = false;
      },
      erro => {
        console.error('Erro ao buscar afastamentos:', erro);
        this.erroAoBuscarAfastamentos = true;
      }
    );
  }
  

  }
  
  
  

  

