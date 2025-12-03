let turnoEnProceso = {}

// Mostrar u ocultar secciones
function mostrarSecciones(id) {
  document.querySelectorAll("section").forEach(segmento => segmento.classList.remove("visible"));
  document.getElementById(id).classList.add("visible");

  if (id === "agendados") cargarTurnos();
}

//importar db
const contenedorServicios = document.getElementById("listaServicios");
const URL = "./db/data.json"

function obtenerServicios() {
  fetch(URL)
    .then(response => response.json())
    .then(data => {
      cargarServicios(data);

    })
    .catch(err => {
      contenedorServicios.innerHTML = `<p class="error">Hubo un error y no es posible cargar los servicios.</p>`, err
    })
}

// Renderizado card servicios
function cargarServicios(servicios) {
  servicios.forEach(servicio => {
    const div = document.createElement("div")
    div.className = "card"
    div.innerHTML = `<h3>${servicio.nombre}</h3>
                     <h4>€ ${servicio.precio}</h4>
                     <button class="btn elegir-servicio" id="${servicio.id}">Ver disponibilidad</button>`
    contenedorServicios.appendChild(div);
  })
  seleccionarServicio(servicios)
}

function seleccionarServicio(dataServicios) {
  addButton = document.querySelectorAll(".elegir-servicio");
  addButton.forEach(button => {
    button.onclick = (e) => {
      let servicioId = parseInt(e.currentTarget.id);
      const servicioSeleccionado = dataServicios.find(servicio => servicio.id === servicioId);
      turnoEnProceso.servicio = servicioSeleccionado.nombre;
      mostrarSecciones("formFechaHora");
    }
  })
}
obtenerServicios()


// clicks
document.getElementById("btnReservar").addEventListener("click", () => mostrarSecciones("reservar"));
document.getElementById("btnServicios").addEventListener("click", () => mostrarSecciones("reservar"));
document.getElementById("btnAgendados").addEventListener("click", () => mostrarSecciones("agendados"));


mostrarSecciones("reservar")


