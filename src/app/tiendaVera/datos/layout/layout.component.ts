import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  inCredito = false;
  inCuenta = false;
  inDeposito = false;
  inDeuda = false;
  inPagoCredito = false;
  inPagoServicio = false;
  inServicio = false;
  valorBusqueda: string;


  constructor() {
  }

  setUbicacion() {
    var URLdomain = window.location.pathname.split("/").pop();
    console.log(URLdomain)
    if (URLdomain == "creditos") {
      this.inCredito = true;
    }
    if (URLdomain == "cuentas") {
      this.inCuenta = true;
    }
    if (URLdomain == "depositos") {
      this.inDeposito = true;
    }
    if (URLdomain == "deudas") {
      this.inDeuda = true;
    }
    if (URLdomain == "pagos-credito") {
      this.inPagoCredito = true;
    }
    if (URLdomain == "pagos-servicio") {
      this.inPagoServicio = true;
    }
    if (URLdomain == "servicios") {
      this.inServicio = true;
    }
  }

  ngOnInit(): void {
    this.setUbicacion()
  }

  irCreditos() {
    this.resetDatos()
    this.inCredito = true;
  }

  irCuentas() {
    this.resetDatos()
    this.inCuenta = true;
  }

  irDepositos() {
    this.resetDatos()
    this.inDeposito = true;
  }

  irDeudas() {
    this.resetDatos()
    this.inDeuda = true;
  }

  irPagoCredito() {
    this.resetDatos()
    this.inPagoCredito = true;
  }

  irPagoServicio() {
    this.resetDatos()
    this.inPagoServicio = true;
  }

  irServicios() {
    this.resetDatos()
    this.inServicio = true;
  }

  resetDatos(){
      this.inCredito = false;
      this.inCuenta = false;
      this.inDeposito = false;
      this.inDeuda = false;
      this.inPagoCredito = false;
      this.inPagoServicio = false;
      this.inServicio = false;
  }

  realizarBusqueda() {

  }
}
