function mensajeError(msg, input) {
    
    
}

async function enviarAlServidor(usuario, contraseña){

    let url = 'api/usuarios/logIn'; //con esta ruta llamo al servidor por fin, lloro muy fuerte
    let data = { nickname: usuario, password: contraseña};

     let body = {
             method: 'POST',
             body: JSON.stringify(data),
             headers: {
                 'Content-Type': 'application/json'
             }
        };

        let res1 = await fetch(url ,body);
        let res2= await res1.json();
        return res2;

}

async function login(){

    let usuario = document.querySelector('input[name="usuario"]').value;
    let contraseña = document.querySelector('input[name="password"]').value;

    let respuesta = await enviarAlServidor(usuario, contraseña);
    console.log("comprobando respuesta", respuesta);

    if(respuesta.succes){
        
        //Guardamos el usuario en el local storage
        localStorage.setItem('user', respuesta.user.id);
        
        window.location.href = 'api/usuarios/profile';

    }else{

        mensajeError(respuesta.message);
        
    }

   

       
       
         
}

function init() {

    document.querySelector('input[name="login"]').addEventListener("click", login);
    document.querySelector("body").onkeydown = function(e){
       if( e.keyCode == 13){
           login();
       }
    }
}



window.onload = init;