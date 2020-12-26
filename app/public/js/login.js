function compararPasswords(pass, repass){
    let msg;
    console.log(pass, repass);
    if (pass == repass){
        msg = 'correcto';
        quitarError("newUser", "contraseña")
        quitarError("newUser", "passwordRepetida")
    }else{
        msg = 'Las contraseñas no coinciden';
    }

    return msg;
}

function quitarError(divinput, input){

    let divError = document.getElementById("error-"+ divinput);
    let inputError = document.querySelector("input[name="+input+"]");

    if(!divError.classList.contains("invisible")){
        divError.classList.add("invisible");
        inputError.classList.remove("incorrecto");
    }

}

function mensajeError(msg, divinput, input) {
   
    let divError = document.getElementById("error-"+ divinput);
    let inputError = document.querySelector("input[name="+input+"]");
    
    divError.innerHTML =
    '<i class="fas fa-exclamation-circle" ></i>' +
    '<span>' + msg + '</span>';
    divError.classList.remove("invisible");
    inputError.classList.add("incorrecto");
    
}


function validatePassword(password) {
    //Should have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long
    const passwordRegex = /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/
    let msg;

    if (password.length == 0){

        msg = 'Debe rellenar este campo';

    }else if (passwordRegex.test(password)){

        msg = 'correcto';

    }else{

        msg = 'La contraseña debe contener al menos 8 carácteres, 1 minuscula, 1 mayuscula y 1 número';

    } 

    return msg;
}


function validarInputs(input) {
    let msg;

    if(input.length == 0){
        msg = 'Debe rellenar este campo';

    }else{
        msg = 'correcto';
    }

    return msg;
}

function validateNickname (nickname) {
    
    const nicknameRegex = /^[A-z0-9_-]{3,16}$/
    let msg;
    
    if (nicknameRegex.test(nickname)){
        msg = 'correcto';

    }else{

        if (nickname.length == 0){

            msg = 'Debe rellenar este campo';

        } 
        else if (nickname.length < 3){

            msg = 'Este campo debe tener mínimo 3 carácteres';

        }else{
            msg = 'Este campo puede tener máximo 16 carácteres';
        }
    };

    return msg;
}

function validarNombre (name) {

    const nameRegex = /^([A-zÑÁÉÍÓÚ]+[\s]*)+$/
    let msg;

    if (!nameRegex.test(name)) {

        if (name.length == 0){

            msg = 'Debe rellenar este campo';

        }else{
            msg = 'Este campo solo puede contener letras';
        } 

    }else{
        msg = 'correcto';
    } 

    return msg;
}

function validarEmail (email) {

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let msg;

    if (email.length == 0){

        msg = 'Debe rellenar este campo';

    }else if (!emailRegex.test(email)){

        msg = 'Formato de email incorrecto';

    }else{
        msg = 'correcto';
    } 

    return msg;
}

async function verificacion() {
    let validacion;
    let msg;
    let url; 
    let data;
    let comprobacion;   
    

    //comprobar el nickname
    if(this.name == "nickname"){

       validacion = validateNickname(this.value);

        if(validacion != "correcto"){

           mensajeError(validacion,"newUser",this.name);
            

        }else{
            url ="api/usuarios/existeNickname";
            data = {nickname:this.value};
            comprobacion = await enviarAlServidorPost(data, url);
           
            if(comprobacion.msg){

                msg ="Este usuario ya esta cogido";
                mensajeError(msg,"newUser", this.name);

            }else{
                quitarError("newUser", this.name);
               
            }
           
        }

    //comprobar los nombres    
    }else if(this.name == "nombre" || this.name == "apellidos" || this.name == "equipo"){

        validacion = validarNombre(this.value);

        if(validacion != "correcto"){
            
            mensajeError(validacion,"newUser",this.name);

        }else{

            quitarError("newUser", this.name);
        }

    //comprobar el email
    }else if(this.name == "email"){
        
        validacion = validarEmail(this.value);

        if(validacion != "correcto"){
            
            mensajeError(validacion,"newUser",this.name);

        }else{

            url ="api/usuarios/existeEmail";
            data = {email:this.value};
            comprobacion = await enviarAlServidorPost(data, url);

            if(comprobacion.msg){

                msg ="Este email ya existe";
                mensajeError(msg,"newUser", this.name);

            }else{

                quitarError("newUser", this.name);
            }
           
        }

        //compraobacion password
    }else if(this.name == "contraseña"){

        validacion = validatePassword(this.value);
        pass = this.value;
       
        if(validacion != "correcto"){

            mensajeError(validacion,"newUser",this.name);

        }else{
            quitarError("newUser", this.name);

           
            if(repass == ""){
                msg = "Repita la pasword, por favor";

                mensajeError(msg,"newUser",this.name);

            }else{
               
               validacion = compararPasswords(pass, repass); 

               if(validacion != "correcto"){
                
                mensajeError(validacion,"newUser",this.name);
               }

            }
        }
    
      //comprobar la password repetida
    }else if(this.name == "passwordRepetida"){
        
        repass = this.value;
            
        if(pass == ""){
            msg = "Escriba la password antes, por favor";

            mensajeError(msg,"newUser",this.name);

        }else{
               
            validacion = compararPasswords(pass, repass); 

            if(validacion != "correcto"){
               
                mensajeError(validacion,"newUser",this.name);
            }

        }
        
    
    //el resto 
    }else if(this.name == "direccion" || this.name == "dni" || this.name == "nacimiento" || this.name == "creacionEquipo"){
        validacion = validarInputs(this.value);

        if(validacion != "correcto"){

            mensajeError(validacion,"newUser",this.name);

        }else{

            quitarError("newUser", this.name);

        }
    }

}

