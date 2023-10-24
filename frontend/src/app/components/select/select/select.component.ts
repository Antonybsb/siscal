import { HttpClient } from "@angular/common/http";
import { EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { Component  } from "@angular/core";
import { SelectService } from "../../table/select.service";
import { CalendarioComponent } from "../../calendario/calendario/calendario.component";
import { GerarMesesService } from "src/app/services/gerar-meses.service";




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
  selector: "app-select",
  templateUrl: "./select.component.html",
  styleUrls: ["./select.component.css"],
})
export class SelectComponent implements OnInit {

  @ViewChild(CalendarioComponent) calendarioComponent!: CalendarioComponent;


  @Output() siglaSelecionadaChange: EventEmitter<string> =
    new EventEmitter<string>();

  siglas: string[] = ["DTI", "DTI/DDS", "DTI/DO", "DTI/DST"];
  siglaSelecionada: string = "";
  codigoDepartamentoSelecionado: number = 0;
  nomes: string[] = [];
  tiposAfastamentos: string[] = [
    "Ferias Ano Corrente",
    "Ferias Ano Anterior",
    "Licença Capacitação",
    "Não Homologadas",
    "Banco de Horas",
  ];
  anos: number[] = [];
  anoSelecionado: number = new Date().getFullYear();  // Inicializa com o ano atual
  meses!: Mes[];

  


  constructor(private http: HttpClient, private selectService: SelectService, private gerarMesesService: GerarMesesService) {}

  ngOnInit(): void {
    this.meses = this.gerarMesesService.gerarMeses(this.anoSelecionado);
    // this.preencherAnos();
    this.carregarAnos();
    this.onAnoSelecionadoChange();
  }

  private preencherAnos(): void {
    const startYear = 2015;
    const endYear = 2030;

    for (let year = startYear; year <= endYear; year++) {
      this.anos.push(year);
    }
  }


  onSiglaSelecionadaChange(): void {
    console.log("Sigla selecionada:", this.siglaSelecionada);
    console.log(
      "Codigo Departamento selecionado:",
      this.codigoDepartamentoSelecionado
    );

    if (this.siglaSelecionada) {
      this.selectService
        .getNomeServidores(this.getCodigoDepartamento(this.siglaSelecionada))
        .subscribe(
          (servidores) => {
            this.nomes = servidores;
            this.siglaSelecionadaChange.emit(this.siglaSelecionada); // Emitindo a sigla selecionada
          },
          (erro) => {
            console.error("Erro ao obter os servidores:", erro);
          }
        );
    }
  }

  emitSiglaSelecionada(sigla: string): void {
    this.siglaSelecionadaChange.emit(sigla);
  }

  private getCodigoDepartamento(sigla: string): number {
    switch (sigla) {
      case "DTI":
        return 415006100;
      case "DTI/DDS":
        return 415006200;
      case "DTI/DO":
        return 415006400;
      case "DTI/DST":
        return 415006500;
      default:
        return 0;
    }
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
    console.log("Ano selecionado:", this.anoSelecionado);
    
    // Certifique-se de que a referência a calendarioComponent esteja definida
    if (this.calendarioComponent) {
      // Agora, chame o método gerarMeses do CalendarioComponent
      this.meses = this.gerarMesesService.gerarMeses(this.anoSelecionado);
      console.log("Meses gerados:", this.meses);
    }

  }

  getBorderColor(posicao: number): string {
    switch (posicao) {
      case 0:
        return "#0476D9"; // Cor para a posição 0
      case 1:
        return "#F57A18"; // Cor para a posição 1
      case 2:
        return "#B300F5"; // Cor para a posição 2
      case 3:
        return "#8fca10"; // Cor para a posição 3
      case 4:
        return "#0CD7F5"; // Cor para a posição 4
      default:
        return "black"; // Cor padrão para outras posições, se necessário
    }
  }

}
