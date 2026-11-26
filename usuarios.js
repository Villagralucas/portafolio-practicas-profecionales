// Los datos existentes se conservan: usamos la misma clave de almacenamiento.
const CLAVE_CLIENTES = 'portfolioLucasClientes';
const CLAVE_SESION = 'portfolioLucasSesionAdmin';

function leerClientes() {
    const guardados = localStorage.getItem(CLAVE_CLIENTES);
    const clientes = guardados === null ? [] : JSON.parse(guardados);
    if (!Array.isArray(clientes)) throw new Error('La lista no es válida.');
    return clientes;
}

// No se repiten los IDs, incluso si hay usuarios guardados desde antes.
function siguienteId(clientes) {
    return clientes.reduce(function (mayor, cliente, indice) {
        const numero = Number(cliente.id);
        return Math.max(mayor, Number.isSafeInteger(numero) && numero > 0 ? numero : indice + 1);
    }, 0) + 1;
}

const registro = document.getElementById('formulario-registro');
const lista = document.getElementById('lista-clientes');

function mostrarUsuarios() {
    if (!lista) return;
    const estado = document.getElementById('estado-clientes');
    try {
        const clientes = leerClientes();
        lista.replaceChildren();
        estado.textContent = clientes.length ? 'Total de usuarios: ' + clientes.length : 'Todavía no hay usuarios registrados.';
        clientes.forEach(function (cliente, indice) {
            const fila = document.createElement('tr');
            const campos = [cliente.id ?? indice + 1, cliente.nombre, cliente.apellido, cliente.dni, cliente.mail];
            campos.forEach(function (valor) {
                const celda = document.createElement('td');
                celda.textContent = String(valor ?? '');
                fila.appendChild(celda);
            });
            lista.appendChild(fila);
        });
    } catch (error) {
        estado.textContent = 'No se pudo cargar la lista de usuarios.';
    }
}

function actualizarIdVisible() {
    if (!registro || !registro.elements.id) return;
    try { registro.elements.id.value = siguienteId(leerClientes()); }
    catch (error) { registro.elements.id.value = ''; }
}

if (registro) {
    const estado = document.getElementById('estado-registro');
    actualizarIdVisible();
    registro.addEventListener('submit', function (evento) {
        evento.preventDefault();
        const cliente = {
            nombre: registro.elements.nombre.value.trim(),
            apellido: registro.elements.apellido.value.trim(),
            dni: registro.elements.dni.value.trim(),
            mail: registro.elements.mail.value.trim().toLowerCase()
        };
        if (!cliente.nombre || !cliente.apellido || !/^[0-9]{7,8}$/.test(cliente.dni) || !registro.elements.mail.validity.valid) {
            estado.textContent = 'Revisá nombre, apellido, DNI y email.';
            return;
        }
        try {
            const clientes = leerClientes();
            const repetido = clientes.some(function (guardado) {
                return guardado.dni === cliente.dni || String(guardado.mail).toLowerCase() === cliente.mail;
            });
            if (repetido) {
                estado.textContent = 'Ya existe un usuario con ese DNI o email.';
                return;
            }
            cliente.id = siguienteId(clientes);
            clientes.push(cliente);
            localStorage.setItem(CLAVE_CLIENTES, JSON.stringify(clientes));
            registro.reset();
            estado.textContent = 'Usuario #' + cliente.id + ' creado correctamente.';
            actualizarIdVisible();
            mostrarUsuarios();
        } catch (error) {
            estado.textContent = 'No se pudo guardar el usuario. Revisá el almacenamiento del navegador.';
        }
    });
    registro.addEventListener('reset', function () {
        estado.textContent = '';
        setTimeout(actualizarIdVisible, 0);
    });
}

mostrarUsuarios();

// Compatibilidad con el login y el panel originales, por si se conservan.
const login = document.getElementById('formulario-login');
if (login) {
    login.addEventListener('submit', function (evento) {
        evento.preventDefault();
        const estado = document.getElementById('estado-login');
        if (login.elements.username.value.trim() !== 'admin' || login.elements.password.value !== '1234') {
            estado.textContent = 'Usuario o contraseña incorrectos.';
            return;
        }
        localStorage.setItem(CLAVE_SESION, 'true');
        window.location.href = 'admin.html';
    });
}
const panel = document.getElementById('panel-admin');
if (panel) {
    if (localStorage.getItem(CLAVE_SESION) !== 'true') {
        window.location.replace('login.html');
    } else {
        panel.hidden = false;
        mostrarUsuarios();
    }
    document.getElementById('cerrar-sesion').addEventListener('click', function () {
        localStorage.removeItem(CLAVE_SESION);
        window.location.replace('login.html');
    });
}
