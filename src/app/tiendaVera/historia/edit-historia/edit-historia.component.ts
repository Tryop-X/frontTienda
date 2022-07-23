import { Component, OnInit } from '@angular/core';
import {Historia} from "../shared/historia.model";
import {HistoriaService} from "../shared/historia.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-edit-historia',
  templateUrl: './edit-historia.component.html',
  styleUrls: ['./edit-historia.component.css']
})
export class EditHistoriaComponent implements OnInit {

  historiaLocal= new Historia();
  idCarrera: any;

  constructor(private carreraSerrvice: HistoriaService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.idCarrera = this.activatedRoute.snapshot.paramMap.get('id');
  }



  ngOnInit(): void {
    this.getCarreraById();
  }
  getCarreraById(){
    this.carreraSerrvice.getHistoriaById(this.idCarrera).subscribe((data:any)=>{
      this.historiaLocal= data['body'];
    })
  }
  upadteHistoria(historia: Historia){
    historia.idHistoria= this.historiaLocal.idHistoria;
    historia.fechaAlgo= this.historiaLocal.fechaAlgo;
    this.carreraSerrvice.updatHistoria(historia).subscribe((data: any)=>{
      this.router.navigate(['tiendaVera/historias']);
      Swal.fire({
        icon: 'success',
        title: 'La historia se ha actualizado con éxito',
        showConfirmButton: false,
        timer: 1500
      }),
        (error:any)=>{
          Swal.fire({
            title:"La historia no se ha podido actualizar",
            text:"Ha ocurrido un error al intentar actualizar este elemento’",
            icon:"error",
          })
        }
    })
  }

}
