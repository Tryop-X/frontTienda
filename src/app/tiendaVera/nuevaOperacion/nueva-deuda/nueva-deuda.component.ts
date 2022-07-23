import { Component, OnInit } from '@angular/core';
import {DeudaService} from "../../compartido/servicios/deuda.service";
import {Deuda} from "../../compartido/modelos/deuda.model";
import Swal from "sweetalert2";
import {TokenService} from "../../../seguridad/servicios/token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nueva-deuda',
  templateUrl: './nueva-deuda.component.html',
  styleUrls: ['./nueva-deuda.component.css']
})
export class NuevaDeudaComponent implements OnInit {
  nombrePrestamista: string;
  cantidadPrestada: number;
  anotacionDeuda: string;
  isChecked = true;
  deuda : Deuda = new Deuda();

  constructor(private servicioDeuda: DeudaService,
              private tokenService: TokenService,
              private router: Router) { }

  setDatosDeuda(){
    this.deuda.cantidadPrestada = this.cantidadPrestada;
    this.deuda.anotacionDeuda = this.anotacionDeuda;
    this.deuda.nombrePrestamista =this.nombrePrestamista;
    this.deuda.nosDeben = this.isChecked;
    this.deuda.nombreApuntador = this.tokenService.getUserName()
  }
  ngOnInit(): void {
  }
  guardarDeuda() {
    this.setDatosDeuda()
    console.log(this.deuda)
    this.servicioDeuda.guardarDeuda(this.deuda).subscribe(
        ()=>{
          this.router.navigate(['/'])
          Swal.fire({
            icon: 'success',
            title: 'Deuda guardado',
            showConfirmButton: false,
            timer: 1500
          })

        },
        error => {
          Swal.fire({
            title:"Deuda no guardada",
            text:"Ha ocurrido un error al intentar crear este elemento’",
            icon:error,
          })
        }
    )
  }
  esValidoGuardar() {
    if (this.nombrePrestamista == undefined || this.nombrePrestamista ==""){
      return true
    }
    return this.cantidadPrestada == undefined;

  }
}
