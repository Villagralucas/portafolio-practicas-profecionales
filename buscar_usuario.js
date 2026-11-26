// buscar_usuario.js: filtra la lista mientras se escribe en el buscador.
const buscador = document.getElementById('buscar-usuario');

// Devuelve true si el usuario tiene el texto buscado en el nombre, apellido, DNI o email.
function coincideBusqueda(usuario) {
    const texto = buscador.value.trim().toLowerCase();
    const datos = `${usuario.nombre} ${usuario.apellido} ${usuario.dni} ${usuario.mail}`.toLowerCase();
    return datos.includes(texto);
}

// Cada vez que se escribe, se vuelve a dibujar la tabla (mostrarUsuarios está en usuarios.js).
buscador.addEventListener('input', function () {
    mostrarUsuarios();
});
