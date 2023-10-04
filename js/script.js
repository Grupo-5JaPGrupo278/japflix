const MOVIES_URL = 'https://japceibal.github.io/japflix_api/movies-data.json';
const INPUT = document.getElementById('textArea');
const CONTAINER = document.getElementById('itemContainer');
const MOVIE_BOX = document.getElementsByClassName('peliContainer');
const INFO_CONTAINER = document.getElementById('infoContainer');
const TITLE_CONTAINER = document.getElementById('titleContainer');
const CLOSINGBTN = document.getElementById('closingbtn');
const DESCRIPTION = document.getElementById('descriptionContainer');
const GENRES = document.getElementById('genrecontainer');
const SEARCHBTN = document.getElementById('searchBtn');

let movies = [];
let filteredmovies = [];
function getMovies(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .catch(err => {
            console.error("Error:", err);
            console.log("err");
        });
}
document.addEventListener('DOMContentLoaded', (e) => {
    getMovies(MOVIES_URL).then(data => {
        movies = data;
        console.log(data)
    })
})
function showMovies(){
    let HTMLContentToAppend = ''
    for (let i = 0; i < filteredmovies.length; i++){
        HTMLContentToAppend += `
        <div class="peliContainer" id="${filteredmovies[i].title}">
            <div class="peliInfo">
                <div class="peliTitle">${filteredmovies[i].title}</div>
                <div class="peliTagline">${filteredmovies[i].tagline}</div>
            </div>
            <div>${filteredmovies[i].vote_average}</div>
        </div>
        `
    }
    // : title, tagline, y vote_average
    CONTAINER.innerHTML = HTMLContentToAppend
    
}
SEARCHBTN.addEventListener('click', () => {
    filteredmovies = [];
    let inputText = INPUT.value.toLowerCase(); // Convierte el texto a minúsculas para comparar de forma insensible a mayúsculas y minúsculas
    for (let i = 0; i < movies.length; i++) {
        if (movies[i].title.toLowerCase().includes(inputText) || movies[i].tagline.toLowerCase().includes(inputText) || movies[i].overview.toLowerCase().includes(inputText)) {
            filteredmovies.push(movies[i]);
        }
    }
    console.log(filteredmovies)
    showMovies(); // Llama a la función para mostrar las películas filtradas
})

MOVIE_BOX.addEventListener('click', (e) => {
    INFO_CONTAINER.style.display = 'block';
    let blockid = e.target.id;
    for (let i = 0; i < filteredmovies.length; i++){
        if (blockid == filteredmovies[i].title){
            TITLE_CONTAINER.innerHTML = filteredmovies[i].title;
            DESCRIPTION.innerHTML = filteredmovies[i].overview;
            GENRES = filteredmovies[i].genres.forEach( genre => `${genre} -`)
        }
    }
})
CLOSINGBTN.addEventListener('click', () => {
    INFO_CONTAINER.style.display = 'none';
})
/*Cuando el usuario pulse en alguna de las películas mostradas, se deberá desplegar un contenedor superior con la siguiente información de dicha película: title, overview y lista de genres.*/
