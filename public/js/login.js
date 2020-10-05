

// // funcion que comprueba el mail
// function comprobarUsuario(){
//     console.log(this.classList);
    
//     if(comprobacionEmail.test(this.value)){


//         this.classList.add("correcto");
//         this.classList.remove("incorrecto");

//     }else{

//         this.classList.add("incorrecto");
//         this.classList.remove("correcto");
//     }
    
   

// }

// //funcion que comprueba la contraseña
// function comprobarContraseña(){
    
//     let comprobacionPassword;

//     if(comprobacionPassword.test(this.value)){


//         this.classList.add("correcto");
//         this.classList.remove("incorrecto");

//     }else{

//         this.classList.add("incorrecto");
//         this.classList.remove("correcto");
//     }
    
// }

//funcion login
function login(){

    let usuario = document.querySelector('input[name="usuario"]').value;
    let contraseña = document.querySelector('input[name="password"]').value;

    let url = 'api/usuarios/isValidUser'; //con esta ruta llamo al servidor por fin, lloro muy fuerte
    let data = { user: usuario, password: contraseña};

     fetch(url, {
             method: 'POST',
             dataType: 'json',
             body: JSON.stringify(data), // data can be `string` or {object}!
             headers: {
                 'Content-Type': 'application/json'
             }
        }).then(res => res.json())
         .catch(error => console.error('Error:', error))
         .then(response => console.log('Success:', response));
         
}

function init() {

    // document.querySelector('input[name="usuario"]').addEventListener('blur', comprobarUsuario);
    // document.querySelector('input[name="password"]').addEventListener('blur', comprobarContraseña);
    document.querySelector('input[name="login"]').addEventListener("click", login);
}



window.onload = init;