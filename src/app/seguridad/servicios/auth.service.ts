import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {LoginUsuario} from "../modelos/login-usuario";
import {Observable} from "rxjs";
import {JwtDTO} from "../modelos/jwt-dto";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apibase = environment.apiBase+"/auth";

  constructor(private http : HttpClient) { }

  public login(loginUsuario: LoginUsuario):Observable<JwtDTO>{
    return this.http.post<JwtDTO>(this.apibase+"/login", loginUsuario);
  }
}
