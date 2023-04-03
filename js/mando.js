

function cambiarTitulo() {
    let seleccion = this.id;
    let titulo = document.getElementById("h1_titulo");
  
    switch (seleccion) {
      case "comp_par":
        titulo.innerHTML = "Título del Modo 1";
        break;
      case "simp_par":
        titulo.innerHTML = "Título del Modo 2";
        break;
      case "comp_spar":
        titulo.innerHTML = "Título del Modo 3";
        break;
      case "simp_spar":
        titulo.innerHTML = "Título del Modo 4";
        break;
      default:
        titulo.innerHTML = "Título por defecto";
    }
  }
  
  document.querySelectorAll(".seleccion_modo button").forEach(function (button) {
    button.addEventListener("click", cambiarTitulo);
  });
  

/* Codigo para obtener el valor introducido en la barra de busqueda */

const form = document.querySelector('.busqueda form');
form.addEventListener('submit', function(event) {
  event.preventDefault();
  const busqueda = event.target.querySelector('input[type="text"]').value;
  event.target.querySelector('input[type="text"]').value = "";
  console.log(busqueda);
  // hacer algo con la busqueda
});

