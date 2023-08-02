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


  buscarAfastamentos(): Observable<Afastamentos[]> {
    const url = `${this.baseUrl}/afastamentos`;
    return this.http.get<Afastamentos[]>(url);
  }



  getAnos(): Observable<number[]> {
    const anos: number[] = [];
    for (let ano = this.anoInicio; ano <= this.anoFim; ano++) {
      anos.push(ano);
      
    }
    return of(anos);
  }

  getDivisoes(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/siglas`)
    .pipe(
      tap(siglas => console.log(siglas))
      
    )
        
  }

  getNomeServidores(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/divisao/codigo/415006200`);
  }

  getServidoresPorSigla(sigla: string): Observable<string[]> {
    const url = `${this.baseUrl}/divisao/codigo/${sigla}`;
  return this.http.get<string[]>(url);
  }

  getDivisoesPorCodigo(codigoDepartamento: number): Observable<FeriasServidorDto[]> {
    return this.http.get<FeriasServidorDto[]>(`${this.baseUrl}/divisao/${codigoDepartamento}`)
      .pipe(
        tap(divisoes => console.log(divisoes))
      );
  }

  buscarServidoresPorDepartamento(codigoDepartamento: number): Observable<string[]> {
    const url = `${this.baseUrl}/divisao/codigo/${codigoDepartamento}`;
    return this.http.get<string[]>(url);
  }

  getCodigoPorSigla(sigla: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/divisao/codigo/${sigla}`)
  }

  //Até aqui

  carregarServidoresPorCodigo(codigo: number): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/divisao/codigo/${codigo}`);
  }

  buscarAfastamentoPorMatricula(matricula: number): Observable<Afastamentos[]> {
    const url = `${this.baseUrl}/${matricula}/afastamentos`;
    return this.http.get<Afastamentos[]>(url);
  }

  buscarAfastamentosPorAnoESigla(ano: number, sigla: string): Observable<Afastamentos[]> {
    const url = `${this.baseUrl}/${ano}/afastamentos/${sigla}`;
    return this.http.get<Afastamentos[]>(url);
  }

  buscarAfastamentosPorAnoECodigo(ano: number, codigo: number): Observable<Afastamentos[]> {
    const url = `${this.baseUrl}/${ano}/afastamentos/${codigo}`;
    return this.http.get<Afastamentos[]>(url);
  }


  buscarAfastamentosPorServidorEAno(servidor: number, ano: number): Observable<Afastamentos[]> {
    const url = `${this.baseUrl}/${servidor}/afastamentos/${ano}`;
    return this.http.get<Afastamentos[]>(url);
  }


  constructor(private http: HttpClient) { }
}
