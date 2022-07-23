import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Credito} from "../../compartido/modelos/credito.model";
import {CreditoService} from "../../compartido/servicios/credito.service";
import {Servicio} from "../../compartido/modelos/servicio.model";
import {ServicioService} from "../../compartido/servicios/servicio.service";

@Component({
  selector: 'app-listar-servicios',
  templateUrl: './listar-servicios.component.html',
  styleUrls: ['./listar-servicios.component.css']
})
export class ListarServiciosComponent implements OnInit {

  page=0;
  size=10;
  displayedColumns: string[] = ['idServicio','codigoServicio', 'nombrePropietarioServicio','pagoServicio','tipoServicio'
    ,'diaPagoServicio'];
  dataSource_servicio: MatTableDataSource<Servicio>;
  primeraPagina = false;
  ultimaPagina = false;
  totalPage: Array<number>;

  constructor(private servicioService: ServicioService) { }

  ngOnInit(): void {
    this.cargarPagCredito()
  }
  cargarPagCredito(){
    this.servicioService.getServicioByPag(this.page, this.size).subscribe( data=>{
      this.dataSource_servicio = new MatTableDataSource<Servicio>(data.content)
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
