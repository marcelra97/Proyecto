function mostrarJugadorConf(informacion) {
    
    let divPrincipal = document.getElementById("divConfiguracion");
    
    let divNombre = document.createElement("div");
    divNombre.classList.add("label-info");
    let labelNombre = document.createElement("p");
    labelNombre.innerText = "Nombre";
    let inputNombre = document.createElement("input");
    inputNombre.setAttribute("type","text");
    inputNombre.setAttribute("value", informacion.nombre);
    inputNombre.setAttribute("placeholder", "Nombre del Usuario")
    inputNombre.setAttribute("name", "nombre");
    let buttonNombre = document.createElement("button");
    buttonNombre.setAttribute("value","updateNombreJugador");
    buttonNombre.classList.add("btnEdit");
    let imgNombre = document.createElement("i");
    imgNombre.classList.add("fas", "fa-edit");

    let divApellidos = document.createElement("div");
    divApellidos.classList.add("label-info");
    let labelApellidos = document.createElement("p");
    labelApellidos.innerText = "Apellidos";
    let inputApellidos = document.createElement("input");
    inputApellidos.setAttribute("type","text");
    inputApellidos.setAttribute("value", informacion.apellidos);
    inputApellidos.setAttribute("placeholder", "Apellidos del Usuario")
    inputApellidos.setAttribute("name", "apellidos");
    let buttonApellidos = document.createElement("button");
    buttonApellidos.setAttribute("value","updateApellidos");
    buttonApellidos.classList.add("btnEdit");
    let imgApellidos = document.createElement("i");
    imgApellidos.classList.add("fas", "fa-edit");

    let divNacimiento = document.createElement("div");
    divNacimiento.classList.add("label-info");
    let labelNacimiento = document.createElement("p");
    labelNacimiento.innerText = "Fecha de Nacimiento";
    let inputNacimiento = document.createElement("input");
    inputNacimiento.setAttribute("type","text");
    inputNacimiento.setAttribute("value", informacion.fecha_nacimiento);
    inputNacimiento.setAttribute("placeholder", "Fecha de Nacimiento");
    inputNacimiento.setAttribute("name", "nacimiento");
    let buttonNacimiento = document.createElement("button");
    buttonNacimiento.setAttribute("value","updateFechaNacimiento");
    buttonNacimiento.classList.add("btnEdit");
    let imgNacimiento = document.createElement("i");
    imgNacimiento.classList.add("fas", "fa-edit");

    let divDni = document.createElement("div");
    divDni.classList.add("label-info");
    let labelDni = document.createElement("p");
    labelDni.innerText = "DNI"
    let inputDni = document.createElement("input");
    inputDni.setAttribute("type","text");
    inputDni.setAttribute("value", informacion.dni);
    inputDni.setAttribute("placeholder", "DNI");
    inputDni.setAttribute("name", "dni");
    let buttonDni = document.createElement("button");
    buttonDni.setAttribute("value","updateDNI");
    buttonDni.classList.add("btnEdit");
    let imgDni = document.createElement("i");
    imgDni.classList.add("fas", "fa-edit");

    let divDireccion = document.createElement("div");
    divDireccion.classList.add("label-info");
    let labelDireccion = document.createElement("p");
    labelDireccion.innerText = "Dirección"
    let inputDireccion = document.createElement("input");
    inputDireccion.setAttribute("type","text");
    inputDireccion.setAttribute("value", informacion.direccion);
    inputDireccion.setAttribute("name", "direccion");
    inputDireccion.setAttribute("placeholder", "Direccion");
    let buttonDireccion = document.createElement("button");
    buttonDireccion.setAttribute("value","updateDireccionJugador");
    buttonDireccion.classList.add("btnEdit");
    let imgDireccion = document.createElement("i");
    imgDireccion.classList.add("fas", "fa-edit");

    let divMail = document.createElement("div");
    divMail.classList.add("label-info");
    let labelMail = document.createElement("p");
    labelMail.innerText = "Email";
    let inputMail = document.createElement("input");
    inputMail.setAttribute("type","text");
    inputMail.setAttribute("value", informacion.email);
    inputMail.setAttribute("placeholder", "Email");
    inputMail.setAttribute("name", "email");
    let buttonMail = document.createElement("button");
    buttonMail.setAttribute("value","updateEmailJugador");
    buttonMail.classList.add("btnEdit");
    let imgMail = document.createElement("i");
    imgMail.classList.add("fas", "fa-edit");

    divNombre.appendChild(labelNombre);
    divNombre.appendChild(inputNombre);
    buttonNombre.appendChild(imgNombre);
    divNombre.appendChild(buttonNombre);
    divPrincipal.appendChild(divNombre);

    divApellidos.appendChild(labelApellidos);
    divApellidos.appendChild(inputApellidos);
    buttonApellidos.appendChild(imgApellidos);
    divApellidos.appendChild(buttonApellidos)
    divPrincipal.appendChild(divApellidos);

    divNacimiento.appendChild(labelNacimiento);
    divNacimiento.appendChild(inputNacimiento);
    buttonNacimiento.appendChild(imgNacimiento);
    divNacimiento.appendChild(buttonNacimiento);
    divPrincipal.appendChild(divNacimiento);

    divDni.appendChild(labelDni);
    divDni.appendChild(inputDni);
    buttonDni.appendChild(imgDni);
    divDni.appendChild(buttonDni);
    divPrincipal.appendChild(divDni);

    divDireccion.appendChild(labelDireccion);
    divDireccion.appendChild(inputDireccion);
    buttonDireccion.appendChild(imgDireccion);
    divDireccion.appendChild(buttonDireccion);
    divPrincipal.appendChild(divDireccion);

    divMail.appendChild(labelMail);
    divMail.appendChild(inputMail);
    buttonMail.appendChild(imgMail);
    divMail.appendChild(buttonMail);
    divPrincipal.appendChild(divMail);

    //inputNombre.addEventListener("blur", verificacion);

}

