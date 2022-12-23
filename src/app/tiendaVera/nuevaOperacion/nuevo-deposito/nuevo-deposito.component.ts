import { Component, OnInit } from '@angular/core';
import {DepositoService} from "../../compartido/servicios/deposito.service";
import {Cuenta} from "../../compartido/modelos/cuenta.model";
import {Deposito} from "../../compartido/modelos/deposito.model";
import {DeudaService} from "../../compartido/servicios/deuda.service";
import {Deuda} from "../../compartido/modelos/deuda.model";
import {TokenService} from "../../../seguridad/servicios/token.service";
import {FormControl, Validators} from "@angular/forms";
import {Alertas} from "../../compartido/alertas/alertas";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nuevo-deposito',
  templateUrl: './nuevo-deposito.component.html',
  styleUrls: ['./nuevo-deposito.component.css']
})
export class NuevoDepositoComponent implements OnInit {
  anotacionDeposito: string;
  cuenta: Cuenta = new Cuenta();
  deposito: Deposito = new Deposito();
  isChecked = false;
  deuda: Deuda = new Deuda();

  controlCantDeposito = new FormControl('',[
    Validators.required,
    Validators.min(0)
  ]);
  controlVueltoDeposito = new FormControl(0,[
      Validators.required,
      Validators.min(0)
  ]);
  controlNumCuenta: FormControl = new FormControl('',[
      Validators.required,
      Validators.pattern('[0-9 ]*'),
      Validators.maxLength(25),
      Validators.minLength(5)
  ]);
  controlNombre: FormControl = new FormControl('',[
    Validators.required,
    Validators.maxLength(70),
    Validators.minLength(5)
  ]);
  controlNombreDeudor: FormControl = new FormControl('',[
    Validators.required,
    Validators.maxLength(70),
    Validators.minLength(3)
  ]);
  controlDniDepositante: FormControl = new FormControl('',[
    Validators.pattern('[0-9]*'),
    Validators.maxLength(8),
    Validators.minLength(8)
  ]);

  operacionRealizar = 'Deposito';
  mensaje = "Ha ocurrido un error al guardar el deposito"
  constructor(private servicioDeposito: DepositoService,
              private servicioDeuda: DeudaService,
              private tokenService: TokenService,
              private router: Router) { }
  guardarOperaciones(){
    if(this.isChecked){
      this.deuda.anotacionDeuda = 'Dinero prestado por deposito a '+ this.controlNombreDeudor.value
      this.deuda.nombreApuntador = this.tokenService.getUserName()
      this.deuda.cantidadPrestada = this.controlCantDeposito.value
      this.deuda.nombrePrestamista  = this.controlNombreDeudor.value
      this.deuda.nosDeben = true
      this.servicioDeuda.guardarDeuda(this.deuda).subscribe(()=>{
        this.operacionRealizar += ' y Deuda';
        this.mensaje += ", asegúrate de eliminar la última deuda"
        this.guardarDeposito()
      }, error => {
            Alertas.smsError("Error", "no conectado a la base de datos")
          }
      )
    }else{
      this.guardarDeposito()
    }
  }
  setDatosDeposito(){
    this.cuenta.numeroCuenta = this.controlNumCuenta.value;
    this.cuenta.nombrePropietarioCuenta = this.controlNombre.value;
    this.deposito.cuenta= this.cuenta;
    this.deposito.vueltoDeposito= this.controlVueltoDeposito.value;
    this.deposito.dniDepositante= this.controlDniDepositante.value;
    this.deposito.dineroDepositar= this.controlCantDeposito.value;
    this.deposito.nombreApuntador= this.tokenService.getUserName();
    this.deposito.anotacionDeposito = this.getAnotacion();
  }
  ngOnInit(): void {
  }
  guardar(){
    this.guardarOperaciones();
  }
  guardarDeposito(){
    this.setDatosDeposito();
    this.servicioDeuda.getDeudor(this.controlDniDepositante.value).subscribe(
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
    this.servicioDeposito.guardarDeposito(this.deposito).subscribe(
        ()=>{
          this.router.navigate(['/'])
          Alertas.smsSatisfactorio(this.operacionRealizar +" guardados satisfactoriamente")
        },
        error => {
          Alertas.smsError("Error",this.mensaje)
        }
    )
  }

  esValidoGuardar() {
    if(this.controlNumCuenta.invalid) {
      return true
    }
    if (this.controlNombre.invalid){
      return true;
    }
    if (this.controlCantDeposito.invalid){
      return true
    }
    if(this.controlVueltoDeposito.invalid){
      return true
    }
    if(this.controlDniDepositante.invalid){
      return true
    }
    if(this.isChecked){
      if(this.controlNombreDeudor.invalid){
        return true;
      }
    }
    return false;

  }
  getAnotacion() {
      if(this.isChecked){
        var nota = "";
        if(this.anotacionDeposito!=undefined){
          nota = this.anotacionDeposito;
        }
        var nombre = ""
        if(this.controlNombreDeudor.value != undefined){
          nombre = this.controlNombreDeudor.value;
        }

        return nota + " Dinero prestado por deposito a "+ nombre;
      }else{
        var anotacion =""
        if(this.anotacionDeposito != undefined){
          anotacion = this.anotacionDeposito
        }
        return anotacion;
      }
  }
}
