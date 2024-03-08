import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../interfaces/ApiResponse';
import { Observable } from 'rxjs';
import { SalaPeliculaFilterDTO } from '../interfaces/SalaPeliculaFilterDTO';

@Injectable({
  providedIn: 'root'
})
export class BackService {

  url = '';

  constructor(
    private http : HttpClient,
  ) { 
    this.url = `https://localhost:7040/api/`;
  }

  GetListGeneroPelicula(): Observable<ApiResponse<any>>{
    const httpHeader = new HttpHeaders({'Content-type':'application/json'});
    return this.http.get<ApiResponse<any>>(`${this.url}GeneroPelicula/GetListGeneroPelicula`, {headers: httpHeader});
  }

  GetListSala(): Observable<ApiResponse<any>>{
    const httpHeader = new HttpHeaders({'Content-type':'application/json'});
    return this.http.get<ApiResponse<any>>(`${this.url}Sala/GetListSala`, {headers: httpHeader});
  }

  getSalaPelicula(filtros : SalaPeliculaFilterDTO): Observable<ApiResponse<any>>{
    const httpHeader = new HttpHeaders({'Content-type':'application/json'});
    return this.http.post<ApiResponse<any>>(`${this.url}SalaPelicula/getSalaPelicula`, filtros, {headers: httpHeader});
  }

  GetListGenero(): Observable<ApiResponse<any>>{
    const httpHeader = new HttpHeaders({'Content-type':'application/json'});
    return this.http.get<ApiResponse<any>>(`${this.url}Genero/GetListGenero`, {headers: httpHeader});
  }

  GetListTipoDocumento(): Observable<ApiResponse<any>>{
    const httpHeader = new HttpHeaders({'Content-type':'application/json'});
    return this.http.get<ApiResponse<any>>(`${this.url}TipoDocumento/GetListTipoDocumento`, {headers: httpHeader});
  }

  getClienteByTipoNroDoc(nIdTipoDocumento : number, sDocumento : string): Observable<ApiResponse<any>>{
    const httpHeader = new HttpHeaders({'Content-type':'application/json'});
    const httpParams = new HttpParams()
    .append('nIdTipoDocumento', nIdTipoDocumento)
    .append('sDocumento', sDocumento);
    return this.http.get<ApiResponse<any>>(`${this.url}Cliente/getClienteByTipoNroDoc`, {headers: httpHeader, params: httpParams});
  }

  PostInsertarCliente(elemento : any): Observable<ApiResponse<any>>{
    const httpHeader = new HttpHeaders({'Content-type':'application/json'});
    return this.http.post<ApiResponse<any>>(`${this.url}Cliente/insertCliente`, elemento, {headers: httpHeader});
  }

  PostInsertarReserva(elemento : any): Observable<ApiResponse<any>>{
    const httpHeader = new HttpHeaders({'Content-type':'application/json'});
    return this.http.post<ApiResponse<any>>(`${this.url}Reserva/insertReserva`, elemento, {headers: httpHeader});
  }
}
