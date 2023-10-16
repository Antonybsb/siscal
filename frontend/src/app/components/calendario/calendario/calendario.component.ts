import { Input, OnInit, SimpleChanges } from '@angular/core';
import { SelectService } from '../../table/select.service';
import { Component } from '@angular/core';
import * as moment from 'moment';
import { NomeServidorService } from '../../table/nome-servidor.service';


// Importe o locale do Moment.js para português brasileiro
import 'moment/locale/pt-br';

interface MonthData {
  name: string;
  daysWeek: string[];
  days: number[];
  startDay: number;
}

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  @Input() nomesServidores: string[] = [];
  @Input() siglaSelecionada: string = '';

  departamentoSelecionado: string = '';


  codigoDepartamentoSelecionado: number | undefined;
  nomes: string[] = [];

  frLocaleData = moment.localeData('pt-br');

  meses: MonthData[] = [];
  // nomeServidor: string[] = ['João', 'Maria', 'Fulano', 'Ciclano']

  ngOnInit(): void {
    if (this.siglaSelecionada) {
      // Carregue os nomes baseados na siglaSelecionada
      this.nomeServidorService.carregarNomesPorSigla(this.siglaSelecionada).subscribe(
        (nomes) => {
          this.nomes = nomes;
        },
      );
    }
    console.log('ngOnInit foi chamado.')
  }

  

  constructor(private selectService: SelectService, private nomeServidorService: NomeServidorService) {
    const currentYear: number = new Date().getFullYear();

    for (let month = 0; month < 12; month++) {
      const momentMonth = moment({ year: currentYear, month });

      const monthData: MonthData = {
        name: momentMonth.format('MMMM'),
        daysWeek: moment.weekdaysMin().map(day => day[0]),
        days: [],
        startDay: momentMonth.startOf('month').day()
      };

      const daysInMonth = momentMonth.daysInMonth();
      for (let day = 1; day <= daysInMonth; day++) {
        monthData.days.push(day);
      }

      this.meses.push(monthData);
    }
  }

 

  getFormattedDaysOfWeek(): string {
    const weekdays = moment.weekdaysShort(); // Obtém os nomes abreviados dos dias da semana
    return weekdays.join(', '); // Junta os nomes dos dias separados por vírgula e espaço
  }

  onSiglaSelecionadaChange(siglaSelecionada: string): void {
    console.log('Sigla selecionada no CalendárioComponent:', siglaSelecionada);

    this.nomeServidorService.carregarNomesPorSigla(siglaSelecionada).subscribe(
      (nomes) => {
        console.log('Nomes:', nomes);
      },
      (erro) => {
        console.error('Erro ao obter os funcionários:', erro);
      }
    );
  }

  // Atualiza nomes quando a siglaSelecionada é alterada
  ngOnChanges(changes: SimpleChanges): void {
    // Atualize os nomes quando a siglaSelecionada é alterada
    if (changes['siglaSelecionada'] && !changes['siglaSelecionada'].firstChange) {
      if (this['siglaSelecionada']) {
        this.nomeServidorService.carregarNomesPorSigla(this['siglaSelecionada']).subscribe(
          (nomes) => {
            this.nomes = nomes;
          },
        );
      }
    }
  }

}


