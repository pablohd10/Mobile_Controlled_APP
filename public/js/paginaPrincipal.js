$(".reproductor").hide();

login = localStorage.getItem("loginAcc");
localStorage.setItem("usuarioMostrado", login);
x = JSON.parse(localStorage.getItem(login + " listaTodosMg"))
if (x == null) {
    localStorage.setItem(login + " listaTodosMg", JSON.stringify([]));
}

let rep = 0;


/* HOVER DE LAS PORTADAS DE LOS VIDEOS  */
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



// Función que se encarga de obtener la información de la película que se quiere reproducir
function obtener_pelicula(id) {
    for (var i = 0; i < archivo.length; i++) {
        if (archivo[i].id == id) {
            document.getElementById("reproductor_video").src = archivo[i].src;
            document.getElementById("reproductor_video").poster = archivo[i].portada;
            document.getElementById("reproductor_video").load();
            document.getElementById("reproductor_video").play();

        } else {
            null
        }
    }
};
// Función que recibe la orden de cambiar de película. Compueba que si la cola tiene contenido y en ese caso repoducirá lo que  hay en la cola.
socket.on('cambioPelicula', (id) => {
    if (rep == 1) {
        if (cola.length > 0) {
            console.log("arriba");
            let sig = cola[0][0];
            console.log(sig);
            obtener_pelicula(sig);
            socket.emit('a_server_borrar_cola');
            console.log(cola);
        } else {
            console.log("abajo");
            obtener_pelicula(id);
        }
    } else {
        null
    }

});


// Función que se encarga de subir el volumen dentro del reproductor de video
function subirVolumen() {
    const pelicula = document.getElementById("reproductor_video");
    if (pelicula.volume == 1 || pelicula.volume > 0.9) {
        pelicula.volume = 1; // Subir volumen un 10%
    } else {
        pelicula.volume += 0.1; // Subir volumen un 10%
    }
}
// Recibimos la orden de subir el volumen del mando
socket.on('subiendoVol', () => {
    subirVolumen();
});

// Función que se encarga de bajar el volumen dentro del reproductor de video
function bajarVolumen() {
    const pelicula = document.getElementById("reproductor_video");
    if (pelicula.volume == 0 || pelicula.volume < 0.1) {
        pelicula.volume = 0; // Subir volumen un 10%
    } else {
        pelicula.volume -= 0.1; // Subir volumen un 10%
    }
}
// Recibimos la orden de bajar el volumen del mando
socket.on('bajandoVol', () => {
    bajarVolumen();
});


// Función que ejecutará el cambio de Play a Pause y viceversa dento del reproductor
function alternarPlayPause() {
    const pelicula = document.getElementById("reproductor_video");
    if (pelicula.paused) {
        pelicula.play();
    } else {
        pelicula.pause();
    }
}
// Recibimos la orden de play o pause del mando
socket.on('a_reproductor_play_pause', () => {
    if (rep == 1) {
        alternarPlayPause();
    } else {
        null
    }

});


// Recibimos la posicion/desplazamiento del mando para tansmitirlo a la pantalla principal
socket.on('a_reproductor_envio_posicion', (posicion) => {
    let posX = window.innerWidth / 2; // Inicializar en el centro de la pantalla
    let posY = window.innerHeight / 2; // Inicializar en el centro de la pantalla

    const puntero = document.getElementById("puntero");

    posX = posicion[0]; // Posicion X que se recibe del mando
    posY = posicion[1]; // Posicion Y que se recibe del mando

    puntero.style.left = posX + "px";
    puntero.style.top = posY + "px";
    // Limitar la posición del puntero para que no se salga de la pantalla
    posX = Math.max(0, Math.min(window.innerWidth, posX));
    posY = Math.max(0, Math.min(window.innerHeight, posY));

    puntero.style.left = posX + "px";
    puntero.style.top = posY + "px";

});


// Función que capta el click que se hace con el puntero del mando
function clickPuntero() {
    const puntero = document.getElementById("puntero");
    const posX = puntero.offsetLeft;
    const posY = puntero.offsetTop;
    const elementoBajoPuntero = document.elementFromPoint(posX, posY);
    if (elementoBajoPuntero) {
        elementoBajoPuntero.click();
    }
}
// Recibimos la orden del click con el puntero
socket.on('a_reproductor_click', () => {
    console.log("click con puntero");
    clickPuntero();
});

