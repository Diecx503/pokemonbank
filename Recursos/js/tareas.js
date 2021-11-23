


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

let montoTotal = parseFloat(credenciales.saldoInicial).toFixed(2);
let operacionM = 0;

function ingresos() {
    vfecha = new Date().toLocaleString();
    vtransaccion = "Deposito";
    var vDeposito = document.getElementById('montodeposito').value;
    nuevoDeposito = {
        fecha: vfecha,
        transaccion: vtransaccion,
        monto: vDeposito
    }
    operacionM = parseFloat(montoTotal) + parseFloat(vDeposito);
    credenciales.saldoInicial = operacionM.toFixed(2);
    guardarD("credenciales", credenciales);
    console.log(operacionM);
    console.log(credenciales.saldoInicial);
    datos.push(nuevoDeposito);
    guardarD("datos" , datos);
    swal.fire({
        title: 'Exito',
        text: 'Su transaccion ha sido exitosa',
        icon: "success",
        button: "Imprimir comprobante",
        
    })
}

function retiro() {
    vfecha = new Date().toLocaleString();
    vtransaccion = "Retiro";
    var vRetiro = document.getElementById('montoderetiro').value;
    if(montoTotal > vRetiro){
    nuevoRetiro = {
        fecha: vfecha,
        transaccion: vtransaccion,
        monto: vRetiro
    }
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
    }
    else{
        swal.fire({
            title: 'Error',
            text: 'Fondos insuficientes',
            icon: 'error',
            confirmbuttonText: 'Avanzar',
            backdrop: 'true'
        })
    }
}

function pago() {
    vfecha = new Date().toLocaleString();
    vtransaccion = "Pago del servicio de "+ document.getElementById('pagos').value;
    var vPago = document.getElementById('montodepago').value;
    if(montoTotal > vPago){
    nuevopago = {
        fecha: vfecha,
        transaccion: vtransaccion,
        monto: vPago

    }
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

    }
    else{
        swal.fire({
            title: 'Error',
            text: 'Fondos insuficientes',
            icon: 'error',
            confirmbuttonText: 'Avanzar',
            backdrop: 'true'
        })
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

    doc.text(20, 20, 'Comprobante de ' + '' + document.getElementById("btndeposito").value);
    
    doc.text(20, 30, 'Numero de cuenta: ' +  localStorage.getItem("credenciales"));
    
   
    doc.text(20, 40, 'Fecha' + fecha);
    
    
    doc.text(20, 50, 'vMonto' + monto);
    
    doc.setFont('courier')
    doc.setFontType('bolditalic')
    doc.text(20, 60, 'This is courier bolditalic.')
    
doc.autoPrint({Variant:'non-conform'});
doc.save('comprobante.pdf');

}
function graficasTransacciones(){
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["ingresos","retio","pago"],
        datasets: [{
            label: 'myChart',
            data: [localStorage.getItem("transaccion")],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
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