async function crearUsuario(tipoUsuario) {
    
    let nombreUsuario = document.querySelector('input[name="nickname"]').value;
    let password = document.querySelector('input[name="contraseña"]').value;
    let rePassword = document.querySelector('input[name="passwordRepetida"]').value;
    let direccion = document.querySelector('input[name="direccion"]').value;
    let mail = document.querySelector('input[name="email"]').value;
    let url = "/api/usuarios/createNewUser";
    let urlProfile ="api/usuarios/profile"
    

    if(password == rePassword){

        if(tipoUsuario == "equipo"){

            
            let nombreEquipo = document.querySelector('input[name="equipo"]').value;
            let creacion = document.querySelector('input[name="creacionEquipo"]').value;
            let dataEquipo = {nick:nombreUsuario, pws:password, equipo:nombreEquipo, crnEquipo:creacion, drc:direccion, email:mail, tipo:tipoUsuario}
           
            //crear el usuario
            let respuestaEquipo =  await enviarAlServidorPost(dataEquipo, url);
           
            //loguaerlo directamente
            if(respuestaEquipo == true){
                login(nombreUsuario, password); 
            }
        }
    
        if(tipoUsuario == "jugador"){
    
            let nombreReal = document.querySelector('input[name="nombre"]').value;
            let apellido = document.querySelector('input[name="apellidos"]').value;
            let nacimiento = document.querySelector('input[name="nacimiento"]').value;
            let dni = document.querySelector('input[name="dni"]').value;
    
            let dataUsuario = {nick:nombreUsuario, pws:password, nombre:nombreReal, apellidos:apellido, drc:direccion, ncm:nacimiento, nif:dni, email:mail, tipo:tipoUsuario}
            
            //crear el usuario
            let respuestaJugador = await enviarAlServidorPost(dataUsuario, url);
            
            //loguaerlo directamente
            if(respuestaJugador.validacion == true){
                login(nombreUsuario, password);
            }
        }

    }else{

        mensajeError();
    }


}

