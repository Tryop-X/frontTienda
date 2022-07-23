import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  tipoOperacion: string;


  constructor() { }

  ngOnInit(): void {
    this.setOperacion()
  }

  setOperacion(){
    var URLdomain = window.location.pathname.split("/").pop();
    console.log(URLdomain)
    if (URLdomain=="deposito"){
      this.tipoOperacion="NUEVO DEPÓSITO";
    }else if(URLdomain=="pagoCredito"){
      this.tipoOperacion="NUEVO PAGO DE CRÉDITO";
    }else if(URLdomain=="pagoServicio"){
      this.tipoOperacion="NUEVO PAGO DE SERVICIO";
    }else{
      this.tipoOperacion="NUEVA DEUDA";
    }
  }

  btnDeposito() {
    this.tipoOperacion = "NUEVO DEPÓSITO";
  }
  btnDeuda() {
    this.tipoOperacion = "NUEVA DEUDA";
  }
  btnPagoServicio() {
    this.tipoOperacion = "NUEVO PAGO DE SERVICIO";
  }
  btnPagoCredito() {
    this.tipoOperacion = "NUEVO PAGO DE CRÉDITO";
  }
}
