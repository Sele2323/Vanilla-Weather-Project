function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    let hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let currentTemperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = convertToCelsius(currentTemperature);
  let temperatureInCelsius = ((currentTemperature - 32) * 5) / 9;
  temperatureElement.innerHTML = Math.round(temperatureInCelsius);
}

function convertToCelsius(temperature) {
  return Math.round(temperature);
}

function convertToFahrenheit(temperature) {
  return Math.round((temperature * 9) / 5 + 32);
}
function displayFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let currentTemperature = temperatureElement.innerHTML;
  let temperatureInFahrenheit = convertToFahrenheit(currentTemperature);
  temperatureElement.innerHTML = temperatureInFahrenheit;
}

function handleSubmit(city) {
  let apiKey = "93deded4294438a23eae320afe21c38d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  handleSubmit(city);
}

function displayTemperature(response) {
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
  timeElement = document.querySelector("#time").innerHTML = formatDate(
    response.data.dt + 1000
  );
  let iconElement = document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
}

let form = document.querySelector("#weather-form");
form.addEventListener("submit", handleSubmit);

let searchButton = document.querySelector("#btn-search");
searchButton.addEventListener("click", searchCity);

let fahrenheitElement = document.querySelector("#fahrenheit");
fahrenheitElement.addEventListener("click", displayFahrenheit);

let temperatureDisplay = (document.querySelector("#temperature").innerHTML =
  fahrenheitElement);

let celciusElement = document.querySelector("#celcius-unit");
celciusElement.addEventListener("click", displayCelcius);
