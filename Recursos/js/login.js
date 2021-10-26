
function login(){
    var pin= document.getElementById('PIN');
    pin.type= "text"
    var PIN = pin.value;
     if (PIN=='1234'){
         document.location.href="principal.html";
         
  }

if(PIN==''){
    swal.fire({
        title: 'Atencion',
        text: 'El campo PIN no puede quedar vacio',
        icon: 'warning',
        confirmbuttonText:'intentar',
       backdrop: 'true',
    })
}
    else{
    swal.fire({
      title:'Error',
        text: 'PIN no valido',
        icon: 'Error',
         confirmbuttonText: 'Avanzar',
        backdrop: 'true'
    })
    
}
 
 }
    



