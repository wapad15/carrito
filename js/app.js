// variables
const carrito = document.getElementById("carrito");
const cursos = document.getElementById("lista-cursos");
const listaCursos = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

// eventliseners
cargarEventListeners();
function cargarEventListeners() {
  // se ejecuta cuando se precione el boton "agregar al carrito"
  cursos.addEventListener("click", comprarCurso);
  // cuando se le de click a eliminar curso del carrito
  carrito.addEventListener("click", eliminarCurso);

  // evento de cuando se preciona el boton vaciar carrito
  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);

  //al cargar el  DOM , cargar los datos del LS y  pintarlos en el carrito de compras
  document.addEventListener("DOMContentLoaded", leerLocalStorage);
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
  guardarCursoLocalStorage(curso);
}

//funcion para eliminar el curso del carrito
function eliminarCurso(e) {
  e.preventDefault();
  let curso, cursoId;
  if (e.target.classList.contains("borrar-curso")) {
    e.target.parentElement.parentElement.remove();
    curso = e.target.parentElement.parentElement;
    cursoId = curso.querySelector("a").getAttribute("data-id");
  }
  eliminarCursoLS(cursoId);
}

//elimina los cursos del carrito en el dom
function vaciarCarrito() {
  // forma lenta y con menos codigo
  //listaCursos.innerHTML = '';

  //forma rapida pero con mas codigo y recomendada
  // si existe algun curso lo elimina uno por uno
  while (listaCursos.firstChild) {
    //metodo para eliminar un hijo al cual se le pasa el primer hijo por parametro
    listaCursos.removeChild(listaCursos.firstChild);
  }
  //vaciar local storage
  VaciarLS();
  // return false para evitar errores como el de algn brinco
  return false;
}
//alamacena el curso que se le pase a local storage
function guardarCursoLocalStorage(curso) {
  let cursos;
  // rellena la variable cursos con los valores del LS
  cursos = obetenerCursosLocalStoage();
  // el curso seleccionado se agrega al arreglo
  cursos.push(curso);
  // agregamos cursos al LS
  localStorage.setItem("cursos", JSON.stringify(cursos));
}

function obetenerCursosLocalStoage() {
  let cursosLS;

  //comprobamos si hay algun curso el local storage
  if (localStorage.getItem("cursos") === null) {
    cursosLS = [];
  } else {
    cursosLS = JSON.parse(localStorage.getItem("cursos"));
  }

  return cursosLS;
}

// funcion que carga los datos de local storage  y los pinta en el carrito de compras
function leerLocalStorage() {
  let cursosLS;
  cursosLS = obetenerCursosLocalStoage();

  cursosLS.forEach(function(curso) {
    //construir el temprate para pintarlo
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
  });
}

//elimina el curso por el id  en LS
function eliminarCursoLS(curso) {
  let cursosLS;
  // obtenemos los cursos que estan en LS
  cursosLS = obetenerCursosLocalStoage();
  // se itera los cursos del LS para comprar con id pasado por parametro
  cursosLS.forEach(function(cursoLS, index) {
    if (cursoLS.id === curso) {
      //se borra solo el curso encontrado y retorna un  arreglo sin el indice encontrado
      cursosLS.splice(index, 1);
    }
  });
  // se agrega el nuevo arreglo generado en la iteracion al ls
  localStorage.setItem("cursos", JSON.stringify(cursosLS));
}
//elimina todos los cursos del ls
function VaciarLS() {
  localStorage.clear();
}
