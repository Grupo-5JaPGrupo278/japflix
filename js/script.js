const MOVIES_URL = "https://japceibal.github.io/japflix_api/movies-data.json";
const INPUT = document.getElementById("textArea");
const CONTAINER = document.getElementById("itemContainer");
const SEARCHBTN = document.getElementById("searchBtn");

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
document.addEventListener("DOMContentLoaded", e => {
	getMovies(MOVIES_URL).then(data => {
		movies = data;
		console.log(data);
	});
});
function showMovies() {
	let HTMLContentToAppend = "";

	for (let i = 0; i < filteredmovies.length; i++) {
		HTMLContentToAppend += `
        <div class="peliContainer">
            <div class="peliInfo">
                <div class="peliTitle">${filteredmovies[i].title}</div>
                <div class="peliTagline">${filteredmovies[i].tagline}</div>
            </div>
            <div>
            <span class="fa fa-star star"></span>
            <span class="fa fa-star star"></span>
            <span class="fa fa-star star"></span>
            <span class="fa fa-star star"></span>
            <span class="fa fa-star star"></span>
            <span class="fa fa-star star"></span>
            <span class="fa fa-star star"></span>
            <span class="fa fa-star star"></span>
            <span class="fa fa-star star"></span>
            </div>
        </div>
        `;
	}
	CONTAINER.innerHTML = HTMLContentToAppend;

	let pelis = document.getElementsByClassName("peliContainer");

	for (let i = 0; i < pelis.length; i++) {
		let star = pelis[i].getElementsByClassName("star");
		let rating = Math.round(filteredmovies[i].vote_average);
		for (let j = 0; j < rating; j++) {
			star[j].classList.add("checked");
		}
	}

	// : title, tagline, y vote_average

	//${filteredmovies[i].vote_average}
}
SEARCHBTN.addEventListener("click", () => {
	filteredmovies = [];
	let inputText = INPUT.value.toLowerCase(); // Convierte el texto a minúsculas para comparar de forma insensible a mayúsculas y minúsculas
	for (let i = 0; i < movies.length; i++) {
		if (
			movies[i].title.toLowerCase().includes(inputText) ||
			movies[i].tagline.toLowerCase().includes(inputText) ||
			movies[i].overview.toLowerCase().includes(inputText)
		) {
			filteredmovies.push(movies[i]);
		}
	}
	showMovies(); // Llama a la función para mostrar las películas filtradas
});
