const seatContainer = document.querySelector('.seatContainer'); 
const seats =  document.querySelectorAll('.row .seat:not(.occupied)');  

const count = document.getElementById('count'); 
const total = document.getElementById('total'); 
const movieSelect = document.getElementById('movie'); 

populateUI(); 

let ticketPrice = +movieSelect.value; 
console.log (typeof ticketPrice); 

//save selected movie index and price
function setMovieData (movieIndex, moviePrice) {
    localStorage.setItem('selectdMovieIndex',  (movieIndex));  
    localStorage.setItem('selectedMoviePrice', (moviePrice)); 
}


//function update total price and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected'); 
    
    //copy selected seat into an array
    //map through the array
    //return  a new array indexes
    const seatsIndex = [...selectedSeats].map((seat) => {
        return  [...seats].indexOf(seat)
    })

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));  

    const selectedSeatsCount = selectedSeats.length; 

    count.innerText = selectedSeatsCount;  
    total.innerText = selectedSeatsCount * ticketPrice; 
}

//get data from localstorage and populate the UI

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')); 
    
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected'); 
            }
        }); 
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex'); 

    if (selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex; 
    }
}


//Event Listener movie select event 
movieSelect .addEventListener('change', (events) => {
    ticketPrice  = +events.target.value;  
    setMovieData(events.target.selectedIndex, events.target.value);
    updateSelectedCount(); 
})


//seat click event
seatContainer .addEventListener ('click',(events) => {
    if (events.target.classList.contains('seat') && !events.target.classList.contains('occupied')){
        console.log(events.target)
        events.target.classList.toggle('selected'); 
        updateSelectedCount()
    }
})

updateSelectedCount(); 

