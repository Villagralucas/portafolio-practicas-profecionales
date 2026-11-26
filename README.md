# Portfolio personal — Prácticas Profesionalizantes

Página hecha con HTML, CSS y JavaScript, sin frameworks.

## Cómo abrirlo

Abrí la carpeta en Visual Studio Code, hacé clic derecho en `index.html` y elegí
**Open with Live Server**. Los datos se guardan en el `localStorage` del
navegador, así que conviene usar siempre la misma dirección y el mismo navegador.

## Páginas

- `index.html`: presentación, acerca de mí, proyectos en acordeón y formulario de contacto.
- `usuarios.html`: alta de usuarios con ID automático y tabla de usuarios registrados.
- `login.html`, `registro.html`, `admin.html`: versión anterior con login de administrador de prueba (usuario `admin`, contraseña `1234`).
- `proyectos/harro/`: página de la hamburguesería Harro Burger House.

## Archivos

- `estilos.css`: estilos de todo el portfolio.
- `contacto.js`: guarda las consultas del formulario de contacto.
- `usuarios.js`: registro de usuarios, validaciones, tabla y sesión de prueba.
- `imagenes/`: imágenes ilustrativas.

## Validaciones

- Todos los campos son obligatorios y no aceptan solo espacios.
- El mail tiene que tener formato de correo.
- El DNI tiene que tener 7 u 8 números.
- No se pueden repetir DNI ni mail.

## Alcance

Es una simulación escolar: usá datos ficticios. No hay servidor ni se envían
mails. Si borrás los datos del sitio, se borran los registros.
