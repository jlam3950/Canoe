let flightHTML = document.querySelector("#flight-data");
// const newFlightBtn = document.getElementById("track-flight-button");

const getFlights = async (airportCode = 'ATL' ) => {
    const apiUrl = `https://airlabs.co/api/v9/flights?dep_iata=${airportCode}&api_key=83895248-1266-4387-aa73-ae0326da34d8`;
   
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    // console.log(data)
    return data.response;
  } catch (error) {
    console.log(error);
  }
}

const getFlightLocation = async (flightNum) => {
 
    const apiUrl = `https://airlabs.co/api/v9/flights?flight_number=${flightNum}&api_key=83895248-1266-4387-aa73-ae0326da34d8`;
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    console.log(data);
    return data.response;
  } catch (error) {
    console.log(error);
  }
};
getFlightLocation()

const filterAirport = async () => {
        flightHTML.innerHTML = ''
        const flightInfo = document.getElementById("flight").value.toUpperCase();
    // const flightDate = document.getElementById("date").value
    // const flightTime = document.getElementById('time').value
        // flightInfo = 'MIA'
        let airportName = await getFlights(flightInfo);
        console.log(airportName)
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
          Flight    ${airportData[i].airline_iata}   <a href="#" class="flights">${airportData[i].flight_number}</a><br>
          Departure ${airportData[i].status}       ${airportData[i].dep_iata}<br>
          Arrival   ${airportData[i].speed}             ${airportData[i].arr_iata}
          </div>
          </div>
          
          
          
          `
        }
        const flightNums = [...document.querySelectorAll('.flights')]
          console.log(flightNums)
          flightNums.forEach((flight, index) => {
          flight.addEventListener('click', function(){
            const { lat, lng } = airportData[index]
            flightMap(lat, lng)
            console.log(lat, lng)
            
            // getFlightLocation(flight.innerHTML)
          })
          
        })
      }
      
  const map = L.map("map").setView([0, 0], 5);
  const Icon = L.icon({
    iconUrl: "mapplane.png",
    iconSize: [50, 32],
    iconAnchor: [25, 16],
  });

  const marker = L.marker([0, 0], { icon: Icon }).addTo(map);
  const flightMap = (lat, lng) => {
  
  marker.setLatLng([lat, lng]);
  const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  const tiles = L.tileLayer(tileUrl, { attribution })
  tiles.addTo(map)
  

}