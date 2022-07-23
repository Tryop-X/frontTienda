import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Servicio} from "../modelos/servicio.model";

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  private apiBase = environment.apiBase+"/servicio"

  constructor(private http: HttpClient) { }

  getServicioByPag(page: number, size: number){
    return this.http.get<any>(this.apiBase+'/pag?page='+page+'&size='+size)
  }
  getServicioByID(idServicio: number){
    return this.http.get<any>(this.apiBase+"/"+idServicio)
  }

  deleteServicioById(idServicio: number){
    return this.http.delete(this.apiBase+"/"+idServicio)
  }

  updateServicio(servicio: Servicio){
    return this.http.put(this.apiBase, servicio)
  }
}
