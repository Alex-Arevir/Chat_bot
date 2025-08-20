const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config(); // carga variables de .env

const BASE_URL = process.env.BASE_URL || "http://localhost/apis"; // fallback si no está en .env

// =====================
// todo: Usuarios
// =====================

// Crear usuario
async function crearUsuario(telefono, estado = "inicio") {
  try {
    const res = await axios.post(`${BASE_URL}/usuarios.php`, {
      telefono,
      estado,
    });
    return res.data;
  } catch (err) {
    console.error("Error creando usuario:", err.message);
  }
}

// Obtener lista de usuarios
async function obtenerUsuarios() {
  try {
    const res = await axios.get(`${BASE_URL}/usuarios.php?action=listar`);
    return res.data;
  } catch (err) {
    console.error("Error obteniendo usuarios:", err.message);
  }
}

// Obtener estado de un usuario por teléfono
async function obtenerEstado(telefono) {
  try {
    const res = await axios.get(`${BASE_URL}/usuarios.php`, {
      params: { telefono },
    });
    return res.data.estado || null; // fallback si PHP no devuelve estado
  } catch (err) {
    console.error("Error obteniendo estado:", err.message);
    return null;
  }
}

// Guardar estado de un usuario
async function guardarEstado(telefono, estado) {
  try {
    const res = await axios.put(`${BASE_URL}/usuarios.php`, {
      telefono,
      estado,
    });
    return res.data;
  } catch (err) {
    console.error("Error guardando estado:", err.message);
  }
}

// Guardar nombre de un usuario
async function guardarNombre(telefono, nombre) {
  try {
    const res = await axios.put(`${BASE_URL}/usuarios.php`, {
      telefono,
      nombre,
    });
    return res.data;
  } catch (err) {
    console.error("Error guardando nombre:", err.message);
  }
}

// Guardar correo de un usuario
async function guardarCorreo(telefono, correo) {
  try {
    const res = await axios.put(`${BASE_URL}/usuarios.php`, {
      telefono,
      correo,
    });
    return res.data;
  } catch (err) {
    console.error("Error guardando correo:", err.message);
  }
}

// =====================
// Citas
// =====================

// Crear cita
async function crearCita(telefono, fecha, hora) {
  try {
    const res = await axios.post(`${BASE_URL}/citas.php`, {
      action: "crear",
      telefono,
      fecha,
      hora,
    });
    return res.data;
  } catch (err) {
    console.error("Error creando cita:", err.message);
  }
}

// Obtener citas
async function obtenerCitas() {
  try {
    const res = await axios.get(`${BASE_URL}/citas.php?action=listar`);
    return res.data;
  } catch (err) {
    console.error("Error obteniendo citas:", err.message);
  }
}


async function obtenerHorariosDisponibles() {
  try {
    const res = await axios.get(`${BASE_URL}/horarios.php?action=horarios`);
    return res.data;
  } catch (err) {
    console.error("Error obteniendo horarios disponibles:", err.message);
    return [];
  }
}
async function borrarCitaUsuario(telefono, fecha, hora) {
  try {
    const res = await axios.delete(`${BASE_URL}/usuarios.php`, {
      data: { telefono, fecha, hora } // DELETE necesita enviar los datos en `data`
    });
    return res.data;
  } catch (err) {
    console.error("Error borrando cita:", err.message);
  }
}



module.exports = {
  crearUsuario,
  obtenerUsuarios,
  obtenerEstado,
  guardarEstado,
  guardarNombre,
  guardarCorreo,
  crearCita,
  obtenerCitas,
  obtenerHorariosDisponibles,
  borrarCitaUsuario
};