function mostrarEquipoConf(informacion) {
    let divPrincipal = document.getElementById("divConfiguracion");

    let divEquipo = document.createElement("div");
    divEquipo.classList.add("label-info");
    let labelEquipo = document.createElement("p");
    labelEquipo.innerText = "Nombre del Equipo" 
    let inputEquipo = document.createElement("input");
    inputEquipo.setAttribute("type","text");
    inputEquipo.setAttribute("value", informacion.equipo);
    inputEquipo.setAttribute("placeholder", "Nombre Del Equipo");
    inputEquipo.setAttribute("name", "equipo"); 
    let buttonEquipo = document.createElement("button");
    buttonEquipo.setAttribute("value","updateNombreEquipo");
    buttonEquipo.classList.add("btnEdit");
    let imgEquipo = document.createElement("i");
    imgEquipo.classList.add("fas", "fa-edit");

    let divCrearcionEquipo = document.createElement("div");
    divCrearcionEquipo.classList.add("label-info");
    let labelCrearcionEquipo = document.createElement("p");
    labelCrearcionEquipo.innerText = "Fecha de Creación"
    let inputCreacionEquipo = document.createElement("input");
    inputCreacionEquipo.setAttribute("type","text");
    inputCreacionEquipo.setAttribute("value", informacion.creacion_equipo);
    inputCreacionEquipo.setAttribute("placeholder", "Fecha de creacion del Equipo");
    inputCreacionEquipo.setAttribute("name", "creacionEquipo");
    let buttonCreacionEquipo = document.createElement("button");
    buttonCreacionEquipo.setAttribute("value","updateCreacionEquipo");
    buttonCreacionEquipo.classList.add("btnEdit");
    let imgCreacionEquipo = document.createElement("i");
    imgCreacionEquipo.classList.add("fas", "fa-edit"); 

    let divDireccion = document.createElement("div");
    divDireccion.classList.add("label-info");
    let labelDireccion = document.createElement("p");
    labelDireccion.innerText = "Dirección"
    let inputDireccion = document.createElement("input");
    inputDireccion.setAttribute("type","text");
    inputDireccion.setAttribute("value", informacion.direccion);
    inputDireccion.setAttribute("placeholder", "Direccion");
    inputDireccion.setAttribute("name", "direccion");
    let buttonDireccion = document.createElement("button");
    buttonDireccion.setAttribute("value","updateDireccionEquipo");
    buttonDireccion.classList.add("btnEdit");
    let imgDireccion = document.createElement("i");
    imgDireccion.classList.add("fas", "fa-edit");

    let divMail = document.createElement("div");
    divMail.classList.add("label-info");
    let labelMail = document.createElement("p");
    labelMail.innerText = "Email";
    let inputMail = document.createElement("input");
    inputMail.setAttribute("type","text");
    inputMail.setAttribute("value", informacion.email);
    inputMail.setAttribute("placeholder", "Email");
    inputMail.setAttribute("name", "email");
    let buttonMail = document.createElement("button");
    buttonMail.setAttribute("value","updateEmailEquipo");
    buttonMail.classList.add("btnEdit");
    let imgMail = document.createElement("i");
    imgMail.classList.add("fas", "fa-edit");

    divEquipo.appendChild(labelEquipo);
    divEquipo.appendChild(inputEquipo);
    buttonEquipo.appendChild(imgEquipo);
    divEquipo.appendChild(buttonEquipo);
    divPrincipal.appendChild(divEquipo);

    divCrearcionEquipo.appendChild(labelCrearcionEquipo);
    divCrearcionEquipo.appendChild(inputCreacionEquipo);
    buttonCreacionEquipo.appendChild(imgCreacionEquipo);
    divCrearcionEquipo.appendChild(buttonCreacionEquipo);
    divPrincipal.appendChild(divCrearcionEquipo);

    divDireccion.appendChild(labelDireccion);
    divDireccion.appendChild(inputDireccion);
    buttonDireccion.appendChild(imgDireccion);
    divDireccion.appendChild(buttonDireccion);
    divPrincipal.appendChild(divDireccion);

    divMail.appendChild(labelMail);
    divMail.appendChild(inputMail);
    buttonMail.appendChild(imgMail);
    divMail.appendChild(buttonMail);
    divPrincipal.appendChild(divMail);
    
}

