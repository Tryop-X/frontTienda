import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Cuenta} from "../modelos/cuenta.model";

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  private apiBase = environment.apiBase+"/cuenta"

  constructor(private http: HttpClient) { }

  getCuentaByPag(page: number, size: number){
    return this.http.get<any>(this.apiBase+'/pag?page='+page+'&size='+size)
  }
  getCuentaByID(idCuenta: number){
    return this.http.get<any>(this.apiBase+"/"+idCuenta)
  }
  deleteCuentaById(idCuenta: number){
    return this.http.delete(this.apiBase+"/"+idCuenta)
  }
  updateCuenta(cuenta: Cuenta){
    return this.http.put(this.apiBase, cuenta)
  }
}
