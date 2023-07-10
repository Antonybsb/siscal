import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  baseUrl = 'http://localhost:3001/calendario-de-ferias'

  constructor(private http: HttpClient) { }

  geServidoresCodigo(codigo: number): Observable<string[]> {
    return this.http.get<string[]>(`/divisao/codigo/${codigo}`);
  }
}

