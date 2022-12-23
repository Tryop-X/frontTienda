import { Component, OnInit } from '@angular/core';
import {DeudaService} from "../../compartido/servicios/deuda.service";
import {Deuda} from "../../compartido/modelos/deuda.model";
import Swal from "sweetalert2";
import {TokenService} from "../../../seguridad/servicios/token.service";
import {Router} from "@angular/router";
import {Alertas} from "../../compartido/alertas/alertas";

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

    this.servicioDeuda.getDeudor(this.nombrePrestamista).subscribe(
        (data: any)=>{
          if(data['satisfactorio'] == true || data['data'] != null){
            console.log(data)
            const deudor = data['data']
            Alertas.smsDeudor("¿Desea prestar a una persona Morosa?",  deudor['nombreDeudor'] ,deudor['deudas'][0]['monto'], deudor['deudas'][0]['afavor']).then(respuesta =>{
              if(respuesta.value){
                this.sePuedeGuardar();
              }
            })
          }else{
            Alertas.noDeudor()
            this.sePuedeGuardar();
          }
        }, error => {
          Alertas.sinDatosDeudos()
          this.sePuedeGuardar();
        }
    )
  }

  sePuedeGuardar(){
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
