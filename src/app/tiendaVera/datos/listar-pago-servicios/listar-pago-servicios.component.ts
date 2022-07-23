import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {PagoCredito} from "../../compartido/modelos/pagoCredito.model";
import {PagoCreditoService} from "../../compartido/servicios/pago-credito.service";
import {PagoServicio} from "../../compartido/modelos/pagoServicio.model";
import {PagoServicioService} from "../../compartido/servicios/pago-servicio.service";

@Component({
  selector: 'app-listar-pago-servicios',
  templateUrl: './listar-pago-servicios.component.html',
  styleUrls: ['./listar-pago-servicios.component.css']
})
export class ListarPagoServiciosComponent implements OnInit {

  page=0;
  size=10;
  displayedColumns: string[] = ['idPagoServicio','fecha','codigoServicio', 'nombrePropietarioServicio',
    'pagoServicio','tipoServicio', 'estado'];
  dataSource_pagoServicio: MatTableDataSource<PagoServicio>;
  primeraPagina = false;
  ultimaPagina = false;
  totalPage: Array<number>;

  constructor(private pagoServicioService: PagoServicioService) { }

  ngOnInit(): void {
    this.cargarPagCredito()
  }

  getFecha(fecha: string){
    return fecha.split("T",1)[0]
  }
  cargarPagCredito(){
    this.pagoServicioService.getPagoServicioByPag(this.page, this.size).subscribe( data=>{
      this.dataSource_pagoServicio = new MatTableDataSource<PagoServicio>(data.content)
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
