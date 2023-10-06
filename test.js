const url = "https://api.open-meteo.com/v1/forecast?latitude=30.2672&longitude=-97.7431&hourly=temperature_2m&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FChicago&forecast_days=1";

function formateDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = '00';
  
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

fetch(url).then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // This parses the response body as JSON
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
}).catch(error => {
    console.error("There was a problem", error);
});