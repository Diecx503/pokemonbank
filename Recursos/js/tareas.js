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
    var saldo = document.getElementById('saldototal');
    if (saldo == null) {
        usuario.innerHTML = informacion.nombre + " " + informacion.cuenta;
    } else {
        usuario.innerHTML = informacion.nombre + " " + informacion.cuenta;
        saldo.innerHTML = "$" + informacion.saldoInicial;
    }


}
guardardatos();


//CREANDO EL LOCALSTORAGE DE TRANSACCIONES 
let datos = [];
datos = [{
    fecha: new Date().toLocaleString(),
    transaccion: "Deposito",
    monto: 500.00
    
}];

function guardarhistorial() {
    localStorage.setItem("historial", JSON.stringify(datos));
}

function cargarHistorial() {
    datosH = JSON.parse(localStorage.getItem("historial"));
}
cargarHistorial();

function ingresos() {
    vfecha = new Date().toLocaleString();
    vtransaccion = "Deposito";
    var vDeposito = document.getElementById('montodeposito').value;
    nuevoDeposito = {
        fecha: vfecha,
        transaccion: vtransaccion,
        monto: vDeposito
    }
    datos.push(nuevoDeposito);
    guardarhistorial();
}

function retiro() {
    vfecha = new Date().toLocaleString();
    vtransaccion = "Retiro";
    var vRetiro = document.getElementById('montoderetiro').value;
    nuevoRetiro = {
        fecha: vfecha,
        transaccion: vtransaccion,
        monto: vRetiro
    }
    datos.push(nuevoRetiro);
    guardarhistorial();
}

function pago() {
    vfecha = new Date().toLocaleString();
    vtransaccion = "pago";
    var vPago = document.getElementById('montodepago').value;
    nuevopago = {
        fecha: vfecha,
        transaccion: vtransaccion,
        monto: vPago
    }
    datos.push(nuevopago);
    guardarhistorial();

}

var tabla = document.getElementById('tablaH');

function tablaHistorial() {
    let informacionTabla = JSON.parse(localStorage.getItem('historial'));
    var tablaT = [];
    let tablaHistorial = "<tr> <td>" + informacionTabla.vfecha + "</td>  <td>" + informacionTabla.vtransaccion + "</td> <td>" + informacionTabla.vmonto + "</td></tr>";
    tablaT.push(tablaHistorial);
    console.log(informacionTabla);
localStorage.setItem('tablaTransacciones' ,tablaT);

}
tablaHistorial();

function imprimirDatos(){
var tablaInicio= localStorage.getItem('tablaTransacciones');
document.getElementById("tablaH").innerHTML = tablaInicio;


}