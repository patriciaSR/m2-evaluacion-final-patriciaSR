# m2-Evaluación Final Patricia Suárez Rodríguez
![](_src/assets/images/header.png)

## Buscador de series interactivo usando JavaScript, SCSS y HTML5,

Para trabajar usamos el starter kit de Adalab para utilizar gulp como automatizador de tareas: [https://github.com/Adalab/Adalab-web-starter-kit](https://github.com/Adalab/Adalab-web-starter-kit)

El ejercicio consiste en desarrollar una aplicación web de búsqueda de series de TV, donde
demostraremos los conocimientos de JavaScript adquiridos durante el módulo. El ejercicio también
tiene una parte de maquetación con HTML y SCSS.

### 1. Búsqueda
Al hacer clic sobre el botón de 'Buscar', nuestra aplicación debe conectarse al API abierto de
TVMaze para búsqueda de series. Por cada show contenido en el resultado de búsqueda debemos pintar una tarjeta donde mostramos una imagen de la serie y el título.

Algunas de las series que obtenemos en los resultados no tienen imagen. En ese caso debemos
mostrar una imagen de relleno.

### 2. Favoritos
Una vez aparecen los resultados de búsqueda, podremos indicar cuáles son nuestras series
favoritas. Para ello, al hacer clic sobre un resultado el color de fondo y el de fuente se
intercambian.

Además, debes crear un listado (array) con las series favoritas que almacenamos en una variable.
Este listado lo mostraremos en la parte izquierda de la pantalla, debajo del formulario de búqueda.

Para terminar, si volvemos a realizar una nueva búsqueda, los favoritos se irán acumulando en
nuestra lista.

### 3. Almacenamiento local
Vamos a almacenar el listado de favoritos en el localStorage. De esta forma, al recargar la página
el listado de favoritos se mantiene.

### 4. BONUS: Afinar la maquetación

### 5. BONUS: Borrar favoritos
Como bonus, os proponemos la opción de borrar favoritos. De esta forma, al hacer clic sobre el
icono de la 'x' al lado de los favoritos, podremos borrarlos (de nuestra lista y del localStorage).
