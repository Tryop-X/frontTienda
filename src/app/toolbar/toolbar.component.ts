import { Component, OnInit } from '@angular/core';
import {TokenService} from "../seguridad/servicios/token.service";
import {
  DialogDepositoComponent
} from "../tiendaVera/pendientes/pagar-pendientes/dialog-deposito/dialog-deposito.component";
import {MatDialog} from "@angular/material/dialog";
import {SumarBilletesComponent} from "./sumar-billetes/sumar-billetes.component";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  islogged= false;
  nombreUsuario: string;
  isAdmin= false;

  constructor(private token: TokenService,
              public dialog: MatDialog) { }

  validarAdmin(){
    this.token.getAuthorities().forEach(rol =>{
      if(Object.values(rol)[0] == "ROLE_ADMIN"){
        this.isAdmin= true;
      }
    })
  }


  ngOnInit(): void {
    this.validarAdmin()
    if(this.token.getToken()){
      this.ponerNombre();
      this.islogged=  true;
    }else {
      this.islogged= false;
    }
  }

  logOut(){
    this.token.logOut();
    window.location.reload()
  }

  ponerNombre(){
    // @ts-ignore
    this.nombreUsuario = this.token.getUserName();
    var cap= this.nombreUsuario.charAt(0).toUpperCase() + this.nombreUsuario.slice(1).toLowerCase();
    this.nombreUsuario = cap;

  }

  abrirSumaBilletes() {
    this.dialog.open(SumarBilletesComponent, {
      width : '50%',
      height: '85%',
    });
  }
}
