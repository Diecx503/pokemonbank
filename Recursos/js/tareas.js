//CREACION DE LOCALSTORAGE PARA CREDENCIALES
let credenciales = {
    nombre: "Ash Ketchum",
    cuenta: "0987654321",
    saldoInicial: 500.00
}

function guardardatos() {
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


//CREANDO EL LOCALSTORAGE DE TRANSACCIONES 
let datos= [];
datos =[{
fecha:new Date().toLocaleString(),
transaccion: "Deposito",
monto: 500.00
}];

var fGuardarH= function guardarhistorial(){
    localStorage.setItem("historial", JSON.stringify(datos));
}

function depositos(){
    
}

