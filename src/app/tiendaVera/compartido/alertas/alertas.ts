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
}