import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {HistoriaService} from "../shared/historia.service";
import Swal from 'sweetalert2';
import {Historia} from "../shared/historia.model";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-list-historia',
  templateUrl: './list-historia.component.html',
  styleUrls: ['./list-historia.component.css']
})
export class ListHistoriaComponent implements OnInit {

  displayedColumns: string[] = ['idHistoria', 'nombreHistoria', 'fechaAlgo','descripcionHistoria', 'edit', 'delete'];
  dataSource_historia: MatTableDataSource<Historia>;

  constructor(private historiaService: HistoriaService, public dialog: MatDialog) {}

  ///Todo lo que pongamos acá será ejecutado luego del constructor, antes de ser renderizado/montaje.
  ngOnInit(): void {
    this.getAllHistorias();
  }

  getAllHistorias(){
    this.historiaService.getAllHistorias().subscribe((data : any)=> {
      this.dataSource_historia= new MatTableDataSource(data['body']);
    })
  }

  applyFilter(value: string) {
    this.dataSource_historia.filter = value.trim().toLowerCase();
  }

  delete(id: number) {
    Swal.fire({
      title: 'Estas Seguro',
      text:'Esto no se puede deshacer',
      icon:'question',
      showCancelButton:true,
      confirmButtonText:'Si, Borrarlo',
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
  }).then(respuesta => {
      if(respuesta.value){
        this.historiaService.deleteHistoria(id).subscribe(() => {
          this.ngOnInit();
          Swal.fire({
            icon: 'success',
            title: 'La historia se ha eliminado',
            showConfirmButton: false,
            timer: 1500
          })
        },(error:any)=>{
          Swal.fire({
            title:"Carrera no borrada",
            text:"Ha ocurrido un error al intentar borrar este elemento’",
            icon:"error",
          })
        })
      }

    })
  }
}
