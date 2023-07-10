import { CalendarioService } from 'src/app/components/table/calendario.service';
import { HomeModel } from './../models/home-model';
import { Component, OnInit } from "@angular/core";
import { SelectService } from 'src/app/components/table/select.service';

interface Departamento {
  value: string;
  viewValue: string;
}


@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  
})


export class HomeComponent implements OnInit {

 
  anos: number[] = [];
  siglas: string[] = [];
  anoSelecionado!: number;
  siglaSelecionada: string = '';
  codigoSelecionado!: number;
  meses: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  codigo: number[] = [];
  getNomeServidores: string[] = [];
  calendarios: string[][] = [];
  diasDoMes: Array<{ dia: number; diaSemana: string; }> = [];
  mesesDoAno: string[] = [];
  exibirApenasJaneiro: boolean = true;
  
    

  homeModel!: HomeModel;
  calendarioMes!: string;
  

  constructor(private calendarioService: CalendarioService, private selectService: SelectService) {
    
    
    
  }

 
  ngOnInit(): void {
    this.carregarAnos();
    this.carregarDiasDoMes();
    this.carregarDivisoes();
    this.carregarNomeServidores();
    this.carregarNomeMeses();
    this.carregarTodosMeses();
    

    
    

  const numeroDoMes = 6; // Defina o número do mês desejado
  const calendarioMes = this.calendarioService.geraCalendarioMes(numeroDoMes);
  this.homeModel = { calendarioMes };

  

  
  }

  carregarAnos() {
    this.selectService.getAnos().subscribe((anos: number[]) => {
      this.anos = anos;
      this.anoSelecionado = anos[0]
    })
  }

  carregarDiasDoMes(): void {
    const dataAtual = new Date();
    const ultimoDiaDoMes = new Date(dataAtual.getFullYear(), dataAtual.getMonth() + 1, 0).getDate();

    for (let dia = 1; dia <= ultimoDiaDoMes; dia++) {
      // const data = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), dia);
      const diaSemana = this.obterDiaSemana(dataAtual.getFullYear(), dataAtual.getMonth(), dia);
      this.diasDoMes.push({ dia, diaSemana });
      
    }
  }

  obterDiaSemana(ano: number, mes: number, dia: number): string {
    const data = new Date(ano, mes, dia);
    const diaSemana = ['D', 'S','T', 'Q','Q', 'S','S'];
    return diaSemana[data.getDay()];
  }

  carregarNomeMeses(): void {
    const nomesMeses = [
      'JANEIRO', 'FEVEREIRO', 'MARÇO', 'ABRIL', 'MAIO', 'JUNHO', 'JULHO', 'AGOSTO', 'SETEMBRO', 'OUTUBRO', 'NOVEMBRO', 'DEZEMBRO'
    ];

    this.mesesDoAno = nomesMeses;
    console.log(this.mesesDoAno);
  }

  carregarTodosMeses(): void {
    this.selectService.getNomeServidores().subscribe(nomes => {
      for (const nomeServidor of nomes) {
        const calendarioMeses: string[] = [];
        for (let j = 1; j <= 12; j++) {
          const calendarioMes = this.obterCalendarioMes(j, nomeServidor);
          calendarioMeses.push(calendarioMes);
        }
        this.calendarios.push(calendarioMeses);
      }
    });
  }

  // carregarDiasDoMes() {
  //   const dataAtual = new Date();
  //   const ultimoDiaDoMes = new Date(dataAtual.getFullYear(), dataAtual.getMonth() + 1,0).getDate();

  //   for (let dia = 1; dia <= ultimoDiaDoMes; dia++) {
  //     this.diasDoMes.push(dia);
  //   }
  // }



  carregarNomeServidores() {
    this.selectService.getNomeServidores().subscribe(nomes => {
      for (const nomeServidor of nomes) {
        const calendarioMeses: string[] = [];
        for (let j = 1; j <= 12; j++) {
          const calendarioMes = this.obterCalendarioMes(j, nomeServidor);
          calendarioMeses.push(calendarioMes);
        }
        this.calendarios.push(calendarioMeses);
        this.getNomeServidores = nomes;
        console.log(nomeServidor);
      }
    });
  }

  carregarDivisoes(): void {
    this.selectService.getDivisoes().subscribe(
      siglas => {
    this.siglas = siglas;
    console.log('Departamentos carregados:', this.siglas);
    },
    (error: any) => {
      console.error('Ocorreu um erro o carregar os divisões:', error)
    }
    );
  }
  

  

  

  // carregarDivisoesPorCodigo(codigo: string): void {
  //   this.selectService.getDivisoesPorCodigo().subscribe( 
  //     divisoes => {
  //     this.divisoes = divisoes;
  //     console.log(this.codigo);
  //   })
  // }
 
  // carregarDadosServidores(): void {
  //   const codigoDivisao = 415006200; // Código da divisão a ser buscado
  //   this.calendarioService.getServidorCodigo(codigoDivisao).subscribe(servidores => {
  //     this.calendarioService.servidores = servidores;
  //   });
  // }

  // public obterCalendarioMes(numeroDoMes: number): string {
  //   const calendario = this.calendarioService.geraCalendarioMes(numeroDoMes);
  //   const calendarioFormatado = `<table>${calendario}</table>`;
  //   return calendarioFormatado;
  // }

  public obterCalendarioMes(numeroDoMes: number, nomeServidor: string, ): string {
    const calendario = this.calendarioService.geraCalendarioMes(numeroDoMes);
    return calendario;
  }



 
}