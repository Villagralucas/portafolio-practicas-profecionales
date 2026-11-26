// usuarios.js: listar, agregar, ver, editar y eliminar usuarios (secciones Administrar y Ver usuarios del index).
// Los datos se leen y se guardan con las funciones de bbdd.js.
// Los formularios se abren en ventanas modales de Bootstrap.

const tabla = document.getElementById('lista-usuarios');
const mensajeLista = document.getElementById('mensaje-lista');
const formularioUsuario = document.getElementById('formulario-usuario');
const tituloFormulario = document.getElementById('titulo-formulario');
const mensajeFormulario = document.getElementById('mensaje-formulario');

// Ventanas modales de Bootstrap (se abren con .show() y se cierran con .hide()).
const modalUsuario = new bootstrap.Modal(document.getElementById('modal-usuario'));
const modalVer = new bootstrap.Modal(document.getElementById('modal-ver'));
const modalEliminar = new bootstrap.Modal(document.getElementById('modal-eliminar'));

// Si es null, el formulario agrega un usuario. Si tiene un número, edita ese usuario.
let idEnEdicion = null;

// ID del usuario que se va a eliminar cuando se confirme en el modal.
let idParaEliminar = null;

// ---------- Lista de usuarios ----------

function crearBoton(texto, color, accion) {
    const boton = document.createElement('button');
    boton.type = 'button';
    boton.className = 'btn btn-sm me-1 ' + color;
    boton.textContent = texto;
    boton.addEventListener('click', accion);
    return boton;
}

function mostrarUsuarios() {
    const usuarios = obtenerUsuarios();
    const encontrados = usuarios.filter(coincideBusqueda); // coincideBusqueda está en buscar_usuario.js

    tabla.innerHTML = '';

    encontrados.forEach(function (usuario) {
        const fila = document.createElement('tr');

        // Una celda por cada dato del usuario.
        [usuario.id, usuario.nombre, usuario.apellido, usuario.dni, usuario.mail].forEach(function (dato) {
            const celda = document.createElement('td');
            celda.textContent = dato;
            fila.appendChild(celda);
        });

        // Última celda: los botones de acciones.
        const acciones = document.createElement('td');
        acciones.className = 'text-nowrap';
        acciones.append(
            crearBoton('Ver', 'btn-outline-secondary', () => mostrarDetalle(usuario.id)),
            crearBoton('Editar', 'btn-outline-primary', () => abrirEdicion(usuario.id)),
            crearBoton('Eliminar', 'btn-outline-danger', () => pedirConfirmacion(usuario.id))
        );
        fila.appendChild(acciones);

        tabla.appendChild(fila);
    });

    // Cantidad de usuarios y aviso cuando la tabla queda vacía.
    document.getElementById('cantidad-usuarios').textContent = usuarios.length;

    let aviso = '';
    if (usuarios.length === 0) {
        aviso = 'Todavía no hay usuarios registrados.';
    } else if (encontrados.length === 0) {
        aviso = 'No se encontraron usuarios con esos datos.';
    }
    document.getElementById('mensaje-busqueda').textContent = aviso;
}

// ---------- Agregar y editar (modal con el formulario) ----------

// Abre el modal vacío para agregar un usuario nuevo.
function abrirAlta() {
    idEnEdicion = null;
    formularioUsuario.reset();
    document.getElementById('id-usuario').value = nuevoId();
    tituloFormulario.textContent = 'Agregar usuario';
    mensajeFormulario.textContent = '';
    modalUsuario.show();
}

// Abre el modal con los datos de un usuario para modificarlos.
function abrirEdicion(id) {
    const usuario = verUsuario(id);
    idEnEdicion = usuario.id;

    document.getElementById('id-usuario').value = usuario.id;
    document.getElementById('form-nombre').value = usuario.nombre;
    document.getElementById('form-apellido').value = usuario.apellido;
    document.getElementById('form-dni').value = usuario.dni;
    document.getElementById('form-mail').value = usuario.mail;

    tituloFormulario.textContent = 'Editar usuario #' + usuario.id;
    mensajeFormulario.textContent = '';
    modalUsuario.show();
}

formularioUsuario.addEventListener('submit', function (evento) {
    evento.preventDefault(); // Evita que la página se recargue.

    const nombre = document.getElementById('form-nombre').value.trim();
    const apellido = document.getElementById('form-apellido').value.trim();
    const dni = document.getElementById('form-dni').value.trim();
    const mail = document.getElementById('form-mail').value.trim().toLowerCase();

    // Validaciones: si algo está mal, se avisa dentro del modal.
    if (!nombre || !apellido) {
        mensajeFormulario.textContent = 'Completá el nombre y el apellido.';
        return;
    }
    if (!/^[0-9]{7,8}$/.test(dni)) {
        mensajeFormulario.textContent = 'El DNI tiene que tener 7 u 8 números, sin puntos.';
        return;
    }
    if (existeDniOMail(dni, mail, idEnEdicion)) {
        mensajeFormulario.textContent = 'Ya existe un usuario con ese DNI o email.';
        return;
    }

    // Guardar: si no hay ID en edición se agrega; si hay, se edita.
    if (idEnEdicion === null) {
        const nuevo = guardarUsuario(nombre, apellido, dni, mail);
        mensajeLista.textContent = 'Usuario #' + nuevo.id + ' agregado correctamente.';
    } else {
        editarUsuario(idEnEdicion, nombre, apellido, dni, mail);
        mensajeLista.textContent = 'Usuario #' + idEnEdicion + ' actualizado correctamente.';
    }

    modalUsuario.hide();
    mostrarUsuarios();
});

document.getElementById('boton-agregar').addEventListener('click', abrirAlta);

// Cuando el modal termina de abrirse, el cursor va al campo Nombre.
document.getElementById('modal-usuario').addEventListener('shown.bs.modal', function () {
    document.getElementById('form-nombre').focus();
});

// ---------- Ver usuario (modal de solo lectura) ----------

function mostrarDetalle(id) {
    const usuario = verUsuario(id);

    document.getElementById('ver-id').textContent = usuario.id;
    document.getElementById('ver-nombre').textContent = usuario.nombre;
    document.getElementById('ver-apellido').textContent = usuario.apellido;
    document.getElementById('ver-dni').textContent = usuario.dni;
    document.getElementById('ver-mail').textContent = usuario.mail;

    modalVer.show();
}

// ---------- Eliminar usuario ----------

// Abre el modal que pregunta si de verdad se quiere eliminar al usuario.
function pedirConfirmacion(id) {
    const usuario = verUsuario(id);
    idParaEliminar = usuario.id;
    document.getElementById('eliminar-nombre').textContent = `${usuario.nombre} ${usuario.apellido} (DNI ${usuario.dni})`;
    modalEliminar.show();
}

// Al tocar "Eliminar" dentro del modal, se borra el usuario.
document.getElementById('confirmar-eliminar').addEventListener('click', function () {
    const usuario = verUsuario(idParaEliminar);
    eliminarUsuario(idParaEliminar);

    mensajeLista.textContent = `Se eliminó a ${usuario.nombre} ${usuario.apellido}.`;
    modalEliminar.hide();
    mostrarUsuarios();
});

// ---------- Al abrir la página ----------
mostrarUsuarios();
