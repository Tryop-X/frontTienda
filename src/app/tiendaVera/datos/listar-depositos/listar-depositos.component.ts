import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Cuenta} from "../../compartido/modelos/cuenta.model";
import {CuentaService} from "../../compartido/servicios/cuenta.service";
import {Deposito} from "../../compartido/modelos/deposito.model";
import {DepositoService} from "../../compartido/servicios/deposito.service";

@Component({
  selector: 'app-listar-depositos',
  templateUrl: './listar-depositos.component.html',
  styleUrls: ['./listar-depositos.component.css']
})
export class ListarDepositosComponent implements OnInit {

  page=0;
  size=10;
  displayedColumns: string[] = ['idDeposito','horaDeposito', 'dniDepositante'
    ,'dineroDeposita','numeroCuenta', 'nombreProietario', 'estadoDeposito'];
  dataSource_cuenta: MatTableDataSource<Deposito>;
  primeraPagina = false;
  ultimaPagina = false;
  totalPage: Array<number>;

  constructor(private depositoService: DepositoService) { }

  ngOnInit(): void {
    this.cargarPagCredito()
  }

  getFecha(fecha: string){
    return fecha.split("T",1)[0]
  }
  cargarPagCredito(){
    this.depositoService.getDepositoByPag(this.page, this.size).subscribe( data=>{
      this.dataSource_cuenta = new MatTableDataSource<Deposito>(data.content)
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

  esRojo(estado: string){
    if(estado =="cancelado"){
      return true;
    } return false
  }
  esVerde(estado: string){
    if(estado =="pagado"){
      return true;
    } return false
  }
  esAmarillo(estado: string){
    if(estado =="pendiente"){
      return true;
    } return false
  }

}
