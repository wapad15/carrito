const car = document.querySelector('#carrito');
const courses = document.querySelector('#lista-cursos');
const listCourses = document.querySelector('#lista-carrito tbody');
const btnEmptyCar = document.querySelector('#vaciar-carrito');


function toPayCourse() {
    courses.addEventListener('click', e => {
        e.preventDefault();
        if (e.target.classList.contains('agregar-carrito')) {
            const course = e.target.parentElement.parentElement;
            readDataCourse(course);
        }
    });
}

function readDataCourse(course) {
    let infoCourse = {
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.precio span').textContent,
        id: course.querySelector('a').dataset.id
    };
    addToCar(infoCourse);
}

function addToCar(course) {
    addCourseItem(course);
    saveLocalStorage(course);
}

function addCourseItem(course) {
    const row = document.createElement('tr');
    row.innerHTML = `
        </td>
            <img src="${course.image}" width=100>
        </td>
        <td>${course.title}</td>
        <td>${course.price}</td>
        <td><a href="#" data-id="${course.id}" class="borrar-curso"> X</a></td>`;
    listCourses.appendChild(row);
}

function saveLocalStorage(course) {
    let courses = getCoursesLocalStorage();
    courses.push(course);
    localStorage.setItem('courses', JSON.stringify(courses));
}

function loadLocalStorage() {
    document.addEventListener('DOMContentLoaded', e => {
        let courses = getCoursesLocalStorage();
        courses.forEach(course => addCourseItem(course));
    });
}

function getCoursesLocalStorage() {
    let courses = [];
    const localstorage = localStorage.getItem('courses');
    if (localstorage)
        courses = JSON.parse(localstorage);
    return courses;
}

function deleteOfCar() {
    car.addEventListener('click', e => {
        if (e.target.classList.contains('borrar-curso')) {
            const row = e.target.parentElement.parentElement;
            row.remove();
            deleteCourseLocalStorage(row.querySelector('a').dataset.id);
        }
    });
}

function deleteCourseLocalStorage(course_id) {
    let courses = getCoursesLocalStorage();
    courses.forEach((course, index) => {
        if (course.id === course_id)
            courses.splice(index, 1);
    });
    localStorage.setItem('courses', JSON.stringify(courses));
}

function toEmptyCar() {
    btnEmptyCar.addEventListener('click', e => {
        while (listCourses.firstChild)
            listCourses.removeChild(listCourses.firstChild);
        localStorage.clear();
    });
}

function main() {
    toPayCourse();
    deleteOfCar();
    toEmptyCar();
    loadLocalStorage();
}

main();