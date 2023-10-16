import { SelectService } from './select.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NomeServidorService {

  constructor(private selectService: SelectService) { }

  carregarNomesPorSigla(sigla: string) {
    const codigoDepartamento = this.getCodigoDepartamento(sigla);
    return this.selectService.getNomeServidores(codigoDepartamento);
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
