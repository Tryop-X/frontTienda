import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Deposito} from "../../compartido/modelos/deposito.model";
import {DepositoService} from "../../compartido/servicios/deposito.service";
import {DeudaService} from "../../compartido/servicios/deuda.service";
import {Deuda} from "../../compartido/modelos/deuda.model";

@Component({
  selector: 'app-listar-deudas',
  templateUrl: './listar-deudas.component.html',
  styleUrls: ['./listar-deudas.component.css']
})
export class ListarDeudasComponent implements OnInit {
  page=0;
  size=10;
  displayedColumns: string[] = ['idDeuda','fecha','nombrePrestamista', 'cantidadPrestada',
    'nosDeben','estadoDeuda'];
  dataSource_deuda: MatTableDataSource<Deuda>;
  primeraPagina = false;
  ultimaPagina = false;
  totalPage: Array<number>;

  constructor(private deudaSerice: DeudaService) { }

  ngOnInit(): void {
    this.cargarPagCredito()
  }

  getFecha(fecha: string){
    return fecha.split("T",1)[0]
  }
  cargarPagCredito(){
    this.deudaSerice.getDeudaByPag(this.page, this.size).subscribe( data=>{
      this.dataSource_deuda = new MatTableDataSource<Deuda>(data.content)
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
    return estado == "cancelado";
  }
  esVerde(estado: string){
    return estado == "pagado";
  }
  esAmarillo(estado: string){
    return estado == "pendiente";
  }
}
