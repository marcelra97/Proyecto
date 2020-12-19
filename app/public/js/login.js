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
    
            let dataEquipo = {nick:nombreUsuario, pws:password, equipo:nombreEquipo, drc:direccion, email:mail, tipo:tipoUsuario}
           
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

    //Password
    let divPassword = document.createElement("div");
    divPassword.classList.add("label-info");
    let labelPassword = document.createElement("p");
    labelPassword.innerText="Contraseña";
    let inputPassword = document.createElement("input");
    inputPassword.setAttribute("type","text");
    inputPassword.setAttribute("placeholder", "Contraseña");
    inputPassword.setAttribute("name", "contraseña");

    //Repetir Password
    let divRePassword = document.createElement("div");
    divRePassword.classList.add("label-info");
    let labelRePassword = document.createElement("p");
    labelRePassword.innerText="Repetir Contraseña";
    let inputRePassword = document.createElement("input");
    inputRePassword.setAttribute("type","text");
    inputRePassword.setAttribute("placeholder", "Repitir Contraseña");
    inputRePassword.setAttribute("name", "passwordRepetida");
    
    //Equipo
    let divEquipo = document.createElement("div");
    divEquipo.classList.add("label-info");
    let labelEquipo = document.createElement("p");
    labelEquipo.innerText = "Nombre del Equipo" 
    let inputEquipo = document.createElement("input");
    inputEquipo.setAttribute("type","text");
    inputEquipo.setAttribute("placeholder", "Nombre Equipo");
    inputEquipo.setAttribute("name", "equipo");

    //Nombre
    let divNombre = document.createElement("div");
    divNombre.classList.add("label-info");
    let labelNombre = document.createElement("p");
    labelNombre.innerText = "Nombre";
    let inputNombre = document.createElement("input");
    inputNombre.setAttribute("type","text");
    inputNombre.setAttribute("placeholder", "Nombre");
    inputNombre.setAttribute("name", "nombre");

    //Apellidos
    let divApellidos = document.createElement("div");
    divApellidos.classList.add("label-info");
    let labelApellidos = document.createElement("p");
    labelApellidos.innerText = "Apellidos";
    let inputApellidos = document.createElement("input");
    inputApellidos.setAttribute("type","text");
    inputApellidos.setAttribute("placeholder", "Apellidos");
    inputApellidos.setAttribute("name", "apellidos");

    //Nacimiento
    let divNacimiento = document.createElement("div");
    divNacimiento.classList.add("label-info");
    let labelNacimiento = document.createElement("p");
    labelNacimiento.innerText = "Fecha de Nacimiento";
    let inputNacimiento = document.createElement("input");
    inputNacimiento.setAttribute("type","text");
    inputNacimiento.setAttribute("placeholder", "Fecha de Nacimiento");
    inputNacimiento.setAttribute("name", "nacimiento");

    //DNI
    let divDni = document.createElement("div");
    divDni.classList.add("label-info");
    let labelDni = document.createElement("p");
    labelDni.innerText = "DNI"
    let inputDni = document.createElement("input");
    inputDni.setAttribute("type","text");
    inputDni.setAttribute("placeholder", "DNI");
    inputDni.setAttribute("name", "dni");

    //Dirrecion
    let divDireccion = document.createElement("div");
    divDireccion.classList.add("label-info");
    let labelDireccion = document.createElement("p");
    labelDireccion.innerText = "Dirección"
    let inputDireccion = document.createElement("input");
    inputDireccion.setAttribute("type","text");
    inputDireccion.setAttribute("placeholder", "Direccion");
    inputDireccion.setAttribute("name", "direccion");

    //Email
    let divMail = document.createElement("div");
    divMail.classList.add("label-info");
    let labelMail = document.createElement("p");
    labelMail.innerText = "Email";
    let inputMail = document.createElement("input");
    inputMail.setAttribute("type","text");
    inputMail.setAttribute("placeholder", "Email");
    inputMail.setAttribute("name", "email");

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
        cambioDiv(divInvisible,divVisible);
   });
   
}

//TODO
function mensajeError(msg, input) {
    
    
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
        
        window.location.href = 'api/usuarios/profile/' + respuesta.user.tipo;

    }else{

        //TODO
        mensajeError(respuesta.message);
        
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



window.onload = init;