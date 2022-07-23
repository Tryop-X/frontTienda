export class LoginUsuario {
    nombreUsuario: string;
    contrasegnaUsuario : string;


    constructor(nombre: string, contrasegna: string) {
        this.nombreUsuario = nombre;
        this.contrasegnaUsuario = contrasegna;
    }
}
