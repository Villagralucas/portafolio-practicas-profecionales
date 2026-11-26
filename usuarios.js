// usuarios.js: crear, listar, ver, editar y eliminar usuarios en esta misma página.
// Los datos se leen y se guardan con las funciones de bbdd.js.

const formulario = document.getElementById('formulario-usuario');
const tituloFormulario = document.getElementById('titulo-formulario');
const mensajeFormulario = document.getElementById('mensaje-formulario');
const tabla = document.getElementById('lista-usuarios');
const tarjetaVer = document.getElementById('ver-usuario');

// Si es null, el formulario crea un usuario. Si tiene un número, edita ese usuario.
let idEnEdicion = null;

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
            crearBoton('Editar', 'btn-outline-primary', () => cargarParaEditar(usuario.id)),
            crearBoton('Eliminar', 'btn-outline-danger', () => borrarUsuario(usuario.id))
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

// ---------- Formulario: crear y editar ----------

function mostrarMensaje(texto, esError) {
    mensajeFormulario.textContent = texto;
    mensajeFormulario.className = esError ? 'text-danger mt-3 mb-0' : 'text-success mt-3 mb-0';
}

// Deja el formulario vacío y listo para crear un usuario nuevo.
function prepararAlta() {
    idEnEdicion = null;
    formulario.reset();
    document.getElementById('id-usuario').value = nuevoId();
    tituloFormulario.textContent = 'Crear usuario';
    mensajeFormulario.textContent = '';
}

// Carga los datos de un usuario en el formulario para modificarlos.
function cargarParaEditar(id) {
    const usuario = verUsuario(id);
    idEnEdicion = usuario.id;

    document.getElementById('id-usuario').value = usuario.id;
    document.getElementById('nombre').value = usuario.nombre;
    document.getElementById('apellido').value = usuario.apellido;
    document.getElementById('dni').value = usuario.dni;
    document.getElementById('mail').value = usuario.mail;

    tituloFormulario.textContent = 'Editar usuario #' + usuario.id;
    mensajeFormulario.textContent = '';
    tarjetaVer.hidden = true;
    formulario.scrollIntoView({ behavior: 'smooth' });
}

formulario.addEventListener('submit', function (evento) {
    evento.preventDefault(); // Evita que la página se recargue.

    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const dni = document.getElementById('dni').value.trim();
    const mail = document.getElementById('mail').value.trim().toLowerCase();

    // Validaciones
    if (!nombre || !apellido) {
        mostrarMensaje('Completá el nombre y el apellido.', true);
        return;
    }
    if (!/^[0-9]{7,8}$/.test(dni)) {
        mostrarMensaje('El DNI tiene que tener 7 u 8 números, sin puntos.', true);
        return;
    }
    if (existeDniOMail(dni, mail, idEnEdicion)) {
        mostrarMensaje('Ya existe un usuario con ese DNI o email.', true);
        return;
    }

    // Guardar: si no hay ID en edición se crea; si hay, se edita.
    let texto;
    if (idEnEdicion === null) {
        const nuevo = guardarUsuario(nombre, apellido, dni, mail);
        texto = 'Usuario #' + nuevo.id + ' creado correctamente.';
    } else {
        editarUsuario(idEnEdicion, nombre, apellido, dni, mail);
        texto = 'Usuario #' + idEnEdicion + ' actualizado correctamente.';
    }

    prepararAlta();
    mostrarMensaje(texto, false);
    mostrarUsuarios();
});

document.getElementById('cancelar').addEventListener('click', prepararAlta);

// ---------- Ver usuario ----------

function mostrarDetalle(id) {
    const usuario = verUsuario(id);

    document.getElementById('ver-id').textContent = usuario.id;
    document.getElementById('ver-nombre').textContent = usuario.nombre;
    document.getElementById('ver-apellido').textContent = usuario.apellido;
    document.getElementById('ver-dni').textContent = usuario.dni;
    document.getElementById('ver-mail').textContent = usuario.mail;

    tarjetaVer.hidden = false;
    tarjetaVer.scrollIntoView({ behavior: 'smooth' });
}

document.getElementById('cerrar-detalle').addEventListener('click', function () {
    tarjetaVer.hidden = true;
});

// ---------- Eliminar usuario ----------

function borrarUsuario(id) {
    const usuario = verUsuario(id);
    const confirmado = confirm(`¿Seguro que querés eliminar a ${usuario.nombre} ${usuario.apellido} (DNI ${usuario.dni})?`);
    if (!confirmado) return;

    eliminarUsuario(id);
    tarjetaVer.hidden = true;

    // Si se estaba editando ese usuario, el formulario vuelve a "Crear usuario".
    if (idEnEdicion === id) {
        prepararAlta();
    } else if (idEnEdicion === null) {
        document.getElementById('id-usuario').value = nuevoId();
    }

    mostrarUsuarios();
}

// ---------- Al abrir la página ----------
prepararAlta();
mostrarUsuarios();
