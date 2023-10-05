

const INFOBTN = document.getElementById('infoBtn');
const ADDITIONALINFO = document.getElementById('additionalInfo');
const MOVIEDETAILS = document.getElementById('movieDetails'); // Nuevo elemento para mostrar los detalles de la película

let menuVisible = false;


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
});

function showMovies(){
    let HTMLContentToAppend = '';
    for (let i = 0; i < filteredmovies.length; i++){
        HTMLContentToAppend += `
        <div class="peliContainer">
            <div class="peliInfo">
                <div class="peliTitle">${filteredmovies[i].title}</div>
                <div class="peliTagline">${filteredmovies[i].tagline}</div>
            </div>
            <div>${filteredmovies[i].vote_average}</div>
        </div>
        `;
    }
    CONTAINER.innerHTML = HTMLContentToAppend;
    
    // Agregar eventos clic a las películas después de mostrarlas
    addClickEventToMovies();
}

SEARCHBTN.addEventListener('click', () => {
    filteredmovies = [];
    let inputText = INPUT.value.toLowerCase();
    for (let i = 0; i < movies.length; i++) {
        if (movies[i].title.toLowerCase().includes(inputText) || movies[i].tagline.toLowerCase().includes(inputText) || movies[i].overview.toLowerCase().includes(inputText)) {
            filteredmovies.push(movies[i]);
        }
    }
    showMovies();
});

// Función para mostrar la información adicional de la película
function showAdditionalInfo(movie) {
    const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
    const budget = movie.budget ? movie.budget.toLocaleString() : 'N/A';
    const revenue = movie.revenue ? movie.revenue.toLocaleString() : 'N/A';

    // Actualizar los elementos HTML con los valores correspondientes
    document.getElementById('releaseYear').textContent = releaseYear;
    document.getElementById('duration').textContent = movie.runtime || 'N/A';
    document.getElementById('budget').textContent = budget;
    document.getElementById('revenue').textContent = revenue;

    ADDITIONALINFO.style.display = 'block';
}

INFOBTN.addEventListener('click', () => {
    if (filteredmovies.length > 0) {
        showAdditionalInfo(filteredmovies[0]);
    }
});

// Función para mostrar la información detallada de la película
function showMovieDetails(movie) {
    // Obtener elementos HTML para la información detallada
    const movieTitle = document.getElementById('movieTitle');
    const movieOverview = document.getElementById('movieOverview');
    const movieGenres = document.getElementById('movieGenres');

    // Actualizar el contenido con la información de la película seleccionada
    movieTitle.textContent = movie.title;
    movieOverview.textContent = `Descripción general: ${movie.overview}`;
    
    // Construir una lista de géneros
    const genresList = movie.genres.join(', ');

    movieGenres.textContent = `Géneros: ${genresList}`;
    
    // Mostrar el contenedor de información detallada
    MOVIEDETAILS.style.display = 'block';
}

// Agregar un evento clic para cada película en la lista
function addClickEventToMovies() {
    const movieContainers = document.querySelectorAll('.peliContainer');
    movieContainers.forEach((container, index) => {
        container.addEventListener('click', () => {
            if (filteredmovies.length > index) {
                showMovieDetails(filteredmovies[index]);
            }
        });
    });
}

INFOBTN.addEventListener('click', () => {
    if (menuVisible) {
        // Si el menú está visible, ocúltalo
        ADDITIONALINFO.style.display = 'none';
    } else {
        // Si el menú no está visible, muéstralo
        ADDITIONALINFO.style.display = 'block';
    }
    
    // Invierte el estado del menú
    menuVisible = !menuVisible;
});