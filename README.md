# Portfolio personal — Prácticas Profesionalizantes

Página hecha con HTML, CSS y JavaScript. La página de usuarios usa Bootstrap 5 para los estilos.

## Cómo abrirlo

Abrí la carpeta en Visual Studio Code, hacé clic derecho en `index.html` y elegí
**Open with Live Server**. Los datos se guardan en el `localStorage` del
navegador, así que conviene usar siempre la misma dirección y el mismo navegador.
Bootstrap se carga desde internet, así que hace falta conexión.

## Páginas

- `index.html`: presentación, acerca de mí, proyectos en acordeón y formulario de contacto.
- `usuarios.html`: todo el manejo de usuarios en una sola página (ver abajo).
- `proyectos/harro/`: página de la hamburguesería Harro Burger House.

## Usuarios (`usuarios.html`)

En una misma página está todo lo del Taller de HTML & CSS:

| En el taller | En esta página |
|---|---|
| `login.html` | Tarjeta "Iniciar sesión" |
| `index.html` (home) | "Bienvenido, usuario", fecha de ingreso y "Cerrar sesión" |
| `form_usuario.html` | Formulario "Crear usuario" |
| `editar_usuario.html` | El mismo formulario, al tocar "Editar" en la tabla |
| `ver_usuario.html` | Tarjeta "Datos del usuario", al tocar "Ver" |
| `lista_usuarios.html` | Tabla "Lista de usuarios" con cantidad de registrados |
| Eliminar (en `bbdd.js`) | Botón "Eliminar", con confirmación |
| `buscar_usuario.js` | Buscador arriba de la tabla |

Usuarios de prueba: `admin` / `1234` y `usuario` / `pass123`.

### Archivos JavaScript

Se cargan en este orden, porque cada uno usa funciones de los anteriores:

1. `bbdd.js`: guarda y lee los usuarios en el `localStorage` (obtener, guardar, editar, ver y eliminar).
2. `login.js`: revisa usuario y contraseña y guarda la sesión.
3. `home.js`: muestra el login o el panel según haya sesión, y cierra la sesión.
4. `buscar_usuario.js`: filtra la tabla mientras se escribe.
5. `usuarios.js`: dibuja la tabla y maneja el formulario, el detalle y el botón eliminar.

## Otros archivos

- `estilos.css`: estilos del portfolio (`index.html`).
- `contacto.js`: guarda las consultas del formulario de contacto.
- `imagenes/`: imágenes ilustrativas.

## Validaciones

- Todos los campos son obligatorios y no aceptan solo espacios.
- El mail tiene que tener formato de correo.
- El DNI tiene que tener 7 u 8 números.
- No se pueden repetir DNI ni mail.

## Alcance

Es una simulación escolar: usá datos ficticios. No hay servidor ni se envían
mails. Si borrás los datos del sitio, se borran los registros.
