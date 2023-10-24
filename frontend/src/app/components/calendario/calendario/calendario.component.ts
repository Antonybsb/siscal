import { GerarMesesService } from './../../../services/gerar-meses.service';
import { Input, OnInit, SimpleChanges } from "@angular/core";
import { Component } from "@angular/core";
import { NomeServidorService } from "../../table/nome-servidor.service";
import { Mes } from 'src/app/interfaces/mes';


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

  constructor(private gerarMesesService: GerarMesesService, private nomeServidorService: NomeServidorService) {}

  ngOnInit(): void {
    this.meses = this.gerarMesesService.gerarMeses(this.anoSelecionado);
    this.atualizarMeses(this.anoSelecionado);
    this.carregarNomes();
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

  atualizarMeses(ano: number): void {
    this.anoSelecionado = ano;
    this.meses = this.gerarMesesService.gerarMeses(ano);
  }
}


