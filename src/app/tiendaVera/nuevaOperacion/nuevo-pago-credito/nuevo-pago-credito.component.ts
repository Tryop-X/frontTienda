import { Component, OnInit } from '@angular/core';
import {PagoCredito} from "../../compartido/modelos/pagoCredito.model";
import {Credito} from "../../compartido/modelos/credito.model";
import {PagoCreditoService} from "../../compartido/servicios/pago-credito.service";
import Swal from "sweetalert2";
import {TokenService} from "../../../seguridad/servicios/token.service";
import {FormControl, Validators} from "@angular/forms";
import {Alertas} from "../../compartido/alertas/alertas";
import {Deuda} from "../../compartido/modelos/deuda.model";
import {DeudaService} from "../../compartido/servicios/deuda.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nuevo-pago-credito',
  templateUrl: './nuevo-pago-credito.component.html',
  styleUrls: ['./nuevo-pago-credito.component.css']
})
export class NuevoPagoCreditoComponent implements OnInit {


  pagoCredito: PagoCredito = new PagoCredito();
  credito: Credito = new Credito();
  isChecked= false;
  anotacionPagoCredito: string;

  controlCuotaCredito = new FormControl('', [
      Validators.required,
      Validators.min(0)
  ]);
  controlVueltoCredito = new FormControl(0, [
    Validators.required,
    Validators.min(0)
  ]);
  controlNombreDeudor = new FormControl('',[
    Validators.required,
    Validators.maxLength(70),
    Validators.minLength(3)
  ]);
  controlNombrePropietario = new FormControl('',[
    Validators.required,
    Validators.maxLength(70),
    Validators.minLength(3)
  ]);
  controlDniPropietario = new FormControl('',[
    Validators.pattern('[0-9 ]*'),
    Validators.required,
    Validators.maxLength(70),
    Validators.minLength(3)
      ]);
  controlNumPagare= new FormControl('',[
    Validators.pattern('[0-9 ]*'),
    Validators.minLength(3)
  ]);
  private operacionRealizar ="Pago de crédito";
  private mensaje = "Ha ocurrido un error al pago de credito";

  private deuda: Deuda = new Deuda();

  constructor(private pagoCreditoService: PagoCreditoService,
              private tokenService: TokenService,
              private servicioDeuda: DeudaService,
              private router: Router
  ) { }
  ngOnInit(): void {
  }
  setDatosPagoCredito(){
    this.credito.cuotaCredito = this.controlCuotaCredito.value;
    this.credito.nombrePropietarioCredito = this.controlNombrePropietario.value;
    this.credito.dniPropietario = this.controlDniPropietario.value;
    this.credito.numeroPagare = this.controlNumPagare.value;
    this.pagoCredito.credito = this.credito;
    this.pagoCredito.nombreApuntador = this.tokenService.getUserName();
    this.pagoCredito.anotacionPagoCredito = this.anotacionPagoCredito;
    this.pagoCredito.vueltoPagoCredito = this.controlVueltoCredito.value;
  }
  guardarOperaciones(){
    if(this.isChecked){
      this.deuda.anotacionDeuda = 'Dinero prestado por deposito a '+ this.controlNombreDeudor.value
      this.deuda.nombreApuntador = this.tokenService.getUserName()
      this.deuda.cantidadPrestada = this.controlCuotaCredito.value
      this.deuda.nombrePrestamista  = this.controlNombreDeudor.value
      this.deuda.nosDeben = true
      this.servicioDeuda.guardarDeuda(this.deuda).subscribe(()=>{
            this.operacionRealizar += ' y Deuda';
            this.mensaje += ", asegúrate de eliminar la última deuda "
            this.guardarPagoCredito()
          }, error => {
            Alertas.smsError("Error", "no conectado a la base de datos")
          }
      )
    }else{
      this.guardarPagoCredito()
    }
  }
  guardar(){
    this.guardarOperaciones()
  }
  guardarPagoCredito() {
      this.setDatosPagoCredito();


    this.servicioDeuda.getDeudor(this.controlDniPropietario.value).subscribe(
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
    this.pagoCreditoService.guardarPagoCredito(this.pagoCredito).subscribe(
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
      if(this.anotacionPagoCredito!=undefined){
        nota = this.anotacionPagoCredito;
      }
      var nombre = ""
      if(this.controlNombreDeudor.value != undefined){
        nombre = this.controlNombreDeudor.value;
      }

      return nota + " Dinero prestado por deposito a "+ nombre;
    }else{
      var anotacion =""
      if(this.anotacionPagoCredito != undefined){
        anotacion = this.anotacionPagoCredito
      }
      return anotacion;
    }
  }
  esValidoGuardar() {
    if (this.controlDniPropietario.invalid){
      return true;
    }
    if (this.controlNombrePropietario.invalid){
      return true;
    }
    if (this.controlCuotaCredito.invalid){
      return true;
    }
    if (this.controlVueltoCredito.invalid){
      return true;
    }
    if(this.controlDniPropietario.invalid){
      return true
    }
    if(this.controlNumPagare.invalid){
      return true
    }
    if(this.isChecked){
      if(this.controlNombreDeudor.invalid){
        return true
      }
    }
    return false;
  }
}
