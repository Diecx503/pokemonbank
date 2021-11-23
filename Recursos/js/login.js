
//CREACION DE LOCALSTORAGE PARA CREDENCIALES
if (cargarD("credenciales").length<= 0) {
    let credenciales = {
       nombre: "Ash Ketchum",
       cuenta: "0987654321",
       saldoInicial: 500.00
   }
   guardarD ("credenciales", credenciales);   
   }
   else{
       let credenciales = cargarD("credenciales");
   }

//VALIDANDO LOS DATOS DEL LOGIN
function login() {
    var pin = document.getElementById('PIN');
    pin.type = "text"
    var PIN = pin.value;
    if (PIN == '1234') {
        document.location.href = "principal.html";
    }

    if (PIN == '') {
        swal.fire({
            title: 'Atencion',
            text: 'El campo PIN no puede quedar vacio',
            icon: 'warning',
            confirmbuttonText: 'intentar',
            backdrop: 'true',
        })
    } else {
        swal.fire({
            title: 'Error',
            text: 'PIN no valido',
            icon: 'Error',
            confirmbuttonText: 'Avanzar',
            backdrop: 'true'
        })

    }
}
