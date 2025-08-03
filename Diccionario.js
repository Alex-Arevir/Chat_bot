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
    " ",
    "helo",
    "jola",
    "perro",
  ],
  agendar: ["Agendar Cita"],
  cancelar: ["cancelar"],
  consultar: ["Consultar Cita"],
  salir: [
    "salir",
    "Salir",
    "salir de la consulta",
    "Salir de la consulta",
    "Salir de la consulta",
    "salir de la consulta",
    "Salir de la consulta",
    "Salir de la consulta",
  ],
  confirmacion: ["confirmar"],
  cancelarConfirmacion: ["no", "volver"],
};

function accion(palabraClave) {//funcion que recibe la palabra enviada por el usuario y se almacena en la variable
  palabraClave = palabraClave.trim().toLowerCase();//normaliza la palabra clave a minusculas y elimina los espacios

  for (const categoria in palabras) {//recorre las categorias de palabras
    if (
      palabras[categoria].some((p) => p.toLowerCase().trim() === palabraClave)//Si alguna palabra de la categoría coincide con la palabra clave normalizada, retorna la categoría
    ){
     return categoria;
    }
  }

  console.log("palabraClave: ", palabraClave); //debug 
  return null; // No se encontró coincidencia
}

module.exports = {
  accion,
};
