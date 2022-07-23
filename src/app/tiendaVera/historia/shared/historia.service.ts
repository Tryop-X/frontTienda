import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Historia} from "./historia.model";


@Injectable({
  providedIn: 'root'
})
export class HistoriaService {

  private apiBase= environment.apiBase

  constructor(private http:HttpClient) { }

  getAllHistorias(){
    return this.http.get<Historia[]>(this.apiBase+'/historias')
  }
  getHistoriaById(id: number) {
    return this.http.get(this.apiBase+'/historias/'+id)
  }
  createHistoria(historia: Historia) {
    return this.http.post(this.apiBase + '/historias', historia)
  }
  updatHistoria(historia: Historia) {
    return this.http.put(this.apiBase + '/historias', historia)
  }
  deleteHistoria(id: number) {
    return this.http.delete(this.apiBase + '/historias/'+ id)
  }

}
