import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {PagoCredito} from "../modelos/pagoCredito.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PagoCreditoService {
  apiBase = environment.apiBase+"/pagoCredito";
  constructor(private http: HttpClient) { }

  guardarPagoCredito(pagoCredito : PagoCredito){
      return this.http.post(this.apiBase, pagoCredito)
  }
  actualizarPagoCredito(pagoCredito : PagoCredito){
    return this.http.put(this.apiBase, pagoCredito)
  }
  getPagoCreditosPendientes(): Observable<any>{
    return this.http.get(this.apiBase+"/estado/pendiente")
  }
  getCreditoByID(id: number): Observable<any>{
    return this.http.get(this.apiBase+"/"+id)
  }
  getPagoCreditoByPag(page: number, size: number){
    return this.http.get<any>(this.apiBase+'/pag?page='+page+'&size='+size)
  }
}

