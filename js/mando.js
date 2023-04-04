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
      
      if (j.nombre_cancion.includes(elValor)) {
        // si lo incluye agregalo al array de los seleccionados
        seleccionados.push(j);
      }
    });

    //para cada elemento selccionado
    seleccionados.forEach(s => {
      //crea un nuevo elemento p
      let div = document.createElement("div");
      //cuyo innerHTML es el nombre seleccionado
      div.innerHTML = s.nombre_cancion;
      //y agregalo al fragmento
      fragment.appendChild(div);

      div.setAttribute("id", s.id_cancion)
      div.setAttribute("class", "res_busqueda")
      div.addEventListener('click',() => {añadirACola()} );
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




/* const cargarCola = () => { */
const listaTareas = document.getElementById("lista_cola");

// Limpiar lista de tareas existente
listaTareas.innerHTML = "";

// Crear elementos HTML para cada tarea y agregarlos a la lista
for (let i = 0; i < cola.length; i++) {
  const objeto = cola[i];

  const colaElement = document.createElement("li");
  colaElement.classList.add('elem_lista');
  colaElement.textContent = objeto;

  listaTareas.appendChild(cola);
}
/* };
cargarCola(); */


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

    listaTareas.appendChild(objeto);
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


/* Codigo para obtener el valor introducido en la barra de busqueda */

const form = document.querySelector('.busqueda form');
form.addEventListener('submit', function (event) {
  event.preventDefault();
  const busc = event.target.querySelector('input[type="text"]').value;
  event.target.querySelector('input[type="text"]').value = "";
  console.log(busc);
  // hacer algo con la busqueda
});

