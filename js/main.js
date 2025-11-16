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

let turnoEnProceso = []



// Mostrar u ocultar secciones
function mostrar(id) {
  document.querySelectorAll("section").forEach(sec => sec.classList.remove("visible"));
  document.getElementById(id).classList.add("visible");

  if (id === "agendados") cargarTurnos();
}


// Renderizado card servicios

function cargarServicios(servicios) {
  const cont = document.getElementById("listaServicios");

  servicios.forEach(serv => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<h3>${serv.nombre}</h3>
                     <h4>€ ${serv.precio}</h4>
      <button class="btn elegir-servicio" data-id="${serv.id}">Ver diponibilidad</button>`;

    cont.appendChild(div);
  });

  document.querySelectorAll(".elegir-servicio").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      seleccionarServicio(id);
    });
  });
}


//seleccion de servicio, horario, datos cliente y envio a array
function seleccionarServicio(id) {
  turnoEnProceso.servicio = servicios.find(serv => serv.id === id).nombre;
  mostrar("formFechaHora");
}


function irFormularioDatos() {
  turnoEnProceso.fecha = document.getElementById("fecha").value;
  turnoEnProceso.hora = document.getElementById("hora").value;
  mostrar("formDatos");
}


function guardarTurno() {
  turnoEnProceso.nombre = document.getElementById("nombre").value;
  turnoEnProceso.apellido = document.getElementById("apellido").value;
  turnoEnProceso.mail = document.getElementById("mail").value;
  turnoEnProceso.telefono = document.getElementById("telefono").value;

  const turnos = JSON.parse(localStorage.getItem("turnos")) || [];
  turnos.push(turnoEnProceso);

  localStorage.setItem("turnos", JSON.stringify(turnos));

  turnoEnProceso = {};
  mostrar("agendados");
}
 guardarTurno()


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
    div.className = "card";

    // Creamos todo el contenido con innerHTML
    div.innerHTML = `
      <h3>Turno confirmado para ${turno.servicio}</h3>
      <p>Fecha: ${turno.fecha} - ${turno.hora} </P>
      <p>Nombre: ${turno.nombre} ${turno.apellido}</p>
      <h4>Contacto</h4>
      <p>Telefono (${turno.telefono})</p>
      <p>Mail: ${turno.mail}</p>
      <button class="delete-btn" data-index="${index}">Borrar</button>
    `;

    lista.appendChild(div);
  });

  // Agregamos eventos a los botones de borrar
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = parseInt(btn.dataset.index);
      borrarTurno(index);
    });
  });
}



document.getElementById("btnReservar").addEventListener("click", () => mostrar("reservar"));
document.getElementById("btnServicios").addEventListener("click", () => mostrar("reservar"));
document.getElementById("btnAgendados").addEventListener("click", () => mostrar("agendados"));
document.getElementById("btnContinuarDatos").addEventListener("click", irFormularioDatos);
document.getElementById("btnGuardarTurno").addEventListener("click", guardarTurno);




cargarServicios(servicios)
mostrar("reservar");


