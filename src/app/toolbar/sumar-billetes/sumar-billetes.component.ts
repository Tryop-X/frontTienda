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
    var dinero10;
    var dinero20;
    var dinero50;
    var dinero100;
    var dinero200;
    var monedas;
    var dineroTotal;
    if(this.cant10 == undefined){
      dinero10 = 0
    }else{
      dinero10 =this.cant10*10;
    }
    if(this.cant20 == undefined){
      dinero20 = 0
    }else{
      dinero20 =this.cant20*20;
    }
    if(this.cant50 == undefined){
      dinero50 = 0
    }else{
      dinero50 =this.cant50*50;
    }
    if(this.cant100 == undefined){
      dinero100 = 0
    }else{
      dinero100 =this.cant100*100;
    }
    if(this.cant200 == undefined){
      dinero200 = 0
    }else{
      dinero200 =this.cant200*200;
    }if(this.saldoMonedas == undefined){
      monedas = 0
    }else{
      monedas = this.saldoMonedas
    }
    dineroTotal = dinero10 + dinero20 + dinero50 + dinero100 + dinero200 +monedas
    return this.redondeo(dineroTotal)
  }

  redondeo(x: number): number{
    return Math.round((x + Number.EPSILON) * 100) / 100;
  }
}
