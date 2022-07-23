import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Credito} from "../../compartido/modelos/credito.model";
import {CuentaService} from "../../compartido/servicios/cuenta.service";
import {Cuenta} from "../../compartido/modelos/cuenta.model";

@Component({
  selector: 'app-listar-cuentas',
  templateUrl: './listar-cuentas.component.html',
  styleUrls: ['./listar-cuentas.component.css']
})
export class ListarCuentasComponent implements OnInit {

  page=0;
  size=10;
  displayedColumns: string[] = ['idCuenta','nombrePropietarioCuenta', 'numeroCuenta'];
  dataSource_cuenta: MatTableDataSource<Cuenta>;
  primeraPagina = false;
  ultimaPagina = false;
  totalPage: Array<number>;

  constructor(private cuentaService: CuentaService) { }

  ngOnInit(): void {
    this.cargarPagCredito()
  }
  cargarPagCredito(){
    this.cuentaService.getCuentaByPag(this.page, this.size).subscribe( data=>{
      this.dataSource_cuenta = new MatTableDataSource<Cuenta>(data.content)
      this.primeraPagina = data.first;
      this.ultimaPagina = data.last;
      this.totalPage = new Array<number>(data['totalPages']);
    })
  }

  cargarAnterior(){
    if(!this.primeraPagina){
      this.page --;
      this.cargarPagCredito();
    }
  }
  cargarSiguiente(){
    if(!this.ultimaPagina){
      this.page ++;
      this.cargarPagCredito();
    }
  }
  cargarByNumPag(nPage: number){
    this.page = nPage;
    this.cargarPagCredito();
  }
}