// Código para cerrar la ventana modal del aviso del control parental activo
$("#denegar, .overlay").on("click", function () {
    $(".overlay, .modal").removeClass("active");
});

// Función para reproducir el video seleccionado. Comprueba el control parental.
function reproducirVideo(id) {
    for (var i = 0; i < archivo.length; i++) {
        if (archivo[i].id == id) {
            if (control_parental === 1 && archivo[i].parental === 1) {
                // Opcion control parental activado y se intenta acceder a contenido permitido
                document.getElementById("reproductor_video").poster = archivo[i].portada;
                document.getElementById("reproductor_video").src = archivo[i].src;
                document.getElementById("reproductor_video").load();
                document.getElementById("reproductor_video").play();
                $(".cuerpo").hide();
                $("header").hide();
                $(".reproductor").show();
                rep = 1;
            } else if (control_parental === 1 && archivo[i].parental === 0) {
                // Opcion control parental activado y se intenta acceder a contenido restringido
                $(".overlay, .modal").addClass("active");
            } else {
                // Opcion control parental desactivado, por lo que permite acceder a todo el contenido
                document.getElementById("reproductor_video").poster = archivo[i].portada;
                document.getElementById("reproductor_video").src = archivo[i].src;
                document.getElementById("reproductor_video").load();
                document.getElementById("reproductor_video").play();
                $(".cuerpo").hide();
                $("header").hide();
                $(".reproductor").show();
                rep = 1;
            }
        } else {
            null
        }
    }
};

// Función para salir del video que estas reproduciendo
function salirReproVideo() {
    $(".cuerpo").show();
    $("header").show();
    $(".reproductor").hide();
    rep = 0;

    document.getElementById("reproductor_video").poster = "";
    document.getElementById("reproductor_video").src = "";
};
// recibimos la Función de salir del reproductor
socket.on('a_reproductor_salir', () => {
    salirReproVideo();
});


// Función que recibe la orden de reproducir un video desde el buscador
socket.on('a_reproductor_reproducir_bus', (id) => {
    reproducirVideo(id);
});


// Señal para desplazar hacia abajo la pantalla principal
socket.on('a_reproductor_bajar_pantalla', () => {
    window.scrollBy({
        top: 100,
        behavior: 'smooth'
    });
});

// Señal para desplazar hacia arriba la pantalla principal
socket.on('a_reproductor_subir_pantalla', () => {
    window.scrollBy({
        top: -100,
        behavior: 'smooth'
    });
});

var listaMg = JSON.parse(localStorage.getItem(login+" listaTodosMg"));
if (listaMg != null){
    for (ii=0; ii<20; ii++){
        var checking = document.getElementById("c"+ii);
        if(listaMg[ii]){
            checking.checked = true;
        }else if(listaMg[ii] == false){
            checking.checked = false;
        }
    }
}
listas("a")
function listas(id){
    var listaMg = JSON.parse(localStorage.getItem(login+" listaTodosMg"));
    var checkbo = document.getElementById(id);
    if(checkbo!=null){
        checkbo.checked = !checkbo.checked;
        console.log(checkbo.checked)
    }
    if (listaMg == null){
        listaMg = [];
    }
    for (ii=0; ii<20; ii++){
        var check = document.getElementById("c"+ii);
        var img = document.getElementById("c"+ii+"Img");
        if (check.checked){
            console.log("cambia a normal")
            listaMg[ii]=true;
            img.src = "media/like.png"
        }else { 
            console.log("cambiaaaa a tachado")
            img.src = "media/noLike.png"
            listaMg[ii]=false
        }
    }
    localStorage.setItem(login+" listaTodosMg", JSON.stringify(listaMg));
}


// Codigo para e lcodigo QR
// Cerrar
$("#denegar, .overlay2").on("click", function () {
    $(".overlay2, .modal2").removeClass("active");
});
// Desplegar
$(".boton_qr").on("click", function () {
    $(".overlay2, .modal2").addClass("active");
});

// I need that to execute a function when clicked

$(".hola").click