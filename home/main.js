//URL
const apiurl = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3d2789cfd578349ed024463edbf7aa61';
const imageUrl = 'https://image.tmdb.org/t/p/w500'; 
const searchUrl = 'https://api.themoviedb.org/3/search/movie?api_key=3d2789cfd578349ed024463edbf7aa61&query=';
let movies  = []; 


//Selecting elements from the DOM
const main = document.getElementById("main"); 
const form = document.getElementById("form"); 
const search = document.getElementById("search"); 


//Popular movies
//showMovies(apiurl); 
function showMovies(url){
    fetch(url)
    .then (response => response.json())
    .then (function(data){
        console.log(data.results); 
        data.results.forEach(element => {
            const el = document.createElement('div'); 
            const image = document.createElement('img'); 
            const text = document.createElement('h2'); 
            movies.push(element)

           
            text.innerHTML = `${element.title}`; 
            image.src = imageUrl + element.poster_path; 
            main.appendChild(el); 
            el.appendChild(image); 
            el.appendChild(text); 
            el.setAttribute("id",element.id);
            image.setAttribute("class", "triggerMovie");

        });
    }).catch(error => {
        console.log(error);
    })
}

function getMovies(url){
    let movies = []
    fetch(url)
    .then (response => response.json())
    .then (function(data){
        console.log(data.results); 
        data.results.forEach(element => {
            // const el = document.createElement('div'); 
            // const image = document.createElement('img'); 
            // const text = document.createElement('h2'); 
            movies.push(element)

           
            // text.innerHTML = `${element.title}`; 
            // image.src = imageUrl + element.poster_path; 
            // main.appendChild(el); 
            // el.appendChild(image); 
            // el.appendChild(text); 
            // el.setAttribute("id",element.id);
            // image.setAttribute("class", "triggerMovie");

        });

    }).catch(error => {
        console.log(error);
    })
    return movies
}

//
const fetchDetailMovie = (id) => {
    let details = ""
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=3d2789cfd578349ed024463edbf7aa61`)
    .then(response => response.json()
    .then(dataDetails => {
        return response
        //return dataDetails
        details=dataDetails
       //console.log(dataDetails)
    })).catch(error => {
        console.log(error)
    })
    return details
}

$(document).ready(function(){
    
    $(".triggerMovie").on("click",function(){
        let movieId = $(this).attr("id");
        fetchDetailMovie(movieId);
    })
})

// fetchDetailMovie()

//Search box
form.addEventListener("submit", (e) => {
    e.preventDefault(); 
    main.innerHTML = ''; 

    const searchTerm = search.value; 

    if (searchTerm) {
        showMovies(searchUrl + searchTerm); 
        search.value = ""; 
    }
}); 

