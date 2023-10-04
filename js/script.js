const MOVIES_URL = 'https://japceibal.github.io/japflix_api/movies-data.json';
const INPUT = document.getElementById('textArea');
const CONTAINER = document.getElementById('itemContainer');
const MOVIE_BOX = document.getElementsByClassName('peliContainer');
const INFO_CONTAINER = document.getElementById('infoContainer');
const TITLE_CONTAINER = document.getElementById('titleContainer');
const CLOSINGBTN = document.getElementById('closingbtn');
const DESCRIPTION = document.getElementById('descriptionContainer');
const GENRES = document.getElementById('genrecontainer');

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
            <div>
                <div>${filteredmovies[i].title}</div><div>${filteredmovies[i].vote_average}</div>
            </div>
            <div>${filteredmovies[i].tagline}</div>
        </div>
        `
    }
    // : title, tagline, y vote_average
    CONTAINER.innerHTML = HTMLContentToAppend
    
}
INPUT.addEventListener('input', () => {
    filteredmovies = [];
    let inputtext = INPUT.value;
    for (let i = 0; i < movies.length; i++){
        if (inputtext == movies.title || inputtext == movies.tagline || inputtext == movies.overview){
            filteredmovies.push(movies[i])
        }
    }
    console.log(filteredmovies)
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