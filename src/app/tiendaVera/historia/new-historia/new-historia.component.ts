import { Component, OnInit } from '@angular/core';
import {HistoriaService} from "../shared/historia.service";
import {Router} from "@angular/router";
import {Historia} from "../shared/historia.model";
import Swal from "sweetalert2";

@Component({
  selector: 'app-new-historia',
  templateUrl: './new-historia.component.html',
  styleUrls: ['./new-historia.component.css']
})
export class NewHistoriaComponent implements OnInit {


  constructor(public historiaService: HistoriaService, private router: Router) {}

  ngOnInit(): void {
  }

  createCarrera(historia: Historia){
    this.historiaService.createHistoria(historia).subscribe(()=>{
        this.router.navigate(['tiendaVera/carreras']);
        Swal.fire({
          icon: 'success',
          title: 'La historia se ha creado con éxito',
          showConfirmButton: false,
          timer: 1500
        })
      },
      (error:any)=>{
        Swal.fire({
          title:"La historia no se ha podido crear",
          text:"Ha ocurrido un error al intentar crear este elemento’",
          icon:"error",
        })
      }
    )
  }

}
