import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Deposito} from "../modelos/deposito.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DepositoService {
  apiBase = environment.apiBase+"/deposito";
  constructor(private http : HttpClient) { }

  guardarDeposito(deposito: Deposito){
    return this.http.post(this.apiBase, deposito);
  }

  actualizarDeposito(deposito: Deposito){
    return this.http.put(this.apiBase, deposito);
  }

  getDepositosPendiente(): Observable<any>{
    return this.http.get(this.apiBase+"/estado/pendiente")
  }

  getDepositoByID(id: number): Observable<any>{
    return this.http.get(this.apiBase+"/"+id)
  }
  getDepositoByPag(page: number, size: number){
    return this.http.get<any>(this.apiBase+'/pag?page='+page+'&size='+size)
  }

}
