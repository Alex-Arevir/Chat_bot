const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'agenda_cita',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Obtener estado por teléfono
async function obtenerEstadobytelefono(telefono) {
  const [rows] = await pool.query(
    "SELECT estado FROM usuarios WHERE telefono = ?",
    [telefono]
  );
  return rows.length ? rows[0].estado : null;
}

// Crear usuario nuevo
async function crearUsuario(telefono, estado) {
  await pool.query(
    "INSERT INTO usuarios (telefono, estado) VALUES (?, ?)",
    [telefono, estado]
  );
}
async function borrarCitaUsuario(telefono,fecha,hora){
  const[rows]=await pool.query(
    'delete c from citas c join usuarios u on c.ID_Usuario=u.id where u.telefono=? and c.fecha=? and c.hora=?',
    [telefono,fecha,hora]
  );
}

// Guardar estado
async function guardarEstado(telefono, estado) {
  await pool.query(
    "UPDATE usuarios SET estado = ? WHERE telefono = ?",
    [estado, telefono]
  );
}

// Guardar nombre
async function guardarNombre(telefono, nombre) {

  if (typeof nombre !== 'string' || nombre.trim() === '') {
    throw new Error('Nombre inválido');
  }
  try {
    await pool.query(
      "UPDATE usuarios SET nombre = ? WHERE telefono = ?",
      [nombre.trim(), telefono]
    );
  } catch (error) {
    console.error('Error guardarNombre:', error);
    throw error;
  }
}

// Guardar correo
async function guardarCorreo(telefono, correo) {
  await pool.query(
    "UPDATE usuarios SET correo = ? WHERE telefono = ?",
    [correo, telefono]
  );
}

// Obtener horarios disponibles
async function obtenerHorariosDisponibles() {
  return ["12/08/2024 10:00", "15/05/2028 12:00", "15/08/2024 14:00", "48/58/2224 07:00", "74/47/5421 16:00"];
}

// Guardar cita
async function horariosRegistradosCitas(telefono, fecha, hora) {
  const [user] = await pool.query(
    "SELECT id FROM usuarios WHERE telefono = ?",
    [telefono]
  );
  if (!user.length) throw new Error("Usuario no encontrado");

  const idUsuario = user[0].id;

  // Convertir fecha de 'dd/mm/yyyy' a 'yyyy-mm-dd'
  const [dd, mm, yyyy] = fecha.split('/');
  const fechaSQL = `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;

  // Añadir segundos si la hora es solo hh:mm
  const horaSQL = hora.length === 5 ? hora + ':00' : hora;

  await pool.query(
    "INSERT INTO citas (ID_Usuario, fecha, hora, estatus) VALUES (?, ?, ?, 'pendiente')",
    [idUsuario, fechaSQL, horaSQL]
  );
}



// Obtener citas de un usuario
async function obtenerCitasUsuario(telefono) {
  const [user] = await pool.query(
    "SELECT id FROM usuarios WHERE telefono = ?",
    [telefono]
  );
  if (!user.length) return [];

  const idUsuario = user[0].id;

  const [rows] = await pool.query(
    "SELECT fecha, hora, estatus FROM citas WHERE ID_Usuario = ?",
    [idUsuario]
  );
  return rows;
}


async function obtenerTodasLasCitas() {
  const [rows] = await pool.query(`
    SELECT u.telefono, u.nombre, u.correo, c.fecha, c.hora, c.estatus
    FROM citas c
    JOIN usuarios u ON c.ID_Usuario = u.id
  `);
  return rows;
}

module.exports = {
  obtenerEstadobytelefono,
  crearUsuario,
  guardarEstado,
  guardarNombre,
  guardarCorreo,
  obtenerHorariosDisponibles,
  horariosRegistradosCitas,
  obtenerCitasUsuario,
  borrarCitaUsuario,
  obtenerTodasLasCitas
};
