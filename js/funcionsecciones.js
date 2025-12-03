

// Mostrar u ocultar secciones
function mostrarSecciones(id) {
  document.querySelectorAll("section").forEach(segmento => segmento.classList.remove("visible"));
  document.getElementById(id).classList.add("visible");

  if (id === "agendados") cargarTurnos();
}