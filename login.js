// login.js: inicio de sesión con usuarios de prueba (es una simulación escolar).
const USUARIOS_PRUEBA = {
    admin: '1234',
    usuario: 'pass123'
};

// Claves donde se guarda la sesión en el localStorage (home.js usa las mismas).
const CLAVES_SESION = {
    SESION: 'portfolioLucasSesionAdmin',
    USUARIO: 'portfolioLucasUsuarioActual',
    FECHA: 'portfolioLucasFechaIngreso'
};

const HOME_URL = 'index.html';

const formularioLogin = document.getElementById('formulario-login');
const mensajeLogin = document.getElementById('mensaje-login');

formularioLogin.addEventListener('submit', function (evento) {
    evento.preventDefault(); // Evita que la página se recargue.

    const usuario = document.getElementById('username').value.trim();
    const contrasena = document.getElementById('password').value;

    if (USUARIOS_PRUEBA[usuario] !== contrasena) {
        mensajeLogin.textContent = 'Usuario o contraseña incorrectos.';
        document.getElementById('password').value = '';
        return;
    }

    // Se guarda la sesión y la fecha de ingreso, y se pasa al portfolio.
    localStorage.setItem(CLAVES_SESION.SESION, 'true');
    localStorage.setItem(CLAVES_SESION.USUARIO, usuario);
    localStorage.setItem(CLAVES_SESION.FECHA, new Date().toLocaleString('es-AR'));

    window.location.href = HOME_URL;
});
