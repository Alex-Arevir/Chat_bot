const palabras = {
     saludos: [
          "hola", "buenas", "buen día", "buenas tardes", "buenas noches", "qué tal", "hola bot", "hey", "holi", "saludos", "que onda", "qué hay", " ", "helo",
          "jola", "perro"
     ],
     agendar: [
          "Agendar Cita"
     ],
     cancelar: [
          "cancelar"
     ],
     consultar: [
          "Consultar Cita"
     ],
     salir: [
          "salir", "Salir", "salir de la consulta", "Salir de la consulta", "Salir de la consulta", "salir de la consulta", "Salir de la consulta", "Salir de la consulta"
     ],
     confirmacion: [
          "confirmar"
     ],
     cancelarConfirmacion: [
          "no", "volver"
     ]
};

function accion(palabraClave) {
     palabraClave = palabraClave.trim().toLowerCase();

     for (const categoria in palabras) {
          if (palabras[categoria].some(p => p.toLowerCase().trim() === palabraClave)) {
               return categoria;
          }
     }

     console.log("palabraClave: ", palabraClave) //debug
     return null; // No se encontró coincidencia
}

module.exports = {
     accion
}