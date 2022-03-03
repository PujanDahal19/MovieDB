
// To fetch Movie sorted by its popularity
const movieApi = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=f68d46bd44ceb4cd3622295c8371ba54&page=1";

// To fetch the searched movie
const searchApi = "https://api.themoviedb.org/3/search/movie?api_key=f68d46bd44ceb4cd3622295c8371ba54&query='";

// path to the image of the movie
const imagePath = "https://image.tmdb.org/t/p/w1280";

const form = document.querySelector(".form");
const search = document.querySelector('#search');
const container = document.querySelector('.container');

// GET MOVIES
getMovies(movieApi)

async function getMovies(api){
    const response = await fetch(api)
    const data = await response.json()

    showMovie(data.results)
    
}


// Back to Top

function backToTop(){
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
}



// SEARCH MOVIES
form.addEventListener('submit', e=>{
    e.preventDefault();

    const movieName = search.value;


    if(movieName && movieName !== ''){
        getMovies(searchApi + movieName);

        search.value = '';
    }else{
        window.location.reload;
    }
})


// SHOW MOVIES
function showMovie(movies){
    container.innerHTML = '';

    movies.forEach(movie=>{
        const movieImg = movie.poster_path;
        const movieTitle = movie.title;
        const movieRating = movie.vote_average;
        const movieOverview = movie.overview;

        const tagEl = document.createElement('div');
        tagEl.classList.add('content');

        tagEl.innerHTML = 
        `<img src=${imagePath + movieImg} alt=${movieTitle} class="image">
        <div class="title">
            <h2 class="movie-title">
                ${movieTitle}
            </h2>
            <p class="rating ${changeRatingColor(movieRating)}">
                ${movieRating}
            </p>
        </div>
        <div class="overview">
            <h2>Overview</h2>
            ${movieOverview}
        </div>`

        container.appendChild(tagEl);
        
    })
}

function changeRatingColor(rate){
    if(rate >= 8){
        return 'green';
    }else if(rate >= 5){
        return 'orange';
    }else{
        return 'red';
    }
}

const sectionTitle = document.querySelector('.headerTitle');

sectionTitle.addEventListener('click', ()=>{
    getMovies(movieApi);
})

// Pagination

const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const circles = document.querySelectorAll('.circle');

let number = 1;
let count = 1;
const movieApiPagination = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=f68d46bd44ceb4cd3622295c8371ba54&page=${count}`

nextBtn.addEventListener('click', ()=>{
    number++

    if(number > circles.length ){
        number = circles.length
    }

    update()

    
    count++
    getMovies(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=f68d46bd44ceb4cd3622295c8371ba54&page=${count}`)

    backToTop()
    
})

prevBtn.addEventListener('click', ()=>{
    number--

    if(number < 1){
        number = 1;
    }

    update()

    count--
    getMovies(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=f68d46bd44ceb4cd3622295c8371ba54&page=${count}`)
    backToTop()
})

function update(){
    circles.forEach((circle, index) =>{
        if(index < number){
            circle.classList.add('active');
        }else{
            circle.classList.remove('active');
        }
    })

    const actives = document.querySelectorAll('.active');
    console.log(actives)

    if(number === 1) {
        prevBtn.disabled = true
    } else if(number === circles.length) {
        nextBtn.disabled = true
    } else {
        prevBtn.disabled = false
        nextBtn.disabled = false
    }


};









