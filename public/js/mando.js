const socket = io();

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

$(".seleccion_modo").show();
$(".modo_simple").hide();
$(".modo_complejo").hide();

// Variable global para saber si el control parental esta activo o no
// 0 -> SIN control parental | 1 -> CON control parental
let parental;

// Lista global donde se meteran todas los videos que se añadan a la cola
let cola = [];

// Variable que contiene el elemento de la barra de busqueda
const busqueda = document.querySelector("#input_bus");

// Busqueda
// Lista con todos los posibles nombres
let seleccionados = [];

// cada vez que el valor del elemento input cambia
busqueda.addEventListener("input", () => {
  //vacia el array de los nombres seleccionados
  seleccionados.length = 0;
  //para más eficiencia crea un nuevo fragmento
  let fragment = document.createDocumentFragment();
  //recuoera el valor del input y guardalo en una variable
  let elValor = busqueda.value;
  //si hay un valor
  if (elValor.length > 0) {
    // busca en el json si el nombre incluye (o empieza por) el valor
    archivo.forEach(j => {

      if (j.nombre.includes(elValor)) {
        // si lo incluye agregalo al array de los seleccionados
        seleccionados.push(j);
      }
    });

    //para cada elemento selccionado
    seleccionados.forEach(s => {
      //crea un nuevo elemento p
      let div = document.createElement("div");
      //cuyo innerHTML es el nombre seleccionado
      div.innerHTML = s.nombre;
      //y agregalo al fragmento
      fragment.appendChild(div);

      div.setAttribute("id", s.id)
      div.setAttribute("class", "res_busqueda")
      div.addEventListener('click', () => { console.log("si se esta ejecutando") });
      div.addEventListener('click', () => { añadirACola() });
      div.addEventListener('click', () => { console.log("post") });
    });

    //vacía el resultado 
    resultado.innerHTML = "";
    //agrega el fragmento al resultado
    resultado.appendChild(fragment);
  } else {
    // Si el valor del input está vacío, vacía los resultados
    resultado.innerHTML = "";
  }
});



function añadirACola() {
  const titulo = busqueda.value;
  if (!titulo) {
    return; // Comprobar que la entrada tiene un titulo, si no, la tarea no se añade
  }
  cola.push(titulo);

  for (let i = 0; i < cola.length; i++) {
    const objeto = cola[i];

    const colaElement = document.createElement("li");
    colaElement.classList.add('elem_lista');
    colaElement.textContent = objeto;

    colaVideos.appendChild(objeto);
  }
}

$(".boton_salida").click(
  function () {
    $(".seleccion_modo").show();
    $(".modo_simple").hide();
    $(".modo_complejo").hide();
    let titulo = document.getElementById("h1_titulo");
    titulo.innerHTML = "Bienvenido a VidPro";
  });

// Función para obtener la seleccion del modo
function seleccionModo() {
  let seleccion = this.id;
  let titulo = document.getElementById("h1_titulo");

  switch (seleccion) {
    case "comp_par":
      document.getElementById("boton_bus").style.background = "rgb(255, 186, 186)";
      titulo.innerHTML = "Complejo sin control parental";
      $(".seleccion_modo").hide();
      $(".modo_simple").hide();
      $(".modo_complejo").show();
      parental = 0;
      break;
    case "simp_par":
      titulo.innerHTML = "Simple con control parental";
      $(".seleccion_modo").hide();
      $(".modo_simple").show();
      $(".modo_complejo").hide();
      parental = 1;
      break;
    case "comp_spar":
      titulo.innerHTML = "Complejo sin control parental";
      document.getElementById("boton_bus").style.background = "rgb(175, 255, 175)";
      $(".seleccion_modo").hide();
      $(".modo_simple").hide();
      $(".modo_complejo").show();
      parental = 0;
      break;
    case "simp_spar":
      titulo.innerHTML = "Simple sin control parental";
      $(".seleccion_modo").hide();
      $(".modo_simple").show();
      $(".modo_complejo").hide();
      break;
    default:
      titulo.innerHTML = "Bienvenido a VidPro";
      $(".seleccion_modo").show();
      $(".modo_simple").hide();
      $(".modo_complejo").hide();
  }
}

document.querySelectorAll(".seleccion_modo button").forEach(function (button) {
  button.addEventListener("click", seleccionModo);
});




// Rueda de botones

// Funcion de pelicula siguiente del mando complejo
const seccion_2 = document.getElementById('seccion2');
seccion_2.addEventListener('click', () => {
  console.log("cambiando pelicula siguiente");
  let envio = cambioPelicula();
  socket.emit('cambiarPelicula', envio);
  console.log(envio);
});

