import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Deuda} from "../../compartido/modelos/deuda.model";
import {DeudaService} from "../../compartido/servicios/deuda.service";
import {PagoCreditoService} from "../../compartido/servicios/pago-credito.service";
import {PagoCredito} from "../../compartido/modelos/pagoCredito.model";

@Component({
  selector: 'app-listar-pago-creditos',
  templateUrl: './listar-pago-creditos.component.html',
  styleUrls: ['./listar-pago-creditos.component.css']
})
export class ListarPagoCreditosComponent implements OnInit {

  page=0;
  size=10;
  displayedColumns: string[] = ['idPagoCredito','fecha','dniPropietario', 'nombrePropietarioCredito',
    'cuotaCredito','estado'];
  dataSource_pagoCredito: MatTableDataSource<PagoCredito>;
  primeraPagina = false;
  ultimaPagina = false;
  totalPage: Array<number>;

  constructor(private pagoCreditoService: PagoCreditoService) { }

  ngOnInit(): void {
    this.cargarPagCredito()
  }

  getFecha(fecha: string){
    return fecha.split("T",1)[0]
  }
  cargarPagCredito(){
    this.pagoCreditoService.getPagoCreditoByPag(this.page, this.size).subscribe( data=>{
      this.dataSource_pagoCredito = new MatTableDataSource<PagoCredito>(data.content)
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