//Div del formulario
function createFormNewUser(e){

    let form = document.getElementById("formNewUser");
    let divBoton = document.getElementById("divbtn");
    let boton = document.createElement("input");
    boton.setAttribute("type", "button");
    boton.setAttribute("name", "create");
    boton.setAttribute("value", "Crear Usuario");
    boton.classList.add("btnCrear");

    //Nickname
    let divNickname = document.createElement("div");
    divNickname.classList.add("label-info");
    let labelNickname = document.createElement("p");
    labelNickname.innerText="Nickname";
    let inputNickname = document.createElement("input");
    inputNickname.setAttribute("type","text");
    inputNickname.setAttribute("placeholder", "Nickname");
    inputNickname.setAttribute("name", "nickname");
    inputNickname.addEventListener("blur", verificacion);

    //Password
    let divPassword = document.createElement("div");
    divPassword.classList.add("label-info");
    let labelPassword = document.createElement("p");
    labelPassword.innerText="Contraseña";
    let inputPassword = document.createElement("input");
    inputPassword.setAttribute("type","password");
    inputPassword.setAttribute("placeholder", "Contraseña");
    inputPassword.setAttribute("name", "contraseña");
    inputPassword.addEventListener("blur", verificacion);

    //Repetir Password
    let divRePassword = document.createElement("div");
    divRePassword.classList.add("label-info");
    let labelRePassword = document.createElement("p");
    labelRePassword.innerText="Repetir Contraseña";
    let inputRePassword = document.createElement("input");
    inputRePassword.setAttribute("type","password");
    inputRePassword.setAttribute("placeholder", "Repitir Contraseña");
    inputRePassword.setAttribute("name", "passwordRepetida");
    inputRePassword.addEventListener("blur", verificacion);

    //Equipo
    let divEquipo = document.createElement("div");
    divEquipo.classList.add("label-info");
    let labelEquipo = document.createElement("p");
    labelEquipo.innerText = "Nombre del Equipo" 
    let inputEquipo = document.createElement("input");
    inputEquipo.setAttribute("type","text");
    inputEquipo.setAttribute("placeholder", "Nombre Equipo");
    inputEquipo.setAttribute("name", "equipo");
    inputEquipo.addEventListener("blur", verificacion);

    //Nombre
    let divNombre = document.createElement("div");
    divNombre.classList.add("label-info");
    let labelNombre = document.createElement("p");
    labelNombre.innerText = "Nombre";
    let inputNombre = document.createElement("input");
    inputNombre.setAttribute("type","text");
    inputNombre.setAttribute("placeholder", "Nombre");
    inputNombre.setAttribute("name", "nombre");
    inputNombre.addEventListener("blur", verificacion);

    //Apellidos
    let divApellidos = document.createElement("div");
    divApellidos.classList.add("label-info");
    let labelApellidos = document.createElement("p");
    labelApellidos.innerText = "Apellidos";
    let inputApellidos = document.createElement("input");
    inputApellidos.setAttribute("type","text");
    inputApellidos.setAttribute("placeholder", "Apellidos");
    inputApellidos.setAttribute("name", "apellidos");
    inputApellidos.addEventListener("blur", verificacion);

    //Nacimiento
    let divNacimiento = document.createElement("div");
    divNacimiento.classList.add("label-info");
    let labelNacimiento = document.createElement("p");
    labelNacimiento.innerText = "Fecha de Nacimiento";
    let inputNacimiento = document.createElement("input");
    inputNacimiento.setAttribute("type","text");
    inputNacimiento.setAttribute("placeholder", "Fecha de Nacimiento");
    inputNacimiento.setAttribute("name", "nacimiento");
    inputNacimiento.addEventListener("blur", verificacion);

    //DNI
    let divDni = document.createElement("div");
    divDni.classList.add("label-info");
    let labelDni = document.createElement("p");
    labelDni.innerText = "DNI"
    let inputDni = document.createElement("input");
    inputDni.setAttribute("type","text");
    inputDni.setAttribute("placeholder", "DNI");
    inputDni.setAttribute("name", "dni");
    inputDni.addEventListener("blur", verificacion);

    //FECHA DE CREACION
    let divCrearcionEquipo = document.createElement("div");
    divCrearcionEquipo.classList.add("label-info");
    let labelCrearcionEquipo = document.createElement("p");
    labelCrearcionEquipo.innerText = "Fecha de Creación"
    let inputCreacionEquipo = document.createElement("input");
    inputCreacionEquipo.setAttribute("type","text");
    inputCreacionEquipo.setAttribute("placeholder", "Fecha de creación");
    inputCreacionEquipo.setAttribute("name", "creacionEquipo");
    inputCreacionEquipo.addEventListener("blur", verificacion);

    //Dirrecion
    let divDireccion = document.createElement("div");
    divDireccion.classList.add("label-info");
    let labelDireccion = document.createElement("p");
    labelDireccion.innerText = "Dirección"
    let inputDireccion = document.createElement("input");
    inputDireccion.setAttribute("type","text");
    inputDireccion.setAttribute("placeholder", "Direccion");
    inputDireccion.setAttribute("name", "direccion");
    inputDireccion.addEventListener("blur", verificacion);

    //Email
    let divMail = document.createElement("div");
    divMail.classList.add("label-info");
    let labelMail = document.createElement("p");
    labelMail.innerText = "Email";
    let inputMail = document.createElement("input");
    inputMail.setAttribute("type","text");
    inputMail.setAttribute("placeholder", "Email");
    inputMail.setAttribute("name", "email");
    inputMail.addEventListener("blur", verificacion);

    //Si es un equipo
    if(e.target.value == 'equipo'){
        form.innerHTML="";
        divBoton.innerHTML="";

        divNickname.appendChild(labelNickname);
        divNickname.appendChild(inputNickname);
        form.appendChild(divNickname);

        divPassword.appendChild(labelPassword);
        divPassword.appendChild(inputPassword);
        form.appendChild(divPassword);

        divRePassword.appendChild(labelRePassword);
        divRePassword.appendChild(inputRePassword);
        form.appendChild(divRePassword);
        
        divEquipo.appendChild(labelEquipo);
        divEquipo.appendChild(inputEquipo);
        form.appendChild(divEquipo);

        divCrearcionEquipo.appendChild(labelCrearcionEquipo);
        divCrearcionEquipo.appendChild(inputCreacionEquipo);
        form.appendChild(divCrearcionEquipo);

        divDireccion.appendChild(labelDireccion);
        divDireccion.appendChild(inputDireccion);
        form.appendChild(divDireccion);

        divMail.appendChild(labelMail);
        divMail.appendChild(inputMail);
        form.appendChild(divMail);
    }

    //si es un jugador
    if(e.target.value == 'jugador'){
        form.innerHTML="";
        divBoton.innerHTML="";

        divNickname.appendChild(labelNickname);
        divNickname.appendChild(inputNickname);
        form.appendChild(divNickname);

        divPassword.appendChild(labelPassword);
        divPassword.appendChild(inputPassword);
        form.appendChild(divPassword);

        divRePassword.appendChild(labelRePassword);
        divRePassword.appendChild(inputRePassword);
        form.appendChild(divRePassword);
        
        divNombre.appendChild(labelNombre);
        divNombre.appendChild(inputNombre);
        form.appendChild(divNombre);

        divApellidos.appendChild(labelApellidos);
        divApellidos.appendChild(inputApellidos);
        form.appendChild(divApellidos);

        divNacimiento.appendChild(labelNacimiento);
        divNacimiento.appendChild(inputNacimiento);
        form.appendChild(divNacimiento);

        divDni.appendChild(labelDni);
        divDni.appendChild(inputDni);
        form.appendChild(divDni);

        divDireccion.appendChild(labelDireccion);
        divDireccion.appendChild(inputDireccion);
        form.appendChild(divDireccion);

        divMail.appendChild(labelMail);
        divMail.appendChild(inputMail);
        form.appendChild(divMail);
    }

    divBoton.appendChild(boton);
    boton.addEventListener("click", () =>{crearUsuario(e.target.value)});
}

