function mostrarEquipoInfo(informacion) {
    
    const nickname = document.getElementById('nick');
    const equipo = document.getElementById('equipo');
    const creacionEquipo = document.getElementById('creacion'); 
    const direccion = document.getElementById('direccion');
    const email = document.getElementById('email');

    nickname.innerText = informacion.nickname;
    equipo.value = informacion.equipo;
    creacionEquipo.value = informacion.creacion_equipo;
    direccion.value = informacion.direccion;
    email.value = informacion.email;
}

function mostrarJugadorInfo(informacion){
    
    const nickname = document.getElementById('nick');
    const nombre = document.getElementById('nombre');
    const apellido = document.getElementById('apellido');
    const nacimiento = document.getElementById('nacimiento'); 
    const dni = document.getElementById('dni');
    const direccion = document.getElementById('direccion');
    const email = document.getElementById('email');

    nickname.innerText = informacion.nickname;
    nombre.value = informacion.nombre;
    apellido.value = informacion.apellidos;
    nacimiento.value = informacion.fecha_nacimiento;
    dni.value = informacion.dni;
    direccion.value = informacion.direccion;
    email.value = informacion.email;

}


async function loadUserInfo(localStorage) {


    const url = "findUserById/" + localStorage;
    
    let res = await fetch(url);
    let res2 = await res.json();
    return res2;

}

function redireccionMenu(){

    let localStorageTipo = localStorage.getItem('tipo');
   
    if(this.attributes[0].value == "perfil"){
        
        window.location.href = this.attributes.value.nodeValue + localStorageTipo;

    }else{

        window.location.href = this.attributes.value.nodeValue;
    }
    
}

async function init(){

    //Sacamos el id del usuario que ha iniciado sesion
    let localStorageInfo = localStorage.getItem('user');

    //obtenemos la informacion del usuario
    usuario = await loadUserInfo(localStorageInfo);

    let localStorageTipo = localStorage.getItem('tipo');

    if(localStorageTipo == "jugador"){
        mostrarJugadorInfo(usuario);
    }
    if(localStorageTipo == "equipo"){
        mostrarEquipoInfo(usuario);
    }
    
    //Botones del Menu
    document.querySelectorAll(".botonMenu").forEach(boton =>{

        boton.addEventListener('click', redireccionMenu);

    })

}

let usuario;

window.onload = init;