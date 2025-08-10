const palabras = {
  saludos: [
    "hola",
    "buenas",
    "buen día",
    "buenas tardes",
    "buenas noches",
    "qué tal",
    "hola bot",
    "hey",
    "holi",
    "saludos",
    "que onda",
    "qué hay",
    "helo",
    "jola",
    "perro",
  ],
  volver: ["volver"],
  horarios: ["opcion 1", "opcion 2", "opcion 3"],
  cancelar: ["cancelar"], // para iniciar cancelación si escriben "cancelar"
  consultar: ["consultar cita","¿cancelar cita?"], // botones en consulta
  agendar: ["agendar cita"],
  salir: ["salir", "salir de la consulta", "cancelar"],
  confirmacion: ["confirmar", "si","Si"], // botón para confirmar cancelación
  intentardenuevo: ["intentar de nuevo", "cancelar", "intentar de nuevo"],
  cancelarconfirmacion: ["no", "volver","No"],  // botón para abortar cancelación o volver
};

function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quita tildes
    .replace(/[¡!¿?.,]/g, "") // quita signos de puntuacion comunes
    .trim();
}

function accion(palabraClave) {
  const palabraNormalizada = normalizar(palabraClave);

  for (const categoria in palabras) {
    if (
      palabras[categoria].some(p =>
        palabraNormalizada.includes(normalizar(p))
      )
    ) {
      return categoria;
    }
  }

  console.log("palabraClave no reconocida: ", palabraClave);
  return null;
}

module.exports = {
  accion,
};
