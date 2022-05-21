
//load flight data 

// let searchFrom = document.querySelector('#searchFrom').value;
// let searchTo = document.querySelector('#searchTo').value;
// let depDate = document.querySelector('#departureDate').value;
// let arrDate = document.querySelector('#arrivalDate').value;
let displayFlightDiv = document.querySelector('#flightsContainer');

// searchBtn.addEventListener('click', function(){
//     loadFlightData();
// })

const loadFlightData = async() =>{
   try { const url = "https://tequila-api.kiwi.com/v2/search?fly_from=LGA&fly_to=MIA&dateFrom=01/06/2022&dateTo=02/06/2022"
   //`https://tequila-api.kiwi.com/v2/search?fly_from=${searchFrom}&fly_to=${searchTo}&dateFrom=${depDate}&dateTo=${arrDate}` <- will use once HTML is functional 
    const response = await fetch( url, {
        method: 'GET', 
        headers: {
        'apikey': 'zo882tX9KKDMHn9SM5MOE-1Raqm3Pn_E',
                }
    })
    console.log(response.ok) 
    const data = await response.json();
    //could trial destructuring. {flyFrom, flyTo, local_arrival, local_departure} = data; 
    console.log(data.data);
    simplifyData(data.data);
    }catch(error){
        console.log(error);
    }
};

const simplifyData = (flightData) => {
    let flightArr = [];
    // const flightData = {flyFrom, flyTo, local_arrival, local_departure};

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
            <h3>${flight.airlines}<h3>
            <div>From${flight.flyFrom}</div>
            <div>To${flight.flyTo}</div>
            <div>Departs${flight.local_departure}</div>
            <div>Arrives${flight.local_arrival}</div>`
    })
}

loadFlightData();

//userInput for Flights