function boxMessage(msg) {

    let divBox = document.getElementById("boxInfo");
    let mensaje;
    divBox.className = "";
    

    if(msg = true){
        mensaje = "Actualizado correctamente";
        divBox.innerHTML = '<span>' + mensaje + '</span>';
        divBox.classList.remove("invisible");
        divBox.classList.add('correcto');
    
    }else{
        mensaje = "No se ha actualizado correctamente";
        divBox.innerHTML = '<span>' + mensaje + '</span>';
        divBox.classList.remove("invisible");
        divBox.classList.add('incorrecto');

    }
    

}

async function actualizarDatos(url, data) {
    
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


async function editarInformacion(){

    let input = this.previousElementSibling;
    let url = this.value;
    let user = localStorage.getItem('user');

    if(input.value == ""){

    }else{
        
        let data ={dato:input.value, id:user}
        let msg = await actualizarDatos(url, data);

        boxMessage(msg);
        
    }
    
}

function redireccionMenu(){

    let localStorageTipo = localStorage.getItem('tipo');
   
    if(this.attributes[0].value == "perfil"){
        
        window.location.href = this.attributes.value.nodeValue + localStorageTipo;

    }else{

        window.location.href = this.attributes.value.nodeValue;
    }
    
}

async function loadUserInfo(localStorage) {


    const url = "findUserById/" + localStorage;
    
    let res = await fetch(url);
    let res2 = await res.json();
    return res2;

}


async function init() {

    let localStorageInfo = localStorage.getItem('user');

    usuario = await loadUserInfo(localStorageInfo);

    let localStorageTipo = localStorage.getItem('tipo');

    if(localStorageTipo == "jugador"){
        mostrarJugadorConf(usuario);

    }
    if(localStorageTipo == "equipo"){
        mostrarEquipoConf(usuario);
    }
    
    //Botones del Menu
    document.querySelectorAll(".botonMenu").forEach(boton =>{

        boton.addEventListener('click', redireccionMenu);

    });

    document.querySelectorAll(".btnEdit").forEach(btnEdit =>{
        
        btnEdit.addEventListener('click', editarInformacion);
    });
    
}

window.onload = init;