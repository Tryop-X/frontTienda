import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Credito} from "../modelos/credito.model";

@Injectable({
  providedIn: 'root'
})
export class CreditoService {

  private apiBase = environment.apiBase+"/credito"

  constructor(private http: HttpClient) { }

  getCreditosByPag(page: number, size: number){
    return this.http.get<any>(this.apiBase+'/pag?page='+page+'&size='+size)
  }

  getCreditoByID(idCredito: number){
    return this.http.get<any>(this.apiBase+"/"+idCredito)
  }

  deleteCreditoById(idCredito: number){
    return this.http.delete(this.apiBase+"/"+idCredito)
  }

  updateCredito(credito: Credito){
    return this.http.put(this.apiBase, credito)
  }

}
