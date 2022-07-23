import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Deuda} from "../modelos/deuda.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DeudaService {
  apiBase = environment.apiBase+"/deuda";
  constructor(private http: HttpClient) { }

  guardarDeuda(deuda: Deuda){
      return this.http.post(this.apiBase, deuda);
  }
  actualizarDeuda(deuda: Deuda){
    return this.http.put(this.apiBase, deuda)
  }
  getDeudasndientes(): Observable<any>{
    return this.http.get(this.apiBase+"/estado/pendiente")
  }
  getDeudaByID(id: number): Observable<any>{
    return this.http.get(this.apiBase+"/"+id)
  }
  getDeudaByPag(page: number, size: number){
    return this.http.get<any>(this.apiBase+'/pag?page='+page+'&size='+size)
  }
}