// Funcion de pelicula siguiente del mando simple
const seccion_2_s = document.getElementById('seccion2_s');
seccion_2_s.addEventListener('click', () => {
  console.log("cambiando pelicula siguiente");
  let envio = cambioPelicula();
  socket.emit('cambiarPelicula', envio);
  console.log(envio);
});

// Funcion de pelicula anterior del mando complejo
const seccion_4 = document.getElementById('seccion4');
seccion_4.addEventListener('click', () => {
  console.log("cambiando pelicula anterior");
  let envio = cambioPelicula();
  socket.emit('cambiarPelicula', envio);
  console.log(envio);
});

// Funcion de pelicula anterior del mando simple
const seccion_4_s = document.getElementById('seccion4_s');
seccion_4_s.addEventListener('click', () => {
  console.log("cambiando pelicula anterior");
  let envio = cambioPelicula();
  socket.emit('cambiarPelicula', envio);
  console.log(envio);
});

// Función que obtiene de manera aleatoria la siguiente pelicula
function cambioPelicula() {
  let id_sig = getRandomInt(23);
  id_sig = String(id_sig);
  return id_sig;
};

// Funcion de subida de volumen del mando complejo
const seccion_1 = document.getElementById('seccion1');
seccion_1.addEventListener('click', () => {
  console.log("envio subida de volumen");
  socket.emit('subirVol');
});

// Funcion de subida de volumen del mando simple
const seccion_1_s = document.getElementById('seccion1_s');
seccion_1_s.addEventListener('click', () => {
  console.log("envio subida de volumen");
  socket.emit('subirVol');
});

// Funcion de bajada de volumen del mando complejo
const seccion_3 = document.getElementById('seccion3');
seccion_3.addEventListener('click', () => {
  console.log("envio bajada de volumen");
  socket.emit('bajarVol');
});

// Funcion de bajada de volumen del mando simple
const seccion_3_s = document.getElementById('seccion3_s');
seccion_3_s.addEventListener('click', () => {
  console.log("envio bajada de volumen");
  socket.emit('bajarVol');
});

// Funcion del play y pause del mando
const btn_play_pause = document.getElementById('btn_play_pause');
btn_play_pause.addEventListener('click', () => {
  console.log("envio play o pausa");
  socket.emit('a_server_play_pause');
});

// Funcion del play y pause del mando simple
const btn_play_pause_s = document.getElementById('btn_play_pause_s');
btn_play_pause_s.addEventListener('click', () => {
  console.log("envio play o pausa");
  socket.emit('a_server_play_pause');
});

// Función del click del puntero
const btn_click = document.getElementById('btn_click');
btn_click.addEventListener('click', () => {
  console.log("envio click");
  socket.emit('a_server_click');
});

// Función del click del puntero simple
const btn_click_s = document.getElementById('btn_click_s');
btn_click_s.addEventListener('click', () => {
  console.log("envio click");
  socket.emit('a_server_click');
});

// Función del salir de la reproduccion de video
const btn_salir = document.getElementById('btn_salir');
btn_salir.addEventListener('click', () => {
  socket.emit('a_server_salir');
});

// Función del salir de la reproduccion de video simple
const btn_salir_s = document.getElementById('btn_salir_s');
btn_salir_s.addEventListener('click', () => {
  socket.emit('a_server_salir');
});


let gyroscope = new Gyroscope({ frequency: 60 });
let posX = window.innerWidth / 2; // Inicializar en el centro de la pantalla
let posY = window.innerHeight / 2; // Inicializar en el centro de la pantalla

posX = 700 + posX; //Esto esta puesto para ajustar al centro
posY = 100 + posY; //Esto esta puesto para ajustar al centro

const puntero = document.getElementById("puntero");
puntero.style.left = posX + "px";
puntero.style.top = posY + "px";

gyroscope.addEventListener("reading", (e) => {
  // Calcular nueva posición del puntero
  posY -= 35 * gyroscope.x;
  posX -= 35 * gyroscope.z;

  // Actualizar la posición del puntero en la pantalla
  puntero.style.left = posX + "px";
  puntero.style.top = posY + "px";

  let posicion = [posX, posY];

  /* console.log(posicion); */
  socket.emit('a_server_envio_posicion', posicion);
});

gyroscope.start();



function crearListaHTML(lista) {
  const itemsHTML = lista.map(item => `<li class='elem_lista'>${item}</li>`);
  const listaHTML = `<ul>${itemsHTML.join('')}</ul>`;
  return listaHTML;
}

const miLista = ['Item 1', 'Item 2', 'Item 3'];
const listaHTML = crearListaHTML(miLista);

const contenedorLista = document.getElementById('lista_cola');
contenedorLista.innerHTML = listaHTML;