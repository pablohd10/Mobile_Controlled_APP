/* Variable que contiene toda la informacion sobre los videos disponibles */
let archivo = [
    {
        "nombre": "Titanic",
        "id": 1,
        "src": "media/videos/titanic.mp4",
        "portada": "media/portadas/titanic.png",
        "parental": 1
    },
    {
        "nombre": "Fast and Furious 10",
        "id": 2,
        "src": "media/videos/fasst.mp4",
        "portada": "media/portadas/fasst.png",
        "parental": 1
    },
    {
        "nombre": "Avatar 2",
        "id": 3,
        "src": "media/videos/avatar.mp4",
        "portada": "media/portadas/avatar.png",
        "parental": 1
    },
    {
        "nombre": "Mario Bros",
        "id": 4,
        "src": "media/videos/mario.mp4",
        "portada": "media/portadas/mario.png",
        "parental": 1
    },
    {
        "nombre": "The Marvels",
        "id": 5,
        "src": "media/videos/the_marvels.mp4",
        "portada": "media/portadas/the_marvels.png",
        "parental": 1
    },
    {
        "nombre": "Receta Alubias",
        "id": 6,
        "src": "media/videos/alubias.mp4",
        "portada": "media/portadas/alubias.PNG",
        "parental": 1
    },
    {
        "nombre": "Receta Arroz con Leche",
        "id": 7,
        "src": "media/videos/arroz_con_leche.mp4",
        "portada": "media/portadas/arroz_leche.png",
        "parental": 1
    },
    {
        "nombre": "Receta Bocadillo",
        "id": 8,
        "src": "media/videos/bocata_gines.mp4",
        "portada": "media/portadas/bocata_gines.PNG",
        "parental": 1
    },
    {
        "nombre": "Receta Pollo al Curry",
        "id": 9,
        "src": "media/videos/pollo_curry.mp4",
        "portada": "media/portadas/pollo_curry.PNG",
        "parental": 1
    },
    {
        "nombre": "Receta Spaguettis con salsa",
        "id": 10,
        "src": "media/videos/spaguettis_salsa.mp4",
        "portada": "media/portadas/spaguettis.PNG",
        "parental": 1
    },
    {
        "nombre": "Abdominales",
        "id": 11,
        "src": "media/videos/abdominales.mp4",
        "portada": "media/portadas/abdominales.PNG",
        "parental": 1
    },
    {
        "nombre": "Biceps",
        "id": 12,
        "src": "media/videos/biceps.mp4",
        "portada": "media/portadas/biceps.PNG",
        "parental": 1
    },
    {
        "nombre": "Cardio",
        "id": 13,
        "src": "media/videos/cardio.mp4",
        "portada": "media/portadas/cardio.PNG",
        "parental": 1
    },
    {
        "nombre": "Front Lever",
        "id": 14,
        "src": "media/videos/front_lever.mp4",
        "portada": "media/portadas/front_lever.PNG",
        "parental": 1
    },
    {
        "nombre": "Pilates",
        "id": 15,
        "src": "media/videos/pilates.mp4",
        "portada": "media/portadas/pilates.PNG",
        "parental": 1
    },
    {
        "nombre": "Noticias 27 de Julio",
        "id": 16,
        "src": "media/videos/27_Julio.mp4",
        "portada": "media/portadas/27_Julio.PNG",
        "parental": 0
    },
    {
        "nombre": "Noticias Cementerio Clandestino",
        "id": 17,
        "src": "media/videos/cementerio_clandestino.mp4",
        "portada": "media/portadas/cementerio_clandestino.PNG",
        "parental": 0
    },
    {
        "nombre": "Noticias Edificio Abandonado",
        "id": 18,
        "src": "media/videos/edificio_abandonado.mp4",
        "portada": "media/portadas/edificio_abandonado.PNG",
        "parental": 0
    },
    {
        "nombre": "Noticias Indendio",
        "id": 19,
        "src": "media/videos/incendio.mp4",
        "portada": "media/portadas/incendio.PNG",
        "parental": 0
    },
    {
        "nombre": "Noticias Putin",
        "id": 20,
        "src": "media/videos/putin.mp4",
        "portada": "media/portadas/putin.PNG",
        "parental": 0
    }

]

/* Constante socket.io para poder usarla en todo el resto de páginas */
const socket = io();

/* Cola de videos que podrá ser accedida desde el mando y desde el reproductor */
let cola = [];

/* Funcion que añade el video a la variable cola para que se3 pueda usar en las distintas páginas */
function añadirACola(id) {
    algoEnCola = 1;

    for (var i = 0; i < archivo.length; i++) {
        if (archivo[i].id == id) {
            console.log(cola);

            cola.push([archivo[i].id, archivo[i].nombre]);

            console.log(cola);

        } else {
            null
        }
    }
}

// Actualización de la cola cuando se añade algún elemento
socket.on('a_archivo_act_cola', (id) => {
    añadirACola(id);
});

// Actualización de la cola cuando se reproduce el primer elemento por lo tanto se borra de la cola
socket.on('a_archivo_borrar_cola', () => {
    cola.shift();
});

// Código para la administracion del control parental
// Si el control parental está en 0 no está activo, si está en 1 está activo
let control_parental = 0;

// Actualización del valor del control parental
socket.on('a_archivo_cambio_parental', (valor) => {
    control_parental = valor;
});
