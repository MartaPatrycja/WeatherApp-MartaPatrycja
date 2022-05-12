let now = new Date();
let currentDate = document.querySelector("#year-top");
let currentTime = document.querySelector("#hour-top");
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let month = months[now.getMonth()];
currentDate.innerHTML = `${date} ${month} ${day} ${year}`;
currentTime.innerHTML = `${hours}:${minutes}`;

function showTemperature(response) {
  let Temp = Math.round(response.data.main.temp);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#country").innerHTML = response.data.sys.country;
  document.querySelector("#temperature").innerHTML = `${Temp}°C`;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#pressure").innerHTML = Math.round(
    response.data.main.grnd_level
  );

  document.querySelector("#weather-change").innerHTML =
    response.data.weather[0].main;
}

function tempC(response) {
  response.preventDefault();
  let tempCelsius = document.querySelector("#temperature");
  tempCelsius.innerHTML = "celsius";
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", tempC);

function tempF(response) {
  response.preventDefault();
  let tempFahrenheit = document.querySelector("#temperature");
  tempFahrenheit.innerHTML = "fahrehneit";
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", tempF);

function searchCity(city) {
  let units = "metric";
  let apiKey = "5804e20be54f5001e6423f04ed96492c";
  let apiUrlStart = "https://api.openweathermap.org/data/2.5/weather?q=";
  let apiUrl = `${apiUrlStart}${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function submit(event) {
  event.preventDefault();
  let city = document.querySelector("#form-city-text").value;
  searchCity(city);
}

function searchCurrentLocation(position) {
  let units = "metric";
  let apiKey = "5804e20be54f5001e6423f04ed96492c";
  let apiUrlStart = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiUrlStart}lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

let searchForm = document.querySelector("#form-city-button");
searchForm.addEventListener("submit", submit);

let currentLocationButton = document.querySelector("#current-city-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Łódź");
