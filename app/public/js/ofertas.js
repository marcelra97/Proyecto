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

    const price = document.querySelector('#price');
    const output = document.querySelector('.price-output');

    output.textContent = price.value + "€";

    price.addEventListener('input', function() {
        output.textContent = price.value + "€";
    });


    const year = document.querySelector('#year');
    const outputYear = document.querySelector('.year-output');

    outputYear.textContent = year.value

    year.addEventListener('input', function() {
        outputYear.textContent = year.value;
    });

}

window.onload = init;