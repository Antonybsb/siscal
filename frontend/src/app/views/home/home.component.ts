// import { CalendarioService } from 'src/app/components/table/calendario.service';
import { HomeModel } from "./../models/home-model";
import { Component, OnInit } from "@angular/core";
import { SelectService } from "src/app/components/table/select.service";

interface Departamento {
  value: string;
  viewValue: string;
}

interface DiaSemana {
  dia: number;
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
    const ano = 2023;
    this.meses = this.gerarMeses(ano);

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
      this.anoSelecionado = anos[0];
    });
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
}
