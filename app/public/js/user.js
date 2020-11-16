function mostrarUsuarioInfo(informacion){
    
   const nombre = document.getElementById('nombre');
   const apellido = document.getElementById('apellido');
   const nacimiento = document.getElementById('nacimiento'); 
   const dni = document.getElementById('dni');
   const direccion = document.getElementById('direccion');
   const email = document.getElementById('email');

    nombre.value = informacion.nombre;
    apellido.value = informacion.apellidos;
    nacimiento.value = informacion.fecha_nacimiento;
    dni.value = informacion.dni;
    direccion.value = informacion.direccion;
    email.value = informacion.email;

}


async function loadUserInfo(localStorage) {


    const url = "findUserById/" + localStorage;
    
    let data = {id: localStorage}

    let body = {
             method: 'POST',
             body: JSON.stringify(data),
             headers: {
                 'Content-Type': 'application/json'
             }
    };

    let res = await fetch(url, body);
    let res2 = await res.json();
    return res2;

}


async function init(){

    //Sacamos el id del usuario que ha iniciado sesion
    let localStorageInfo = localStorage.getItem('user');
    
    //obtenemos la informacion del usuario
    usuario = await loadUserInfo(localStorageInfo);

console.log(usuario);
    mostrarUsuarioInfo(usuario);
    

}

let usuario;

window.onload = init;