let searchFrom = document.querySelector('#searchFrom');
let searchTo = document.querySelector('#searchTo');
let depDate = document.querySelector('#departureDate');
let arrDate = document.querySelector('#arrivalDate');
let searchForm = document.querySelector('#airportForm');
let subBtn = document.querySelector('#submitBtn');
let resetBtn = document.querySelector('#resetBtn');
let displayFlightDiv = document.querySelector('#flightsContainer');


// document.addEventListener('DOMContentLoaded', () =>{
//     document.getElementById('addBtn').addEventListener('click', addFlight());
// });

subBtn.addEventListener('click', function(){
    loadFlightData();
});

resetBtn.addEventListener('click', function(){
    searchForm.reset();
});

const loadFlightData = async() =>{
   let key = await sendKeys();

   try { const url = `https://tequila-api.kiwi.com/v2/search?fly_from=${searchFrom.value}&fly_to=${searchTo.value}&dateFrom=${depDate.value}&dateTo=${arrDate.value}`;
    const response = await fetch( url, {
        method: 'GET', 
        headers: {
        'apikey': key.tequilaKey,
                }
    })
    const data = await response.json();
    console.log(data.data);
    limitResults(data.data);
    }catch(error){
        console.log(error);
    }
};

const limitResults = (flightData) => {
    let flightArr = [];
    for (let i = 0; i < 10; i++){
        flightArr[i] = flightData[i]
    }
    renderFlightData(flightArr);
    // addFlight();
}

const renderFlightData = (arr) =>{
    arr.forEach((flight) => {
        displayFlightDiv.innerHTML +=
            `<div class = 'flightCard'>
            <h3>${flight.airlines}<h3>
            <div>From:${flight.flyFrom}</div>
            <div>To:${flight.flyTo}</div>
            <div>Departs:${(flight.local_departure).slice(11,16)}</div>
            <div>Arrives:${(flight.local_arrival).slice(11,16)}</div>
            <div>Price:${flight.price}
            <div>Duration:${(flight.duration.departure)/60}
            <br>
            <button class = 'addBtn' >Add To Favorites</button>
            </div>`
    })
    addClickEvent();
    console.log(arr);
}

const addClickEvent = () =>{
    
    const allAddButtons = Array.from(document.getElementsByClassName('addBtn')); //look up .from array method 

    allAddButtons.forEach(addButton=>{
        addButton.addEventListener('click', function handleClick(e){
            console.log(e.target);
        })
    })

    console.log(allAddButtons)
}

const saveFlight = (arr) =>{
    let favoritedFlights = [];
    console.log('hi')
   }
// const addFlight = (e) => {
//     e.preventDefault();
//     console.log(flight.price);
// }  
// document.getElementById('addBtn').addEventListener('click', addFlight);

