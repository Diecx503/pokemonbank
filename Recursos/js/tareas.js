//CREACION DE LOCALSTORAGE PARA CREDENCIALES


function guardardatos() {
    let credenciales = {
        nombre: "Ash Ketchum",
        cuenta: "0987654321",
        saldoInicial: 500.00
    }
    //GUARDANDO OBJETO EN LOCALSTORAGE
    localStorage.setItem("credenciales", JSON.stringify(credenciales));
    //CONVIRTIENDO Y GUARDANDOLO EN UNA VARIABLE
    let informacion = JSON.parse(localStorage.getItem("credenciales"));
    //DANDOLE UBICACION AL OBJETO POR MEDIO DE UN ('ID')
    var usuario = document.getElementById('nombrecuenta');
    usuario.innerHTML = informacion.nombre + " " + informacion.cuenta;

    var saldo = document.getElementById('saldototal');
    saldo.innerHTML = "$" + informacion.saldoInicial;
}
guardardatos();
