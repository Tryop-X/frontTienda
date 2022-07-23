import { Component, OnInit } from '@angular/core';
import {NuevoUsuario} from "../../modelos/nuevo-usuario";
import {UsuariosService} from "../../servicios/usuarios.service";

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {

  nuevoUsuario:NuevoUsuario= new NuevoUsuario();
  nombreUsuario: string;
  contrasegna: string;
  roles: string[] = ["user"];
  isChecked: true;

  constructor(private usuarioService: UsuariosService) { }

  ngOnInit(): void {
  }

  esValido() {
    return false;
  }


  crearUsuario() {
    this.nuevoUsuario.nombreUsuario = this.nombreUsuario;
    this.nuevoUsuario.contrasegnaUsuario = this.contrasegna;
    if(this.isChecked){
      this.roles.push("admin")
    }
    this.nuevoUsuario.roles = this.roles;

    this.usuarioService.createUsuario(this.nuevoUsuario).subscribe(
        ()=>{
      console.log("exito")
    },
            error => {
          console.log(error)

        }
        )

    console.log(this.nuevoUsuario)


  }
}
