let flightHTML = document.querySelector("#flight-data");
let flightNumHTML = document.getElementById('flight-numbers')
// const newFlightBtn = document.getElementById("track-flight-button");

const getFlights = async (airportCode = 'ATL' ) => {
    const apiUrl = `https://airlabs.co/api/v9/flights?dep_iata=${airportCode}&api_key=01da7d2d-cba9-4540-8ec0-ce28b70f70c5`;
   
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
    const apiUrl = `https://airlabs.co/api/v9/flights?flight_iata=${flightNum}&api_key=01da7d2d-cba9-4540-8ec0-ce28b70f70c5`;
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    console.log(data);
    return data.response;
  } catch (error) {
    console.log(error);
  }
};

// const getFlightData = async () => {
//     const apiUrl = ``


// };

const showFlightNum = async () => {
  flightNumHTML.innerHTML = ''
  const flightStuff = flightNumHTML.value
  console.log(flightStuff)
  let airlineNumber = await getFlightLocation(flightStuff)
  console.log(airlineNumber)
  const { lat, lng } = airlineNumber[0]
      openModal(lat, lng)
}



const filterAirport = async () => {
  flightHTML.innerHTML = "";
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
  });
  // console.log(airportData)
  for (i = 0; i < 10; i++) {
    flightHTML.innerHTML += `

    <div class="col">
      <div class="card">
        <div class="card-body">
        
          <ul class="list-group list-group-flush">
            <li class="list-group-item-1">Flight Number: ${airportData[i].flight_iata}</li>
            <li class="list-group-item">Flight Status: ${airportData[i].status}</li>
            <li class="list-group-item">Speed: ${airportData[i].speed}</li>
          </ul>
      <div class="card-body">
       <a href="#" class="card-link flights">Flight Location</a>
      </div>
        </div>
      </div>
    </div>
  
    
    `;
  }
  const flightNums = [...document.querySelectorAll(".flights")];
  console.log(flightNums);
  flightNums.forEach((flight, index) => {
    flight.addEventListener("click", function () {
      const { lat, lng } = airportData[index];
      // flightMap(lat, lng);
      openModal(lat, lng); //may not need to use flightMap within openModal
    });
  });
};

const map = L.map("map");
// const map = L.map("map").setView([0, 0], 1);
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(map);

const Icon = L.icon({
  iconUrl: "./canoe_PNG27.png", //change to an actual canoe
  iconSize: [50, 20],
  iconAnchor: [25, 15],
});

const marker = L.marker([0, 0], { icon: Icon });

const flightMap = (lat, lng) => {
  map.setView([lat, lng], 8);
  marker.setLatLng([lat, lng]).addTo(map);
};

//modal
const modal = document.getElementById("mapmodal");
const closeBtn = document.getElementsByClassName("closeBtn")[0];

function openModal(lat, lng) {
  modal.style.display = "block";
  map.getSize(flightMap(lat, lng));
  flightMap(lat, lng);

}

function closeModal() {
  modal.style.display = "none";
}

function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
}

// modalBtn.addEventListener('click', openModal)
closeBtn.addEventListener("click", closeModal);
window.addEventListener("click", outsideClick);



