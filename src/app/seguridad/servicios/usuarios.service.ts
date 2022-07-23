import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {NuevoUsuario} from "../modelos/nuevo-usuario";
import {Usuario} from "../modelos/usuario";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  apibase = environment.apiBase+"/usuarios";

  constructor(private http: HttpClient) { }

  createUsuario(nuevoUsuario: NuevoUsuario){
    return this.http.post(this.apibase, nuevoUsuario);
  }

  getUsuarios(): Observable<any>{
    return this.http.get(this.apibase);
  }

  borrarUsuarioByID(id: number){
    return this.http.delete(this.apibase+"/"+id)
  }

}
