import { HttpClient } from '@angular/common/http';
import { EventEmitter, OnInit, Output } from '@angular/core';
import { Component } from '@angular/core';
import { SelectService } from '../../table/select.service';



@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class SelectComponent implements OnInit {

  @Output() siglaSelecionadaChange: EventEmitter<string> = new EventEmitter<string>();

  siglas: string[] = ['DTI', 'DTI/DDS', 'DTI/DO', 'DTI/DST'];
  siglaSelecionada: string = "";
  codigoDepartamentoSelecionado: number = 0;
  nomes: string[] = [];
  

  constructor(private http: HttpClient, private selectService: SelectService){};

  ngOnInit(): void {


  }

  onSiglaSelecionadaChange(): void {
    console.log("Sigla selecionada:", this.siglaSelecionada);
    console.log("Codigo Departamento selecionado:", this.codigoDepartamentoSelecionado);
  
    if (this.siglaSelecionada) {
      this.selectService.getNomeServidores(this.getCodigoDepartamento(this.siglaSelecionada))
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
  



}
  

  

  

