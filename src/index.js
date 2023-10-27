function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = (document.querySelector("#temperature").innerHTML =
    Math.round(response.data.main.temp));
  let cityElement = (document.querySelector("#h1-city").innerHTML =
    response.data.name);
  let descritionElement = (document.querySelector("#description").innerHTML =
    response.data.weather[0].description);
  let humidityElement = (document.querySelector("#humidity").innerHTML =
    response.data.main.humidity);
  let windElement = (document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  ));
}

let apiKey = "93deded4294438a23eae320afe21c38d";

let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Maseru&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
