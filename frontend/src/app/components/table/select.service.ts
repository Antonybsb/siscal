import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FeriasServidorDto } from 'src/app/views/models/ferias-servidor-dto';
import { Afastamentos } from 'src/app/views/models/afastamentos';

@Injectable({
  providedIn: 'root'
})
export class SelectService {
  private anoInicio = 2014;
  private anoFim = 2030;
  private baseUrl = 'http://localhost:8080/ferias-servidor'



  getAnos(): Observable<number[]> {
    const anos: number[] = [];
    for (let ano = this.anoInicio; ano <= this.anoFim; ano++) {
      anos.push(ano);
      
    }
    return of(anos);
  }


  getNomeServidores(codigo: number): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/divisao/codigo/${codigo}`);
  }
  

  getServidoresPorSigla(sigla: string): Observable<string[]> {
    const url = `${this.baseUrl}/divisao/codigo/${sigla}`;
  return this.http.get<string[]>(url);
  }



  constructor(private http: HttpClient) { }
}
