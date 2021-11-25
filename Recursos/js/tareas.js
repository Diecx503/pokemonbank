
let datos = [];

if (cargarD("credenciales").length<= 0) {
    window.location.href = "index.html";
}
if (cargarD("datos").length <= 0){
datos = [{
    fecha: new Date().toLocaleString(),
    transaccion: "Deposito",
    monto: 500.00    
}];
 guardarD("datos", datos);
}
else {
    datos = cargarD("datos");
}
    //CONVIRTIENDO Y GUARDANDOLO EN UNA VARIABLE

let credenciales = cargarD("credenciales");

let montoTotal = 0;
let operacionM = 0;
let vM = 0;
var contadorI;
var contadorE;
if(cargarD("contadorI").length<=0){
    contadorI = 1;
    guardarD("contadorI", contadorI);
}
else{
 contadorI = cargarD("contadorI"); 
}
if(cargarD("contadorE").length<=0){
    contadorE = 0;
    guardarD("contadorE", contadorE);
}
else
{
 contadorE = cargarD("contadorE");
}

function ingresos() {
    vfecha = new Date().toLocaleString();
    vtransaccion = "Deposito";
    var vDeposito = document.getElementById('montodeposito').value;
    if(vDeposito == ''){
        swal.fire({
            title: 'Atencion',
            text: 'El campo Deposito no puede quedar vacio',
            icon: 'warning',
            confirmbuttonText: 'intentar',
            backdrop: 'true',
        })
    }
    else
    {
    contadorI = parseFloat(contadorI) + 1;
    guardarD("contadorI", contadorI);
    vM = document.getElementById('montodeposito').value;    
    nuevoDeposito = {
        fecha: vfecha,
        transaccion: vtransaccion,
        monto: vDeposito
    }
    montoTotal = parseFloat(credenciales.saldoInicial).toFixed(2);
    operacionM = parseFloat(montoTotal) + parseFloat(vDeposito);
    credenciales.saldoInicial = operacionM.toFixed(2);
    guardarD("credenciales", credenciales);
    console.log(operacionM);
    console.log(credenciales.saldoInicial);
    datos.push(nuevoDeposito);
    guardarD("datos" , datos);
    swal.fire ({
        title: 'Exito',
        text: 'Su transaccion ha sido exitosa',
        icon: "success",
        button: {
            ok: "Aceptar", 
        }
    })
    limpiarD('montodeposito');
  }
}


function retiro() {
    vfecha = new Date().toLocaleString();
    vtransaccion = "Retiro";
    var vRetiro = document.getElementById('montoderetiro').value;
    
    if (vRetiro == '') {
        swal.fire({
            title: 'Atencion',
            text: 'El campo Retiro no puede quedar vacio',
            icon: 'warning',
            confirmbuttonText: 'intentar',
            backdrop: 'true',
        })
    }
    else{

    if( parseFloat(credenciales.saldoInicial) > vRetiro){
    nuevoRetiro = {
        fecha: vfecha,
        transaccion: vtransaccion,
        monto: vRetiro
    }
    contadorE = parseFloat(contadorE) + 1;
    guardarD("contadorE", contadorE);
    vM = document.getElementById('montoderetiro').value;
    montoTotal = parseFloat(credenciales.saldoInicial).toFixed(2);
    operacionM = parseFloat(montoTotal) - parseFloat(vRetiro);
    credenciales.saldoInicial = operacionM.toFixed(2);
    guardarD("credenciales", credenciales);
    datos.push(nuevoRetiro);
    guardarD("datos" , datos);
    swal.fire({
        title: 'Exito',
        text: 'Su transaccion ha sido exitosa',
        icon: "success",
        button: "Imprimir comprobante",
        
    })
    limpiarD('montoderetiro');
    }
    else{
        swal.fire({
            title: 'Error',
            text: 'Fondos insuficientes',
            icon: 'error',
            confirmbuttonText: 'Avanzar',
            backdrop: 'true'
        })
        limpiarD('montoderetiro');
    }
  }
}

function pago() {
    vfecha = new Date().toLocaleString();
    vtransaccion = "Pago del servicio de "+ document.getElementById('pagos').value;
    var vPago = document.getElementById('montodepago').value;
if(vPago == ''){
  swal.fire({
            title: 'Atencion',
            text: 'El campo Monto no puede quedar vacio',
            icon: 'warning',
            confirmbuttonText: 'intentar',
            backdrop: 'true',
        })
}
else{

    if( parseFloat(credenciales.saldoInicial) > vPago){
    nuevopago = {
        fecha: vfecha,
        transaccion: vtransaccion,
        monto: vPago

    }
    contadorE = parseFloat(contadorE) + 1;
    guardarD("contadorE", contadorE);
    vM = document.getElementById('montodepago').value;
    montoTotal = parseFloat(credenciales.saldoInicial).toFixed(2);
    operacionM = parseFloat(montoTotal) - parseFloat(vPago);
    credenciales.saldoInicial = operacionM.toFixed(2);
    guardarD("credenciales", credenciales);
    datos.push(nuevopago);
    guardarD("datos" , datos);
    swal.fire({
        title: 'Exito',
        text: 'Su transaccion ha sido exitosa',
        icon: "success",
        button: "Imprimir comprobante",
        
    })
        limpiarD('montodepago');
    }
    else{
        swal.fire({
            title: 'Error',
            text: 'Fondos insuficientes',
            icon: 'error',
            confirmbuttonText: 'Avanzar',
            backdrop: 'true'
        })
        limpiarD('montodepago');
    }
  }
}

$(document).ready(function(){
    cargarP(credenciales);
   
   let historialT = cargarD("datos");
   let tr;
   let tbody = $('#tablaH');
   for ( let i=0; i < historialT.length; i++) {
           tr = $("<tr><td>"+ historialT[i].fecha +"</td><td>"+ historialT[i].transaccion + "</td><td>"+ historialT[i].monto +"</td></tr>");
           tbody.append(tr);
   };
   
   })

//METODOS
let cargarP = function(datos){
    if(datos){
        $("#nombrecuenta").html(datos.nombre +" "+ datos.cuenta);
        $("#saldototal").html("$" + parseFloat(datos.saldoInicial).toFixed(2));
    }
};


function imprimirTransferencias() 
{
    var doc = new jsPDF()
doc.setFontType('bold');
doc.setFontSize(22);
    doc.text(50, 20, 'COMPROBANTE DE TRANSACCIÓN');
doc.setFontSize(16);    
doc.setFont('courier');
   doc.text(20, 30, 'Numero de cuenta: ' +  credenciales.cuenta);

   doc.text(20, 40, 'Numero de usuario: ' +  credenciales.nombre);   
    
   doc.text(20, 50, 'Fecha: ' +  vfecha); 

   doc.text(20, 60, 'Tipo de transaccion: ' +  vtransaccion);

   doc.text(20, 70, 'Monto: $' + vM);

   doc.text(20, 80, 'Saldo Total: $' + credenciales.saldoInicial);

    
doc.autoPrint({Variant:'non-conform'});
doc.save('comprobante.pdf');

}


function graficasTransacciones(){
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Ingresos', 'Egresos'],
        datasets: [{
            label:'Ingresos y Egresos',
            data: [cargarD("contadorI"), cargarD("contadorE")],

            backgroundColor: [
                'rgba(54, 162, 235)',
                'rgba(255, 0, 0)'
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 0, 0, 1)'
            ],
            borderWidth: 2,
            hoverOffset: 4
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
}
