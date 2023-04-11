const socket = io();

// Obtenemos el elemento (en este caso, una imagen)
const elements = document.querySelectorAll(".videos img");

for (let i = 0; i < elements.length; i++) {
    const el = elements[i];
    // Obtenemos el ancho y alto del elemento
    const height = el.clientHeight;
    const width = el.clientWidth;

    // Añadimos un listener para el evento "mousemove"
    el.addEventListener("mousemove", (evt) => {
        // Obtenemos la posición del ratón en el elemento
        const { layerX, layerY } = evt;
        // Calculamos la rotación en el eje Y
        const yRotation = ((layerX - width / 2) / width) * 20;
        // Calculamos la rotación en el eje X
        const xRotation = ((layerY - height / 2) / height) * 20;
        // Aplicamos la transformación
        const string = `
            perspective(500px) 
            scale(1.1)
            rotateX(${xRotation}deg) 
            rotateY(${yRotation}deg)`
        el.style.transform = string;
    })

    el.addEventListener("mouseout", (evt) => {
        el.style.transform = `perspective(500px) 
                            scale(1) 
                            rotateX(0) 
                            rotateY(0)`;
    })

}



socket.on('cambioPelicula', (id) => {
    console.log("comprobacion main.js");
    console.log(id);
    obtener_pelicula(id);
});


function obtener_pelicula(id) {
    for (var i = 0; i < archivo.length; i++) {
        if (archivo[i].id == id) {
            console.log("obteniendo pelicula")
            document.getElementById("reproductor_video").src = archivo[i].src;
            document.getElementById("reproductor_video").poster = archivo[i].portada;
            document.getElementById("reproductor_video").load();
            document.getElementById("reproductor_video").play();

        } else {
            null
        }
    }
};

function subirVolumen() {
    const pelicula = document.getElementById("reproductor_video");
    if (pelicula.volume == 1 || pelicula.volume > 0.9) {
        pelicula.volume = 1; // Subir volumen un 10%
    } else {
        pelicula.volume += 0.1; // Subir volumen un 10%
    }
}

socket.on('subiendoVol', () => {
    console.log("subiendo volumen");
    subirVolumen();
});

function bajarVolumen() {
    const pelicula = document.getElementById("reproductor_video");
    if (pelicula.volume == 0 || pelicula.volume < 0.1) {
        pelicula.volume = 0; // Subir volumen un 10%
    } else {
        pelicula.volume -= 0.1; // Subir volumen un 10%
    }
}

socket.on('bajandoVol', () => {
    console.log("bajando volumen");
    bajarVolumen();
});