function redireccionMenu(){

    let localStorageTipo = localStorage.getItem('tipo');

    if(this.attributes[0].value == "perfil"){
        
        window.location.href = this.attributes.value.nodeValue + localStorageTipo;

    }else{

        window.location.href = this.attributes.value.nodeValue;
    }
    
}

function init() {

     //Botones del Menu
     document.querySelectorAll(".botonMenu").forEach(boton =>{

        boton.addEventListener('click', redireccionMenu);

    })

}

window.onload = init;