import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {PagoServicio} from "../modelos/pagoServicio.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PagoServicioService {
  apiBase = environment.apiBase+"/pagoServicio"
  constructor(private http: HttpClient) { }

  guardarPagoServicio(pagoServicio: PagoServicio){
    return this.http.post(this.apiBase, pagoServicio)
  }

  actualizarPagoServicio(pagoServicio: PagoServicio){
    return this.http.put(this.apiBase, pagoServicio)
  }
  getPagoServicioPendientes(): Observable<any>{
    return this.http.get(this.apiBase+"/estado/pendiente")
  }
  getPagoServicioByID(id: number): Observable<any>{
    return this.http.get(this.apiBase+"/"+id)
  }
  getPagoServicioByPag(page: number, size: number){
    return this.http.get<any>(this.apiBase+'/pag?page='+page+'&size='+size)
  }

}
