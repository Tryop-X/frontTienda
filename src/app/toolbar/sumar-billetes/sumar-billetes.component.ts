import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sumar-billetes',
  templateUrl: './sumar-billetes.component.html',
  styleUrls: ['./sumar-billetes.component.css']
})
export class SumarBilletesComponent implements OnInit {
  cant10: number;
  cant20: number;
  cant50: number;
  cant100: number;
  cant200: number;
  saldoMonedas: number;

  constructor() { }

  ngOnInit(): void {
  }

  getDineroTotal(): number{
    const monedas = [
      { tipo: 10, cantidad: this.cant10 },
      { tipo: 20, cantidad: this.cant20 },
      { tipo: 50, cantidad: this.cant50 },
      { tipo: 100, cantidad: this.cant100 },
      { tipo: 200, cantidad: this.cant200 }
    ];
    let dineroTotal = 0;

    for (const moneda of monedas) {
      if (moneda.cantidad != undefined) {
        dineroTotal += moneda.cantidad * moneda.tipo;
      }
    }

    dineroTotal += this.saldoMonedas || 0;

    return this.redondeo(dineroTotal);

  }

  redondeo(x: number): number{
    return Math.round((x + Number.EPSILON) * 100) / 100;
  }
}
