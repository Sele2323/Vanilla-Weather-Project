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
function getForecast(coordinates) {
  let apiKey = "1dbf926d3b4417bf379db7043bec1047";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function displayTemperature(response) {
  let temperatureElement = (document.querySelector("#temperature").innerHTML =
    Math.round(response.data.main.temp));
  let cityElement = (document.querySelector("#h1-city").innerHTML =
    response.data.name);
  let descriptionElement = (document.querySelector("#description").innerHTML =
    response.data.weather[0].description);
  let humidityElement = (document.querySelector("#humidity").innerHTML =
    response.data.main.humidity);
  let windElement = (document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  ));
  timeElement = document.querySelector("#time").innerHTML = formatDate(
    response.data.dt + 1000
  );
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  celciusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  handleSubmit(city);
}

function handleSubmit(city) {
  let apiKey = "93deded4294438a23eae320afe21c38d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function displayFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
function displayCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celciusTemperature);

  let currentTemperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = convertToCelsius(currentTemperature);
  let temperatureInCelsius = ((currentTemperature - 32) * 5) / 9;
}

function displayForecast(response) {
  console.log(response.data);
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (day, index) {
    let weatherCondition = day.weather[0].icon;

    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
       <div class="weather-forecast-date">
      ${formatDay(day.dt)}</div>

        <img
          src= "http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png"
          width="36"
          alt=""
        
        />
        <div class="weather-forecast-temp">
          <span class="forecast-max">${Math.round(day.temp.max)}º</span>
          <span class="forecast-min">${Math.round(day.temp.min)}º</span>
        </div>
        </div
      </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

let celciusTemperature = null;
let form = document.querySelector("#weather-form");
form.addEventListener("submit", handleSubmit);

let searchButton = document.querySelector("#btn-search");
searchButton.addEventListener("click", searchCity);

let fahrenheitElement = document.querySelector("#fahrenheit");
fahrenheitElement.addEventListener("click", displayFahrenheit);

let celciusElement = document.querySelector("#celcius-link");
celciusElement.addEventListener("click", displayCelcius);

handleSubmit("New York");
