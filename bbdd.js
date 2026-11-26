// bbdd.js: guarda y lee los usuarios en el localStorage del navegador.
// Se usa la misma clave que antes para no perder los usuarios ya cargados.
const CLAVE_USUARIOS = 'portfolioLucasClientes';

// Devuelve la lista de usuarios guardados (o una lista vacía).
function obtenerUsuarios() {
    return JSON.parse(localStorage.getItem(CLAVE_USUARIOS)) || [];
}

// Guarda la lista completa de usuarios.
function guardarUsuarios(usuarios) {
    localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios));
}

// El ID nuevo es el ID más alto + 1, así no se repite.
function nuevoId() {
    const usuarios = obtenerUsuarios();
    if (usuarios.length === 0) return 1;
    return Math.max(...usuarios.map(u => Number(u.id) || 0)) + 1;
}

// Busca un usuario por su ID.
function verUsuario(id) {
    return obtenerUsuarios().find(u => u.id === id);
}

// Revisa si OTRO usuario ya tiene ese DNI o email.
// Al editar se pasa el ID propio para que no se compare consigo mismo.
function existeDniOMail(dni, mail, idPropio) {
    return obtenerUsuarios().some(u => u.id !== idPropio && (u.dni === dni || u.mail === mail));
}

// Agrega un usuario nuevo y lo devuelve.
function guardarUsuario(nombre, apellido, dni, mail) {
    const usuarios = obtenerUsuarios();
    const usuario = { id: nuevoId(), nombre, apellido, dni, mail };
    usuarios.push(usuario);
    guardarUsuarios(usuarios);
    return usuario;
}

// Cambia los datos de un usuario existente.
function editarUsuario(id, nombre, apellido, dni, mail) {
    const usuarios = obtenerUsuarios();
    const usuario = usuarios.find(u => u.id === id);
    usuario.nombre = nombre;
    usuario.apellido = apellido;
    usuario.dni = dni;
    usuario.mail = mail;
    guardarUsuarios(usuarios);
}

// Borra un usuario: se guarda la lista sin él.
function eliminarUsuario(id) {
    const usuarios = obtenerUsuarios().filter(u => u.id !== id);
    guardarUsuarios(usuarios);
}
