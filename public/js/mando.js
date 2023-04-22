// Función que me genera un numero aleatorio
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// Configuración inicial de la página
$(".seleccion_modo").show();
$(".modo_simple").hide();
$(".modo_complejo").hide();



const colaMando = document.querySelector("#lista_cola");
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
  elValor = elValor.toLowerCase();
  //si hay un valor
  if (elValor.length > 0) {
    // busca en el json si el nombre incluye (o empieza por) el valor
    archivo.forEach(j => {
      titulo = j.nombre.toLowerCase();
      if (titulo.includes(elValor)) {
        // si lo incluye agregalo al array de los seleccionados
        seleccionados.push(j);
      }
    });

    //para cada elemento selccionado
    seleccionados.forEach(s => {
      //crea un nuevo elemento div
      let div = document.createElement("div");
      //cuyo innerHTML es el nombre seleccionado
      div.innerHTML = s.nombre;
      //y agregalo al fragmento
      fragment.appendChild(div);

      // Crea el botón para añadir a la cola
      let btnCola = document.createElement("button");
      btnCola.setAttribute("class", "btn_busq");
      btnCola.setAttribute("id", "bus_cola");
      btnCola.innerHTML = "Añadir a cola";
      btnCola.addEventListener("click", () => {
        // Aquí colocarías la lógica para añadir a la cola el elemento s
        console.log("Añadir a cola: " + s.nombre);
        socket.emit('a_server_act_cola', s.id);
        busqueda.value = null;
        var inputEvent = new InputEvent("input");
        busqueda.dispatchEvent(inputEvent);

      });
      div.appendChild(btnCola);

      // Crea el botón para reproducir
      let btnReproducir = document.createElement("button");
      btnReproducir.setAttribute("class", "btn_busq");
      btnReproducir.setAttribute("id", "bus_rep");
      btnReproducir.innerHTML = "Reproducir";
      btnReproducir.addEventListener("click", () => {
        // Aquí colocarías la lógica para reproducir el elemento s
        console.log("Reproducir: " + s.nombre);
        socket.emit('a_server_reproducir_bus', s.id);
        busqueda.value = null;
        var inputEvent = new InputEvent("input");
        busqueda.dispatchEvent(inputEvent);
      });
      div.appendChild(btnReproducir);

      div.setAttribute("id", s.id);
      div.setAttribute("class", "res_busqueda");
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

//A continuacion se añade la busqueda por voz
const recognition = new webkitSpeechRecognition();
let mic = document.getElementById("microfono");

recognition.continuous = true;
recognition.lang = 'es-Es';
recognition.interimResult = false;
micro_encendido = false;
mic.setAttribute("style", "background-image: url('../media/micOn.png');, background-size: 50% 50%;");


mic.addEventListener('click', () => {
  micro_encendido = !micro_encendido
  if (micro_encendido) {
    recognition.start();
    mic.setAttribute("style", "background-image: url('../media/micOff.png');, background-size: 50% 50%;");
  } else {
    recognition.abort();
    mic.setAttribute("style", "background-image: url('../media/micOn.png');, background-size: 50% 50%;");
  }
});

recognition.onresult = (event) => {
  busqueda.value = event.results[event.results.length - 1][0].transcript;
  var inputEvent = new InputEvent("input");
  busqueda.dispatchEvent(inputEvent);
};


// Funcion que me añade a cola el video que quiera desde el buscador
function añadirACola(id) {
  for (var i = 0; i < archivo.length; i++) {
    if (archivo[i].id == id) {
      cola.push([archivo[i].id, archivo[i].nombre]);

      // Limpiar la cola existente
      colaMando.innerHTML = "";
      // Loop para imprimir la cola nueva
      for (let i = 0; i < cola.length; i++) {
        const elem = cola[i][1];

        const colaElement = document.createElement("li");
        colaElement.classList.add('elem_lista');
        colaElement.textContent = elem;
        colaMando.appendChild(colaElement);
      }
    } else {
      null
    }
  }
};


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
      // Caso del mando complejo con control parental
      titulo.innerHTML = "Complejo con control parental";
      $(".seleccion_modo").hide();
      $(".modo_simple").hide();
      $(".modo_complejo").show(); // Muestra el modo complejo
      socket.emit('a_server_cambio_parental', 1); // Cambia el valor de la variable de control_parental para saber que está activo
      break;
    case "simp_par":
      // Caso del mando complejo con control parental
      titulo.innerHTML = "Simple con control parental";
      $(".seleccion_modo").hide();
      $(".modo_simple").show(); // Muestra el modo simple
      $(".modo_complejo").hide();
      socket.emit('a_server_cambio_parental', 1); // Cambia el valor de la variable de control_parental para saber que está activo
      break;
    case "comp_spar":
      // Caso del mando complejo con control parental
      titulo.innerHTML = "Complejo sin control parental";
      $(".seleccion_modo").hide();
      $(".modo_simple").hide();
      $(".modo_complejo").show(); // Muestra el modo complejo
      socket.emit('a_server_cambio_parental', 0); // Cambia el valor de la variable de control_parental para saber que está inactivo
      break;
    case "simp_spar":
      // Caso del mando complejo con control parental
      titulo.innerHTML = "Simple sin control parental";
      $(".seleccion_modo").hide();
      $(".modo_simple").show(); // Muestra el modo simple
      $(".modo_complejo").hide();
      socket.emit('a_server_cambio_parental', 0); // Cambia el valor de la variable de control_parental para saber que está inactivo
      break;
    default:
      // Caso predeterminado al que no de deberia llegar en ningun caso pero nunca sobra
      titulo.innerHTML = "Bienvenido a VidPro";
      $(".seleccion_modo").show();
      $(".modo_simple").hide();
      $(".modo_complejo").hide();
  }
};
// Obtenemos el boton que  pulsamos y ejecutamos la función
document.querySelectorAll(".seleccion_modo button").forEach(function (button) {
  button.addEventListener("click", seleccionModo);
});


// Rueda de botones

// Funcion de pelicula siguiente del mando complejo
const seccion_2 = document.getElementById('seccion2');
seccion_2.addEventListener('click', () => {
  let envio = cambioPelicula();
  socket.emit('cambiarPelicula', envio);

  // Limpiar la cola existente
  colaMando.innerHTML = "";
  // Loop para actualizar la cola
  for (let i = 0; i < cola.length; i++) {
    const elem = cola[i][1];

    const colaElement = document.createElement("li");
    colaElement.classList.add('elem_lista');
    colaElement.textContent = elem;

    colaMando.appendChild(colaElement);
  }
});

// Funcion de pelicula siguiente del mando simple
const seccion_2_s = document.getElementById('seccion2_s');
seccion_2_s.addEventListener('click', () => {
  let envio = cambioPelicula();
  socket.emit('cambiarPelicula', envio);
});

// Funcion de pelicula anterior del mando complejo
const seccion_4 = document.getElementById('seccion4');
seccion_4.addEventListener('click', () => {
  let envio = cambioPelicula();
  socket.emit('cambiarPelicula', envio);
});

// Funcion de pelicula anterior del mando simple
const seccion_4_s = document.getElementById('seccion4_s');
seccion_4_s.addEventListener('click', () => {
  let envio = cambioPelicula();
  socket.emit('cambiarPelicula', envio);
});

// Función que obtiene de manera aleatoria la siguiente pelicula
function cambioPelicula() {
  let id_sig = getRandomInt(20);
  id_sig = String(id_sig);
  return id_sig;
};

// Funcion de subida de volumen del mando complejo
const seccion_1 = document.getElementById('seccion1');
seccion_1.addEventListener('click', () => {
  socket.emit('subirVol');
});

// Funcion de subida de volumen del mando simple
const seccion_1_s = document.getElementById('seccion1_s');
seccion_1_s.addEventListener('click', () => {
  socket.emit('subirVol');
});

// Funcion de bajada de volumen del mando complejo
const seccion_3 = document.getElementById('seccion3');
seccion_3.addEventListener('click', () => {
  socket.emit('bajarVol');
});

// Funcion de bajada de volumen del mando simple
const seccion_3_s = document.getElementById('seccion3_s');
seccion_3_s.addEventListener('click', () => {
  socket.emit('bajarVol');
});

// Funcion del play y pause del mando
const btn_play_pause = document.getElementById('btn_play_pause');
btn_play_pause.addEventListener('click', () => {
  socket.emit('a_server_play_pause');
});

// Funcion del play y pause del mando simple
const btn_play_pause_s = document.getElementById('btn_play_pause_s');
btn_play_pause_s.addEventListener('click', () => {
  socket.emit('a_server_play_pause');
});

// Función del click del puntero
const btn_click = document.getElementById('btn_click');
btn_click.addEventListener('click', () => {
  socket.emit('a_server_click');
});

// Función del click del puntero simple
const btn_click_s = document.getElementById('btn_click_s');
btn_click_s.addEventListener('click', () => {
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

// Función para desplazar la pantalla hacia arriba desde el mando complejo
const btn_arriba = document.getElementById('btn_arriba');
btn_arriba.addEventListener('click', () => {
  socket.emit('a_server_subir_pantalla');
});

// Función para desplazar la pantalla hacia arriba desde el mando simple
const btn_arriba_s = document.getElementById('btn_arriba_s');
btn_arriba_s.addEventListener('click', () => {
  socket.emit('a_server_subir_pantalla');
});

// Función para desplazar la pantalla hacia abajo desde el mando complejo
const btn_abajo = document.getElementById('btn_abajo');
btn_abajo.addEventListener('click', () => {
  socket.emit('a_server_bajar_pantalla');
});

// Función para desplazar la pantalla hacia abajo desde el mando simple
const btn_abajo_s = document.getElementById('btn_abajo_s');
btn_abajo_s.addEventListener('click', () => {
  socket.emit('a_server_bajar_pantalla');
});


// Funcionalidad del giroscopio implementado para poder usar el puntero en la pantalla principal
let gyroscope = new Gyroscope({ frequency: 60 });
let posX = window.innerWidth / 2; // Inicializar en el centro de la pantalla
let posY = window.innerHeight / 2; // Inicializar en el centro de la pantalla

let rotacion = 0;

posX = 700 + posX; //Esto esta puesto para ajustar al centro
posY = 100 + posY; //Esto esta puesto para ajustar al centro

const puntero = document.getElementById("puntero");
puntero.style.left = posX + "px";
puntero.style.top = posY + "px";

let puedeEjecutarRotacion = true;
const espera = 1000; // Para el giroscopio y el acelerómetro

gyroscope.addEventListener("reading", (e) => {
  /*  PUNTERO  */
  // Calcular nueva posición del puntero
  posY -= 35 * gyroscope.x;
  posX -= 35 * gyroscope.z;

  // Actualizar la posición del puntero en la pantalla
  puntero.style.left = posX + "px";
  puntero.style.top = posY + "px";

  let posicion = [posX, posY];

  /* console.log(posicion); */
  socket.emit('a_server_envio_posicion', posicion);

  /*  SIGUIENTE/ANTERIOR VIDEO  */
  rotacion = gyroscope.y;

  if (rotacion > 7 && puedeEjecutarRotacion) {
    // Siguiente película
    let envio = cambioPelicula();
    socket.emit('cambiarPelicula', envio);

    // Limpiar la cola existente
    colaMando.innerHTML = "";
    // Loop para actualizar la cola
    for (let i = 0; i < cola.length; i++) {
      const elem = cola[i][1];

      const colaElement = document.createElement("li");
      colaElement.classList.add('elem_lista');
      colaElement.textContent = elem;

      colaMando.appendChild(colaElement);
    }

    // Desactivar ejecución de rotación
    puedeEjecutarRotacion = false;

    // Reactivar ejecución después de un tiempo
    setTimeout(() => {
      puedeEjecutarRotacion = true;
    }, espera);
  }
  else if (rotacion < -7 && puedeEjecutarRotacion) {
    // Anterior película
    let envio = cambioPelicula();
    socket.emit('cambiarPelicula', envio);

    // Desactivar ejecución de rotación
    puedeEjecutarRotacion = false;

    // Reactivar ejecución después de un tiempo
    setTimeout(() => {
      puedeEjecutarRotacion = true;
    }, espera);
  }
});

gyroscope.start();




const acl2 = new Accelerometer({ frequency: 60 });
let puedeEjecutarAcelerometro = true;

acl2.addEventListener("reading", () => {
  if (acl2.x > 10  && puedeEjecutarAcelerometro) {
    console.log("Efectivamente es hacia derecha");
    console.log(`Acceleration along the X-axis ${acl2.x}`);
    socket.emit('subirVol');

    // Desactivar ejecución del acelerometro
    puedeEjecutarAcelerometro = false;

    // Reactivar después del segundo de espera
    setTimeout(() => {
      puedeEjecutarAcelerometro = true;
    }, espera);
  }
  if (acl2.x < -10  && puedeEjecutarAcelerometro) {
    console.log("Efectivamente es hacia izq");
    console.log(`Acceleration along the X-axis ${acl2.x}`);
    socket.emit('bajarVol');

    // Desactivar ejecución del acelerometro
    puedeEjecutarAcelerometro = false;

    // Reactivar después del segundo de espera
    setTimeout(() => {
      puedeEjecutarAcelerometro = true;
    }, espera);
  }

});

acl2.start();


/* let ultimoMovimiento = 0;
const tiempoEspera = 2000; // 2 segundos en milisegundos


const acl = new Accelerometer({ frequency: 60 });

let velocidadY = 0;
let ultimaVelocidadY = 0;
let tiempoUltimaLectura = 0;

acl.addEventListener("reading", () => {
  const ahora = Date.now();
  const tiempoTranscurrido = ahora - tiempoUltimaLectura;
  tiempoUltimaLectura = ahora;

  // Calcular velocidad en eje Y (en metros por segundo)
  velocidadY += acl.y * tiempoTranscurrido / 1000;
  const velocidadMediaY = (velocidadY + ultimaVelocidadY) / 2;
  ultimaVelocidadY = velocidadY;

  // Detectar movimiento rápido hacia arriba o hacia abajo
  if (velocidadMediaY > umbralMovimientoRapido) {
    const tiempoDesdeUltimoMovimiento = ahora - ultimoMovimiento;
    if (tiempoDesdeUltimoMovimiento > tiempoEspera) {
      console.log("Movimiento rápido hacia arriba detectado!");
      // Ejecutar función correspondiente al movimiento hacia arriba
      // ...
      ultimoMovimiento = ahora;
    }
  } else if (velocidadMediaY < ) {
    const tiempoDesdeUltimoMovimiento = ahora - ultimoMovimiento;
    if (tiempoDesdeUltimoMovimiento > tiempoEspera) {
      console.log("Movimiento rápido hacia abajo detectado!");
      // Ejecutar función correspondiente al movimiento hacia abajo
      // ...
      ultimoMovimiento = ahora;
    }
  }
});

acl.start(); */

