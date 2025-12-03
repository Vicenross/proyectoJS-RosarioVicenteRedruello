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

//seleccion de fecha y hora con vanilla calendar
const { Calendar } = window.VanillaCalendarPro;
const calendarInput = new Calendar('#calendar', {
  inputMode: true,
  positionToInput: 'auto',
  onChangeToInput(self) {
    if (!self.context.inputElement) return;
    if (self.context.selectedDates[0]) {
      self.context.inputElement.value = self.context.selectedDates[0];
    } else {
      self.context.inputElement.value = '';
    }
  },

  selectedTheme: 'light',
  dateMin: new Date(),
  dateMax: '2026-12-31',

  //hora
  selectionTimeMode: 24,
  timeMinHour: 9,
  timeMaxHour: 20,
  onChangeTime(self) {
    const fecha = document.getElementById("calendar").value;
    const horaSeleccionada = self.context.selectedTime;

    if (!fecha) return;

    const turnos = JSON.parse(localStorage.getItem("turnos")) || [];
    const ocupado = turnos.some(turno => turno.fecha === fecha && turno.hora === horaSeleccionada);

    if (ocupado) {
      document.getElementById("hora").value = '';
      //alert toastify
      Toastify({
        text: "La hora ${horaSeleccionada} ya está ocupada. Por favor selecciona otro horario.",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "center",
        style: {
          background: "linear-gradient(to right, #ED7A77, #f1a4a2ff)",
        },
      }).showToast();
    } else {
      document.getElementById("hora").value = horaSeleccionada;
      self.hide();
    }
  }
});
calendarInput.init();

// submit de fecha y hora
const formularioHorario = document.getElementById("formHorario")
formularioHorario.addEventListener("submit", function (event) {
  event.preventDefault();

  const fecha = document.getElementById("calendar").value;
  const hora = document.getElementById("hora").value;

  if (!fecha) {
    Toastify({
      text: "Seleccioná una fecha",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "center",
      style: {
        background: "linear-gradient(to right, #ED7A77, #f1a4a2ff)",
      },
    }).showToast();
    return;
  }
  if (!hora) {
    Toastify({
      text: "Seleccioná una hora",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "center",
      style: {
        background: "linear-gradient(to right, #ED7A77, #f1a4a2ff)",
      },
    }).showToast();
    return;
  }

  turnoEnProceso.fecha = fecha;
  turnoEnProceso.hora = hora;

  formulario.reset()

  mostrarSecciones("formDatos");

})


//submit form datos cliente
const formulario = document.getElementById("formulariocliente")
formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  turnoEnProceso.nombre = document.getElementById("nombre").value;
  turnoEnProceso.apellido = document.getElementById("apellido").value;
  turnoEnProceso.mail = document.getElementById("mail").value;
  turnoEnProceso.telefono = document.getElementById("telefono").value;

  //para que funcione editar
  const turnos = JSON.parse(localStorage.getItem("turnos")) || [];
  if (turnoEnProceso.index !== undefined && turnoEnProceso.index !== null) {
    turnos[turnoEnProceso.index] = {
      servicio: turnoEnProceso.servicio,
      fecha: turnoEnProceso.fecha,
      hora: turnoEnProceso.hora,
      nombre: turnoEnProceso.nombre,
      apellido: turnoEnProceso.apellido,
      mail: turnoEnProceso.mail,
      telefono: turnoEnProceso.telefono
    };
    delete turnoEnProceso.index;
  } else {
    turnos.push(turnoEnProceso);
  }
  localStorage.setItem("turnos", JSON.stringify(turnos));

  mostrarSecciones("agendados");
  turnoEnProceso = {};

  formulario.reset()

  //alert toastify
  Toastify({
    text: "Turno guardado, te esperamos!",
    duration: 3000,
    close: true,
    gravity: "top",
    position: "center",
    style: {
      background: "linear-gradient(to right, #ED7A77, #f1a4a2ff)",
    },

  }).showToast();
});

// Mostrar turnos guardados, boton editar y eliminar
function cargarTurnos() {
  const lista = document.getElementById("listaTurnos");
  lista.innerHTML = "";
  let turnos = localStorage.getItem("turnos")
  turnos = JSON.parse(turnos) || [];

  turnos.forEach((turno, index) => {
    const div = document.createElement("div");
    div.className = "card"
    div.innerHTML = `<h3>Turno confirmado para ${turno.servicio}</h3>
                     <p>Fecha: ${turno.fecha} - ${turno.hora} </P>
                     <p>Nombre: ${turno.nombre}, ${turno.apellido}</p>
                     <h4>Contacto</h4>
                     <p>Telefono (${turno.telefono})</p>
                     <p>Mail: ${turno.mail}</p>
                     <button class="delete-btn grande-btn" index="${index}">Borrar</button>
                     <button class="editar-btn grande-btn" index="${index}" >Editar</button >`

    lista.appendChild(div);
  });

  const aEliminar = document.querySelectorAll(".delete-btn");
  aEliminar.forEach(btn => {
    btn.addEventListener("click", () => {
      const index = parseInt(btn.index);
      borrarTurno(index);
    });
  });

  const aEditar = document.querySelectorAll(".editar-btn");
  aEditar.forEach(btn => {
    btn.addEventListener("click", () => {
      const index = parseInt(btn.getAttribute("index"));
      editarTurno(index);
    });
  });

}

// Borrar turno
function borrarTurno(index) {
  let turnos = JSON.parse(localStorage.getItem("turnos")) || [];
  turnos.splice(index, 1);
  localStorage.setItem("turnos", JSON.stringify(turnos));
  cargarTurnos(turnos);
}

// editar turno
function editarTurno(index) {
  let turnos = JSON.parse(localStorage.getItem("turnos")) || [];
  const turno = turnos[index];

  turnoEnProceso = { ...turno, index };

  document.getElementById("calendar").value = turno.fecha;
  document.getElementById("hora").value = turno.hora;
  document.getElementById("nombre").value = turno.nombre;
  document.getElementById("apellido").value = turno.apellido;
  document.getElementById("mail").value = turno.mail;
  document.getElementById("telefono").value = turno.telefono;

  mostrarSecciones("formFechaHora");
}


// clicks
document.getElementById("btnReservar").addEventListener("click", () => mostrarSecciones("reservar"));
document.getElementById("btnServicios").addEventListener("click", () => mostrarSecciones("reservar"));
document.getElementById("btnAgendados").addEventListener("click", () => mostrarSecciones("agendados"));


mostrarSecciones("reservar")


