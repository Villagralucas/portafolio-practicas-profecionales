// home.js: muestra el login o el panel de usuarios según haya sesión iniciada.

function verificarSesion() {
    const haySesion = localStorage.getItem(CLAVES_SESION.SESION) === 'true';

    // Con sesión se ve el panel; sin sesión, el login.
    document.getElementById('seccion-login').hidden = haySesion;
    document.getElementById('panel').hidden = !haySesion;

    if (haySesion) {
        document.getElementById('usuario-nombre').textContent = localStorage.getItem(CLAVES_SESION.USUARIO) || 'admin';
        document.getElementById('fecha-ingreso').textContent = localStorage.getItem(CLAVES_SESION.FECHA) || 'sin datos';
    }
}

function cerrarSesion() {
    localStorage.removeItem(CLAVES_SESION.SESION);
    localStorage.removeItem(CLAVES_SESION.USUARIO);
    localStorage.removeItem(CLAVES_SESION.FECHA);
    window.location.reload(); // Recarga la página para volver al login.
}

document.getElementById('cerrar-sesion').addEventListener('click', cerrarSesion);

verificarSesion();
