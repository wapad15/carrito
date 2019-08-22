// variables
const carrito = document.getElementById("carrito");
const cursos = document.getElementById("lista-cursos");
const listaCursos = document.querySelector("#lista-carrito tbody");
// eventliseners
cargarEventListeners();
function cargarEventListeners() {
  // se ejecuta cuando se precione el boton "agregar al carrito"
  cursos.addEventListener("click", comprarCurso);
}

//funciones
//funcion que  se ejecuta en realidad cuando el evento click en agregar carrito y añade el curso al carrito
function comprarCurso(e) {
  e.preventDefault();
  // delegacion para cuadno se agrega al carrito
  if (e.target.classList.contains("agregar-carrito")) {
    const curso = e.target.parentElement.parentElement;
    // enviamos los datos del curso al que se le dio click para tomar sus datos
    leerDatosCursos(curso);
  }
}
//funcion que leer los datos del curso  al que se le dio agregar al carrito
function leerDatosCursos(curso) {
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
  };

  insertarCarrito(infoCurso);
}

// muestra el curso seleccionado en el carrito (es decir lo inserta al boton carrito de compas)
function insertarCarrito(curso) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td> 
      <img src="${curso.imagen}" width =100 >
    </td>
    <td>${curso.titulo}</td>
    <td>${curso.precio}</td>
    <td>
        <a href ="#" class="borrar-curso" data-id="${curso.id}">X</a>
    </td>
  
  `;
  listaCursos.appendChild(row);
}
