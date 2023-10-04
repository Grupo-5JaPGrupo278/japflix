const MOVIES_URL = 'https://japceibal.github.io/japflix_api/movies-data.json';
const INPUT = document.getElementById('textArea');
const CONTAINER = document.getElementById('itemContainer');

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
        <div>
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