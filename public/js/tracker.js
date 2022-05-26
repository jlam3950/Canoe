let flightHTML = document.querySelector("#flight-data");
// const newFlightBtn = document.getElementById("track-flight-button");

const getFlights = async (airportCode = 'ATL' ) => {
  let key = await sendKeys()
    const apiUrl = `https://airlabs.co/api/v9/schedules?dep_iata=${airportCode}&api_key=${key.airLabKey}`;
   
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    console.log(data)
    return data.response;
  } catch (error) {
    console.log(error);
  }
}

const getFlightLocation = async (flightNum) => {
  let key = await sendKeys()
  console.log(flightNum)
    const apiUrl = `https://airlabs.co/api/v9/flights?api_key=${key.airLabKey}&dep_iata=IAH`;
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    console.log(data)
    // const {lat, lng} = data.response
    // marker.setLatLng([lat, lng])
    return data.response;
  } catch (error) {
    console.log(error);
  }
};

// const getFlightLonLat = async (lat, lng) => {
//   const apiUrl = `https://airlabs.co/api/v9/flights?lat=${lat},lng=${lng}&api_key=`;
//   try {
//     const res = await fetch(apiUrl);
//     const data = await res.json();
//     console.log(data)
//     // marker.setLatLng([lat, lng])
//     return data.response;
//   } catch (error) {
//     console.log(error);
//   }
// };

const filterAirport = async () => {
        flightHTML.innerHTML = ''
        const flightInfo = document.getElementById("flight").value.toUpperCase();
    // const flightDate = document.getElementById("date").value
    // const flightTime = document.getElementById('time').value
        // flightInfo = 'MIA'
        let airportName = await getFlights(flightInfo);
        // console.log(airportName)
        let airportData = airportName.filter((airport) => {
        // let departDate = airport
        // console.log(departDate)
            if (airport.dep_iata == flightInfo) {
                return airport;
            }
    })
        // console.log(airportData)
        for (i = 0; i < 9; i++) {
            flightHTML.innerHTML += 
        `
       
        <div class="flex-grid">
          <div class="col">
          Flight    ${airportData[i].airline_iata}   <a href="#" class="flights">${airportData[i].flight_icao}</a><br>
          Departure ${airportData[i].dep_time}       ${airportData[i].dep_iata}<br>
          Arrival   ${airportData[i].arr_time}             ${airportData[i].arr_iata}
          </div>
          </div>
          
          
          
          `
        }
        const flightNums = [...document.querySelectorAll('.flights')]
        flightNums.forEach(flight => {
          flight.addEventListener('click', function(){
            getFlightLocation(flight.innerHTML)
          })
        })
      }
      




const map = L.map("map").setView([0, 0], 1);
const marker = L.marker([0, 0]).addTo(map);
const attribution = 
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const tiles = L.tileLayer(tileUrl, { attribution })
  tiles.addTo(map)