//aparece y desaparece el creador de usuarios 
function cambioDiv(divVisible, divInvisible){
  
   divVisible.classList.add("visible");
   divVisible.classList.remove("invisible");

   divInvisible.classList.add("invisible");
   divInvisible.classList.remove("visible");
   
   document.querySelector(".btnAtras").addEventListener("click",() =>{
        let divForm = document.getElementById("divNewUser");
        divForm.childNodes[5].innerHTML="";
        divForm.childNodes[5].classList.add("invisible");
        divForm.childNodes[7].innerHTML="";
        console.log(divForm);
        cambioDiv(divInvisible,divVisible);
   });
   
}

//enviar datos al servidor
async function enviarAlServidorPost(data, url){

     //con esta ruta llamo al servidor por fin, lloro muy fuerte
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

//Parte del login
async function login(usuario, contraseña){

    let data = { nickname: usuario, password: contraseña};
    let url = 'api/usuarios/logIn';

    let respuesta = await enviarAlServidorPost(data, url);
    console.log("comprobando respuesta", respuesta);

    if(respuesta.succes){
        
        //Guardamos el usuario en el local storage
        localStorage.setItem('user', respuesta.user.id);
        localStorage.setItem('tipo', respuesta.user.tipo);

        window.location.href = 'api/usuarios/profile/' + respuesta.user.tipo;

    }else{

        //TODO
        let stringInput ="login";
        mensajeError(respuesta.message, stringInput, respuesta.input);
        
    }
       
}

function init() {

    let inputusuario = document.querySelector('input[name="usuario"]');
    let inputcontraseña = document.querySelector('input[name="password"]');

    document.querySelector('input[name="login"]').addEventListener("click", ()=>{
        login(inputusuario.value, inputcontraseña.value);
    });

    document.querySelector("body").onkeydown = function(e){
       if( e.keyCode == 13){
           login(inputusuario.value, inputcontraseña.value);
       }
    }

    let divLog = document.getElementById("login");  
    let divPrincipal = document.getElementById("divNewUser");
    
    document.getElementById("newUser").addEventListener("click", async() => {
        
        await cambioDiv(divPrincipal, divLog);
        document.querySelector('input[value="equipo"]').addEventListener("change", createFormNewUser);
        document.querySelector('input[value="jugador"]').addEventListener("change", createFormNewUser);
         
    });
    
}

let pass;
let repass;

window.onload = init;