function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    let hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    let minutes = `0${minutes}`;
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
