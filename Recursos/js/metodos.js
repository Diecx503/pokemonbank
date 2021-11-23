//METODO PARA GUARDAR Y CARGAR DATOS DE LOCALSTORAGE
var guardarD = function( nombreD, datosG){
    localStorage.setItem(nombreD, JSON.stringify(datosG));
}

var cargarD = function(nombreD){
    let datosG = [];
    datosG = localStorage.getItem(nombreD) === null ? [] : JSON.parse(localStorage.getItem(nombreD));
    return datosG;
}

