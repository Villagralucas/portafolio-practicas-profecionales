# Portfolio personal — Prácticas Profesionalizantes

Página hecha con HTML, CSS y JavaScript, con Bootstrap 5 para los estilos y los modales.

## Cómo abrirlo

Abrí la carpeta en Visual Studio Code, hacé clic derecho en `login.html` y elegí
**Open with Live Server**. Los datos se guardan en el `localStorage` del
navegador, así que conviene usar siempre la misma dirección y el mismo navegador.
Bootstrap se carga desde internet, así que hace falta conexión.

Usuario de prueba: `admin` / `1234`.

## Páginas

- `login.html`: inicio de sesión. Al entrar, lleva a `index.html`.
- `index.html`: el portfolio. Si no hay sesión iniciada, vuelve al login.
- `proyectos/harro/`: página de la hamburguesería Harro Burger House.

## Qué tiene `index.html`

Sigue el `index.html` del Taller de HTML & CSS, todo en la misma página:

| Sección | Qué hace |
|---|---|
| Menú | Enlaces a cada sección y botón "Cerrar sesión" |
| Inicio | "Bienvenido, admin!" y último ingreso |
| Administrar usuarios | Cantidad de usuarios y botón "+ Agregar usuario" (abre un modal) |
| Ver usuarios | Buscador y tabla con botones Ver, Editar y Eliminar |
| Acerca de mí | Presentación personal |
| Mis proyectos | Proyectos en acordeón |
| Contacto | Formulario de consultas |

En el taller, `form_usuario.html`, `editar_usuario.html`, `ver_usuario.html` y
`lista_usuarios.html` son páginas separadas. Acá están integradas en el index:
agregar y editar usan el mismo modal, y "Ver" abre otro modal con los datos.

## Archivos JavaScript

- `login.js`: revisa usuario y contraseña, guarda la sesión y pasa al index.
- `home.js`: si no hay sesión vuelve al login, muestra la bienvenida y cierra la sesión.
- `bbdd.js`: guarda y lee los usuarios en el `localStorage` (obtener, guardar, editar, ver y eliminar).
- `buscar_usuario.js`: filtra la tabla mientras se escribe.
- `usuarios.js`: dibuja la tabla, abre los modales de agregar, editar y ver, y elimina usuarios.
- `contacto.js`: guarda las consultas del formulario de contacto.

En `index.html` se cargan en ese orden (después del JavaScript de Bootstrap),
porque cada uno usa funciones de los anteriores.

## Otros archivos

- `estilos.css`: estilos propios del portfolio (se cargan después de Bootstrap).
- `imagenes/`: imágenes ilustrativas.

## Validaciones

- Todos los campos son obligatorios y no aceptan solo espacios.
- El mail tiene que tener formato de correo.
- El DNI tiene que tener 7 u 8 números.
- No se pueden repetir DNI ni mail.

## Alcance

Es una simulación escolar: usá datos ficticios. No hay servidor ni se envían
mails. Si borrás los datos del sitio, se borran los registros.
