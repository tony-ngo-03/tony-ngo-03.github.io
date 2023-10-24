function formateDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = '00';
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function rain(rainArray, timeArray, index){
  let inner = "";
  for(let j = index; j < rainArray.length; j++){
    if(rainArray[j] > 0){
      inner += timeArray[j].substring(11) + " : " + String(parseFloat(rainArray[j]).toFixed(1) * 100) + "%, ";
    }
  }
  if(inner != ""){
    document.getElementById("rainHeader").innerHTML = "Chance of Rain:";
  }
  document.getElementById("rain").innerHTML = inner;
}

function getSuggestion(){

}

function getTemp(url){
    fetch(url).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
    })
    .then(data => {
        const now = new Date();
        timeArray = data.hourly.time;
        temperatureArray = data.hourly.temperature_2m;
        let unix = formateDate(now);
        indexInTime = timeArray.indexOf(unix);
        let currentTemperature = temperatureArray[indexInTime];
        let tempUnits = data.hourly_units.temperature_2m;
        document.getElementById("temperature").innerHTML = String(currentTemperature + " " + tempUnits);
        let rainArray = data.hourly.rain;
        rain(rainArray, timeArray, indexInTime);

        getSuggestion();
    }).catch(error => {
        console.error("There was a problem", error);
    });
}

function getUrl(latitude, longitude){
    let attemptedURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,precipitation,rain&hourly=temperature_2m,rain&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FChicago&forecast_days=1`;
    console.log(attemptedURL);
    return attemptedURL;
}





function getLatLong(city, state) {
    city = city.replace(/ /g, "+");
    state = state.replace(/ /g, "+");
    const geocodingURL = `https://geocode.maps.co/search?city=${city}&state=${state}`;
    return fetch(geocodingURL)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        let longitude = parseFloat(data[0].lon);
        let latitude = parseFloat(data[0].lat);
        return [latitude, longitude];
      })
      .catch(error => {
        console.error("There was a problem", error);
      });
  }
  

const cityForm = document.getElementById("cityForm");
cityForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const cityInput = document.getElementById("city");
  const cityText = cityInput.value.trim();
  const stateInput = document.getElementById("state");
  const stateText = stateInput.value.trim();
  getLatLong(cityText, stateText)
    .then(location => {
      const url = getUrl(location[0], location[1]);
      getTemp(url);
    })
    .catch(error => {
      console.error("There was a problem", error);
    });
});
