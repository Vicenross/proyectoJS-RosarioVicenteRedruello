//Turnero de cosmetologa

//primera interaccion: necesitas un turno si o no
let continuar = true

let sacarturno = prompt("Desea sacar un turno? (si/no)").toLowerCase()
if (sacarturno == "si") {
    console.log("Elija el servicio deseado")
} else {
    (sacarturno == "no")
    continuar = false
    console.log("Gracias por su visita")
}

//segunda interaccion: conoce los servicios que ofrecemos

const servicios = ["Limpieza facial profunda", "Extracciones", "Radiofrecuencia"]
for (const servicio of servicios) {
    console.log("Servicio: "+servicio)

}

// tercer interaccion: seleccionar servicio

while (continuar) {
    let menu = parseInt(prompt("\n 1-Limpieza facial profunda \n 2-Extracciones \n 3-Radiofrecuencia"))

    switch (menu) {
        case 1:
            console.log("Servicio seleccionado: Limpieza facial profunda: $50")
            break
        case 2:
            console.log("Servicio seleccionado: Extracciones: $30")
            break
        case 3:
            console.log("Servicio seleccionado: Radiofrecuencia: $150")
            break
        default:
            console.log("Opcion incorrecta")
    }

    let confirmacion = prompt("Desea sacar otro turno? (si/no)").toLowerCase()
    if (confirmacion == "no") {
        continuar = false
        alert("Proximo paso, elegir la fecha!")
    }
}

//cuarta interaccion selecciona fecha y hora

 function fecha () {
    let mes = (prompt("Ingrese el mes en el que desea asistir"))
    let dia = (prompt("Ingrese el dia en el que desea asistir"))
    let hora = (prompt("Ingrese el horario en el que desea asistir"))
    let resultado = dia+"/"+mes+" a las "+hora
    console.log("Tu turno sera el "+resultado)
    alert("Tu turno sera el "+resultado)
 }

fecha ()

//calcular precio final con iva - no se como hacer para solo mostrar el precio de la seleccion

function calcularPrecioFinal(precio, impuesto) {
    return precio*impuesto 
}

let precioextracciones = calcularPrecioFinal(30, 1.21);
let precioradiofrecuencia = calcularPrecioFinal(150, 1.21);
let preciolimpieza = calcularPrecioFinal(70, 1.21);

console.log(`Precio final del servicio de Extracciones: ${precioextracciones}`);
console.log(`Precio final del servicio de Limpieza: ${preciolimpieza}`);
console.log(`Precio final del servicio de Radiofrecuencia: ${precioradiofrecuencia}`);

//Saludo final


alert("Te esperamos, gracias por confiar en nosotros!")




