import Swal from "sweetalert2";

export class Alertas {
    public static smsSatisfactorio(titulo: string){
        Swal.fire({
            icon: 'success',
            title: titulo,
            showConfirmButton: false,
            timer: 1500
        })
    }
    public static smsError(titulo: string, sms: string){
        Swal.fire({
            title: titulo,
            text: sms,
            icon:"error",
        })
    }

    public static smsConfirmar(titulo: string, sms: string){
        return Swal.fire({
            title: titulo,
            text: sms,
            icon:'warning',
            showCancelButton:true,
            confirmButtonText:'Está bien',
            confirmButtonColor:'rgba(44,43,43,0.85)',
            cancelButtonColor:'#8f7474',
        })
    }

    public static smsDeudor(titulo: string, nombre: string, monto: string, adeudado: string){
        return Swal.fire({
            title: titulo,
            html: '<b>Nombre: </b> '+nombre + '<br><br>' +'<b>Monto: </b> '+monto + '<br><br>'  +'<b>Adeudado: </b> '+adeudado ,
            icon:'warning',
            showCancelButton:true,
            confirmButtonText:'Aceptar Riesgo',
            confirmButtonColor:'#8d4242',
            cancelButtonColor:'#7ab679',
        })
    }

    public static noDeudor(){
        return Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'No se encontraron deudas',
            showConfirmButton: false,
            timer: 1500
        })
    }

    public static sinDatosDeudos(){
        return Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'No se ha podido validar si es deudor',
            showConfirmButton: false,
            timer: 1500
        })
    }

}