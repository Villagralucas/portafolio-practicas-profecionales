// home.js: revisa que haya sesión, muestra la bienvenida y permite cerrar sesión.

// Claves donde login.js guarda la sesión en el localStorage.
const CLAVES_SESION = {
    SESION: 'portfolioLucasSesionAdmin',
    USUARIO: 'portfolioLucasUsuarioActual',
    FECHA: 'portfolioLucasFechaIngreso'
};

const LOGIN_URL = 'login.html';

function verificarSesion() {
    const sesionActiva = localStorage.getItem(CLAVES_SESION.SESION);

    // Sin sesión: volver al login.
    if (sesionActiva !== 'true') {
        window.location.replace(LOGIN_URL);
        return;
    }

    // Con sesión: se muestran el usuario y la fecha de ingreso.
    document.getElementById('usuario-nombre').textContent = localStorage.getItem(CLAVES_SESION.USUARIO) || 'admin';
    document.getElementById('fecha-ingreso').textContent = localStorage.getItem(CLAVES_SESION.FECHA) || 'sin datos';
}

function cerrarSesion() {
    localStorage.removeItem(CLAVES_SESION.SESION);
    localStorage.removeItem(CLAVES_SESION.USUARIO);
    localStorage.removeItem(CLAVES_SESION.FECHA);
    window.location.href = LOGIN_URL;
}

document.getElementById('cerrar-sesion').addEventListener('click', cerrarSesion);

verificarSesion();
