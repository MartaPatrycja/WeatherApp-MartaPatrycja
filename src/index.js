let now = new Date();
let currentDate = document.querySelector("#year-top");
let currentTime = document.querySelector("#hour-top");
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
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

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let countryElement = document.querySelector("#country");
  let descriptionElement = document.querySelector("#weather-change");
  let windElement =  document.querySelector("#wind");
  let humidityElement =  document.querySelector("#humidity");
  let pressureElement =  document.querySelector("#pressure");
  let iconElement =  document.querySelector("#icon");

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  countryElement.innerHTML = response.data.sys.country;
  descriptionElement.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = response.data.wind.speed;
  humidityElement.innerHTML = response.data.main.humidity;
  pressureElement.innerHTML = Math.round(response.data.main.grnd_level);
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description)
}

let apiKey = "5804e20be54f5001e6423f04ed96492c";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Łódź&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);

function searchCity(city) {
let units = "metric";
let apiKey = "5804e20be54f5001e6423f04ed96492c";
let apiUrlStart = "https://api.openweathermap.org/data/2.5/weather?q=";
let apiUrl = `${apiUrlStart}${city}&appid=${apiKey}&units=${units}`;
  
axios.get(apiUrl).then(displayTemperature);
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
axios.get(apiUrl).then(displayTemperature);
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