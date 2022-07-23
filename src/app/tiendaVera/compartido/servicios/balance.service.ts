import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Balance} from "../modelos/balance.model";

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  private apiBase = environment.apiBase+"/balance";

  constructor(private http: HttpClient) {
  }

  guardarBalance(balance: Balance){
      return this.http.post(this.apiBase, balance);
  }

  eliminarBalance(id : number){
    return this.http.delete(this.apiBase+'/'+id);
  }

  getBalancesByPag(page: number, size: number){
    return this.http.get<any>(this.apiBase+'/pag?page='+page+'&size='+size);
  }

  getDineroPrestado(){
    return this.http.get<number>(this.apiBase+'/dineroPrestado');
  }

  getNuestrasDeudas(){
    return this.http.get<number>(this.apiBase+'/nuestrasDeudas');
  }
  getVueltos(){
    return this.http.get<number>(this.apiBase+'/vueltos');
  }
}
