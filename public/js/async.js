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


subBtn.addEventListener('click', function(){
    // e.preventDefault;
    checkForm();
    loadFlightData();
});

resetBtn.addEventListener('click', function(){
    searchForm.reset();
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
        && numbers.test(depDate.value) && numbers.test(arrDate.value)){ //can also use .match (e.g. searchFrom.value.match(letters))
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
    renderFlightData(flightArr);
}

const renderFlightData = (arr) =>{
    arr.forEach((flight) => {
      // console.log(flight)
        displayFlightDiv.innerHTML +=

           `<div class = 'flightCard'>
                <div class = 'col'>
                    <img class = 'airlineLogo' src= "static/airlineLogos/${flight.airlines[0]}.png">
                </div>
                <div class = 'col'>
                    <div class = 'row'>
                        From:${flight.flyFrom}
                    </div>
                    <div class = 'row'>
                        To:${flight.flyTo}
                    </div>
                </div>
                <div class = 'col'>
                    <div class = 'row'>
                        Departs:${(flight.local_departure).slice(11,16)} 
                        Arrives:${(flight.local_arrival).slice(11,16)} 
                    </div>
                </div>
                <div class = 'col'>
                    <div class = 'row'>
                        Price:$${flight.price}
                        Flight:${flight.route[0].flight_no}
                    </div>                        
                </div>
                 <button class = 'saveFlightBtn' >Save Flight</button>
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
    loader.hidden=false;
}

function complete(){
    loader.hidden=true;
}