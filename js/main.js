// listado de SERVICIOS
const servicios= [
    {
        id: 1, 
        nombre: "Radiofrecuencia", 
        precio: 150
    },
    {
        id: 2, 
        nombre: "Extracciones", 
        precio: 30
    },
    {
        id: 3, 
        nombre: "Limpieza Facial",
        precio: 50
    },
    
]

let turnoEnProceso = {}



// Mostrar u ocultar secciones
function mostrarSecciones(id) {
  document.querySelectorAll("section").forEach(segmento => segmento.classList.remove("visible"));
  document.getElementById(id).classList.add("visible");

  if (id === "agendados") cargarTurnos();
}


// Renderizado card servicios

function cargarServicios(servicios) {
  let contenedorServicios = document.getElementById("listaServicios");

  servicios.forEach(servicio => {
    const div = document.createElement("div")
    div.className = "card"
    div.innerHTML = `<h3>${servicio.nombre}</h3>
                     <h4>€ ${servicio.precio}</h4>
                     <button class="btn elegir-servicio" id="${servicio.id}">Ver diponibilidad</button>`
    contenedorServicios.appendChild(div);
  })

  document.querySelectorAll(".elegir-servicio").forEach(btn => {
    btn.addEventListener("click", () => {
      const servicioId = parseInt(btn.id);
      seleccionarServicio(servicioId);
    });
  });
}


//seleccion de servicio, horario, datos cliente y envio a array
function seleccionarServicio(id) {
  turnoEnProceso.servicio = servicios.find(servicio => servicio.id === id).nombre;
  mostrarSecciones("formFechaHora");
}


function irFormularioDatos() {
  turnoEnProceso.fecha = document.getElementById("fecha").value;
  turnoEnProceso.hora = document.getElementById("hora").value;
  mostrarSecciones("formDatos");
}


function guardarTurno() {
  turnoEnProceso.nombre = document.getElementById("nombre").value;
  turnoEnProceso.apellido = document.getElementById("apellido").value;
  turnoEnProceso.mail = document.getElementById("mail").value;
  turnoEnProceso.telefono = document.getElementById("telefono").value;

  const turnos = JSON.parse(localStorage.getItem("turnos")) || [];
  turnos.push(turnoEnProceso);

  localStorage.setItem("turnos", JSON.stringify(turnos));

   
  mostrarSecciones("agendados");
  turnoEnProceso = {};
}



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
                     <button class="delete-btn" index="${index}">Borrar</button>`;

    lista.appendChild(div);
  });


  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = parseInt(btn.index);
      borrarTurno(index);
    });
  });
}


document.getElementById("btnGuardarTurno").addEventListener("click", guardarTurno);
document.getElementById("btnReservar").addEventListener("click", () => mostrarSecciones("reservar"));
document.getElementById("btnServicios").addEventListener("click", () => mostrarSecciones("reservar"));
document.getElementById("btnAgendados").addEventListener("click", () => mostrarSecciones("agendados"));
document.getElementById("btnContinuarDatos").addEventListener("click", irFormularioDatos);




cargarServicios(servicios)
mostrarSecciones("reservar")


