function desplegarMenu() {
    let body;
    
    let array = document.querySelectorAll(".listas");

    array.forEach(lista =>{

        if(lista.classList.contains("active") && lista != this){
            
            lista.classList.remove("active");
            lista.lastElementChild.classList.add("invisible");
            lista.lastElementChild.classList.remove("miniLista");
            
        }

    })

    this.classList.toggle("active");
    this.lastElementChild.classList.toggle("invisible");
    this.lastElementChild.classList.toggle("miniLista");

    if(this.classList.contains("active")){

        body = document.querySelector("#contenidoPagina");
        body.style.height ="140vh";

    }

    if(!this.classList.contains("active")){
        body = document.querySelector("#contenidoPagina");
        body.style.height ="120vh";
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

function init(){

    //Botones del Menu
    document.querySelectorAll(".botonMenu").forEach(boton =>{

        boton.addEventListener('click', redireccionMenu);

    })

    document.querySelectorAll(".listas").forEach(lista =>{

        lista.addEventListener('click', desplegarMenu);
    })
}

window.onload = init;