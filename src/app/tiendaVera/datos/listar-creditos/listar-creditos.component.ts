import { Component, OnInit } from '@angular/core';
import {CreditoService} from "../../compartido/servicios/credito.service";
import {MatTableDataSource} from "@angular/material/table";
import {Credito} from "../../compartido/modelos/credito.model";

@Component({
  selector: 'app-listar-creditos',
  templateUrl: './listar-creditos.component.html',
  styleUrls: ['./listar-creditos.component.css']
})
export class ListarCreditosComponent implements OnInit {

  page=0;
  size=10;
  displayedColumns: string[] = ['idCredito','dniPropietario', 'nombrePropietarioCredito','cuotaCredito',
    'numeroPagare','diaPagoCredito'];
  dataSource_creditos: MatTableDataSource<Credito>;
  primeraPagina = false;
  ultimaPagina = false;
  totalPage: Array<number>;

  constructor(private creditoService: CreditoService) { }

  ngOnInit(): void {
    this.cargarPagCredito()
  }
  cargarPagCredito(){
    this.creditoService.getCreditosByPag(this.page, this.size).subscribe( data=>{
      this.dataSource_creditos = new MatTableDataSource<Credito>(data.content)
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
