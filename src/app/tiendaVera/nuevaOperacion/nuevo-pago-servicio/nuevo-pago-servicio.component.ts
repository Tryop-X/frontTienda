import { Component, OnInit } from '@angular/core';
import {PagoCredito} from "../../compartido/modelos/pagoCredito.model";
import {Servicio} from "../../compartido/modelos/servicio.model";
import {PagoServicio} from "../../compartido/modelos/pagoServicio.model";
import {PagoServicioService} from "../../compartido/servicios/pago-servicio.service";
import Swal from "sweetalert2";
import {TokenService} from "../../../seguridad/servicios/token.service";
import {FormControl, Validators} from "@angular/forms";
import {Alertas} from "../../compartido/alertas/alertas";
import {Deuda} from "../../compartido/modelos/deuda.model";
import {DeudaService} from "../../compartido/servicios/deuda.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nuevo-pago-servicio',
  templateUrl: './nuevo-pago-servicio.component.html',
  styleUrls: ['./nuevo-pago-servicio.component.css']
})
export class NuevoPagoServicioComponent implements OnInit {

  anotacionPagoServicio: string;

  servicio: Servicio = new Servicio();
  pagoServicio: PagoServicio = new PagoServicio();
  controlCuotaServicio = new FormControl('', [
    Validators.required,
    Validators.min(0)
  ]);
  controlVueltoServicio = new FormControl(0, [
    Validators.required,
    Validators.min(0)
  ]);
  controlNombreDeudor = new FormControl('',[
    Validators.required,
    Validators.maxLength(70),
    Validators.minLength(3)
  ]);
  controlNombrePropietarioServicio = new FormControl('',[
    Validators.required,
    Validators.maxLength(70),
    Validators.minLength(3)
  ]);
  controlCodigoServicio = new FormControl('',[
    Validators.pattern('[0-9 ]*'),
    Validators.required,
    Validators.maxLength(70),
    Validators.minLength(3)
  ]);
  controlTipoServicio= new FormControl('',[
    Validators.required,
    Validators.maxLength(70),
    Validators.minLength(3)
  ]);
  private operacionRealizar ="Pago de servicio";
  private mensaje = "Ha ocurrido un error al pago de servicio";
  isChecked= false;
  private deuda: Deuda = new Deuda();

  constructor(private servicioPago: PagoServicioService,
              private tokenService: TokenService,
              private servicioDeuda: DeudaService,
              private router: Router) { }

  ngOnInit(): void {
  }
  setDatosPagoServicio(){
    this.servicio.pagoServicio = this.controlCuotaServicio.value;
    this.servicio.tipoServicio = this.controlTipoServicio.value;
    this.servicio.nombrePropietarioServicio = this.controlNombrePropietarioServicio.value;
    this.servicio.codigoServicio = this.controlCodigoServicio.value;
    this.pagoServicio.nombreApuntador = this.tokenService.getUserName();
    this.pagoServicio.servicio = this.servicio;
    this.pagoServicio.anotacionPagoServicio = this.anotacionPagoServicio;
    this.pagoServicio.vueltoPagoServicio = this.controlVueltoServicio.value;
  }
  guardarPagoServicio() {
    this.setDatosPagoServicio();
    this.servicioDeuda.getDeudor(this.controlCodigoServicio.value).subscribe(
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
    this.servicioPago.guardarPagoServicio(this.pagoServicio).subscribe(
        ()=>{
          this.router.navigate(['/'])
          Alertas.smsSatisfactorio(this.operacionRealizar +" guardados satisfactoriamente")
        },
        error => {
          Alertas.smsError("Error",this.mensaje)
        }
    )
  }
  getAnotacion() {
    if(this.isChecked){
      var nota = "";
      if(this.anotacionPagoServicio!=undefined){
        nota = this.anotacionPagoServicio;
      }
      var nombre = ""
      if(this.controlNombreDeudor.value != undefined){
        nombre = this.controlNombreDeudor.value;
      }
      return nota + " Dinero prestado por deposito a "+ nombre;
    }else{
      var anotacion =""
      if(this.anotacionPagoServicio != undefined){
        anotacion = this.anotacionPagoServicio
      }
      return anotacion;
    }
  }
  guardarOperaciones(){
    if(this.isChecked){
      this.deuda.anotacionDeuda = 'Dinero prestado por deposito a '+ this.controlNombreDeudor.value
      this.deuda.nombreApuntador = this.tokenService.getUserName()
      this.deuda.cantidadPrestada = this.controlCuotaServicio.value
      this.deuda.nombrePrestamista  = this.controlNombreDeudor.value
      this.deuda.nosDeben = true
      this.servicioDeuda.guardarDeuda(this.deuda).subscribe(()=>{
            this.operacionRealizar += ' y Deuda';
            this.mensaje += ", asegúrate de eliminar la última deuda "
            this.guardarPagoServicio()
          }, error => {
            Alertas.smsError("Error", "no conectado a la base de datos")
          }
      )
    }else{
      this.guardarPagoServicio()
    }
  }
  esValidoGuardar() {
    if(this.controlCodigoServicio.invalid){
      return true
    }
    if(this.controlNombrePropietarioServicio.invalid){
      return true
    }
    if(this.controlTipoServicio.invalid){
      return true
    }
    if(this.controlCuotaServicio.invalid){
      return true
    }
    if(this.controlVueltoServicio.invalid){
      return true
    }
    if(this.isChecked){
      if(this.controlNombreDeudor.invalid){
        return true;
      }
    }
    return false;
  }
  guardar() {
    this.guardarOperaciones()
  }
}
