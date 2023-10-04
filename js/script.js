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
        <div>${filteredmovies[i].title}</div>
        `
    }
    CONTAINER.innerHTML = HTMLContentToAppend
    
}
INPUT.addEventListener('input', () => {
    let inputtext = INPUT.value;
    for (let i = 0; i < movies.length; i++){
        if (inputtext == movies.title || inputtext == movies.tagline || inputtext == movies.overview){
            filteredmovies.push(movies[i])
        }
    }
    console.log(filteredmovies)
    
})