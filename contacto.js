const formulario = document.getElementById('formulario-contacto');
const estado = document.getElementById('estado-consulta');
const CLAVE_CONSULTAS = 'portfolioLucasConsultas';

formulario.addEventListener('submit', function (evento) {
    // Evitamos que la página se recargue al enviar el formulario.
    evento.preventDefault();
    estado.textContent = '';

    const consulta = {
        nombre: formulario.elements.nombre.value.trim(),
        apellido: formulario.elements.apellido.value.trim(),
        mail: formulario.elements.mail.value.trim(),
        telefono: formulario.elements.telefono.value.trim(),
        mensaje: formulario.elements.mensaje.value.trim(),
        fecha: new Date().toISOString()
    };

    if (!consulta.nombre || !consulta.apellido || !consulta.mail || !consulta.telefono || !consulta.mensaje) {
        estado.textContent = 'Completá todos los campos. No pueden contener solo espacios.';
        return;
    }

    try {
        // Recuperamos las consultas anteriores para no sobrescribirlas.
        const datosGuardados = localStorage.getItem(CLAVE_CONSULTAS);
        const consultas = datosGuardados === null ? [] : JSON.parse(datosGuardados);

        if (!Array.isArray(consultas)) {
            throw new Error('Los datos guardados no son una lista.');
        }

        consultas.push(consulta);
        localStorage.setItem(CLAVE_CONSULTAS, JSON.stringify(consultas));

        formulario.reset();
        estado.textContent = 'Tu consulta quedó guardada en este navegador.';
    } catch (error) {
        // Si el guardado falla, conservamos los datos del formulario.
        estado.textContent = 'No se pudo guardar la consulta. Tus datos siguen en el formulario.';
    }
});

formulario.addEventListener('reset', function () {
    estado.textContent = '';
});