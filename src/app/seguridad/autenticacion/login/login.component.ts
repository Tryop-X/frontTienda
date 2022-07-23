import { Component, OnInit } from '@angular/core';
import {LoginUsuario} from "../../modelos/login-usuario";
import {TokenService} from "../../servicios/token.service";
import {AuthService} from "../../servicios/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLogged= false;
  isLogginFail= false;
  hide = true;
  password: string;
  userName: string;
  loginUsuario : LoginUsuario;
  roles: string[] = [];


  constructor(private tokenService: TokenService,
              private authService: AuthService,
              private router: Router
  ) { }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
        this.isLogged= true;
        this.isLogginFail= false;
        this.roles= this.tokenService.getAuthorities()
    }
  }

  esValido(){
    if (this.password == undefined || this.password ==""){
      return true;
    }
    if(this.userName == undefined || this.userName ==""){
      return true;
    }
    return false;
  }

  iniciarSesion(){
    this.loginUsuario = new LoginUsuario(this.userName, this.password);
    this.authService.login(this.loginUsuario).subscribe(
        data =>{
          this.isLogged= true;
          this.isLogginFail= false;
          this.tokenService.setToken(data.token);

          this.tokenService.setUserName(data.nombreUsuario);
          this.tokenService.setAuthorities(data.authorities);
          this.roles = data.authorities;
          this.router.navigate(['/']).then(r => location.reload());

        },
        err =>{
            this.userName= "";
            this.password= "";
            this.isLogged= false;
            this.isLogginFail = true;
            console.log(err)
        }
    )
  }


}
