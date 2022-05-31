// const { format } = require("express/lib/response"); ?
const searchFrom = document.querySelector('#searchFrom');
const searchTo = document.querySelector('#searchTo');
const depDate = document.querySelector('#departureDate');
const arrDate = document.querySelector('#arrivalDate');
const searchForm = document.querySelector('#airportForm');
const subBtn = document.querySelector('#submitBtn');
const resetBtn = document.querySelector('#resetBtn');
const displayFlightDiv = document.querySelector('#flightsContainer');
const errorMsg = document.querySelector('.errorMsg');
const loader = document.querySelector('.spinner');
const flightIdeas = document.querySelector('#travelIdeas');


subBtn.addEventListener('click', function(){
    checkForm();
    loadFlightData();
});

resetBtn.addEventListener('click', function(){
    searchForm.reset();
    flightIdeas.style.visibility = 'visible';
    displayFlightDiv.innerHTML = '';
    searchFrom.value = '';
    searchTo.value = '';
    depDate.value = '';
    arrDate.value = '';
});

const checkForm = () => {
    var letters = /^[A-Za-z]+$/;
    var numbers = /^[0-9/\\]*$/;
    
    if(letters.test(searchFrom.value) && letters.test(searchTo.value) 
        && numbers.test(depDate.value) && numbers.test(arrDate.value)){ 
        loading();
        return true;

    } else{
        displayMsg();
    }
}

function displayMsg(){
    errorMsg.innerHTML = 'Please, enter letters for airport code field and numbers for date field.'
    setTimeout(clearMsg => {
        errorMsg.innerHTML = '';
    }, 3500);
}

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
    limitResults(data.data);
    complete();
    }catch(error){
        console.log(error);
    }
};

const limitResults = (flightData) => {
    let flightArr = [];
    for (let i = 0; i < 10; i++){
        flightArr[i] = flightData[i]
    }
    console.log(flightArr);
    renderFlightData(flightArr);
}

const renderFlightData = (arr) =>{
    arr.forEach((flight) => {
        displayFlightDiv.innerHTML +=
            `<div class = 'flightCard'>
                <div class = 'col'>
                     <img class = 'airlineLogo' src= "static/airlineLogos/${flight.airlines[0]}.png">
                </div>
             <div class = 'col'>
                   From:${flight.cityFrom}
                     <br>
                   To:${flight.cityTo}
            </div>
            <div class = 'col'> 
                Departs:${(flight.local_departure).slice(11,16)} 
                Arrives:${(flight.local_arrival).slice(11,16)} 
              </div>
            <div class = 'col'>
                Flight:${flight.route[0].flight_no}
                Price:$${flight.price}
            </div>
            <div class = 'col'>
                 <button class = 'saveFlightBtn' >Save Flight</button>
             </div>
        </div>`

    })
    const saveFlightBtns = [...document.querySelectorAll('.saveFlightBtn')]
    saveFlightBtns.forEach((flightBtn, flightIndex) => {
      flightBtn.addEventListener('click', function(){

        // console.log(arr[flightIndex])
        changeBtnColor(flightBtn);
      })
    })

    const changeBtnColor = (button) => {
        button.innerHTML = ''
        button.style.backgroundColor = 'red';
        button.innerHTML = 'Saved!'
    }
}

loader.hidden = true;

function loading(){
    flightIdeas.style.visibility = 'hidden';
    loader.hidden=false;
}

function complete(){
    loader.hidden=true;
}