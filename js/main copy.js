
let turnoEnProceso = {}


// Mostrar u ocultar secciones
function mostrarSecciones(id) {
  document.querySelectorAll("section").forEach(segmento => segmento.classList.remove("visible"));
  document.getElementById(id).classList.add("visible");

  if (id === "agendados") cargarTurnos();
}


const contenedorServicios = document.getElementById("listaServicios");
const URL = "./db/data.json"
let serviciosData =[];

function obtenerServicios() {
  fetch(URL)
    .then(response => response.json())
    .then(data => {
      serviciosData = data;
      cargarServicios(data);

    })
    .catch(err => {
    contenedorServicios.innerHTML = `<p class="error">Hubo un error y no es posible cargar los servicios.</p>`;
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

  document.querySelectorAll(".elegir-servicio").forEach(btn => {
    btn.addEventListener("click", () => {
      const servicioId = parseInt(btn.id);
      seleccionarServicio(servicioId);
    });
  });
}

function seleccionarServicio(id) {
  const servicioSeleccionado  = serviciosData.find(servicio => servicio.id === id).nombre;

  turnoEnProceso.servicio = servicioSeleccionado;
  mostrarSecciones("formFechaHora");
}

obtenerServicios()



// Borrar turno
function borrarTurno(index) {
  let turnos = JSON.parse(localStorage.getItem("turnos")) || [];
  turnos.splice(index, 1);
  localStorage.setItem("turnos", JSON.stringify(turnos));
  cargarTurnos();
}

// Mostrar turnos guardados
function cargarTurnos() {
  const lista = document.getElementById("listaTurnos");
  lista.innerHTML = "";
  let turnos = JSON.parse(localStorage.getItem("turnos")) || [];

  turnos.forEach((turno, index) => {
    const div = document.createElement("div");
    div.className = "card"
    div.innerHTML = `<h3>Turno confirmado para ${turno.servicio}</h3>
                     <p>Fecha: ${turno.fecha} - ${turno.hora} </P>
                     <p>Nombre: ${turno.nombre} ${turno.apellido}</p>
                     <h4>Contacto</h4>
                     <p>Telefono (${turno.telefono})</p>
                     <p>Mail: ${turno.mail}</p>
                     <button class="delete-btn" index="${index}">Borrar</button>
                     <button class="editar-btn" index = "${index}" >Editar</button >`


    lista.appendChild(div);
  });


  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = parseInt(btn.index);
      borrarTurno(index);
    });
  });
}


document.getElementById("btnReservar").addEventListener("click", () => mostrarSecciones("reservar"));
document.getElementById("btnServicios").addEventListener("click", () => mostrarSecciones("reservar"));
document.getElementById("btnAgendados").addEventListener("click", () => mostrarSecciones("agendados"));





mostrarSecciones("reservar")


