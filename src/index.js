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

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#weather-change");
  let windElement =  document.querySelector("#wind");
  let humidityElement =  document.querySelector("#humidity");
  let pressureElement =  document.querySelector("#pressure");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = response.data.wind.speed;
  humidityElement.innerHTML = response.data.main.humidity;
  pressureElement.innerHTML = Math.round(response.data.main.grnd_level);
}

let apiKey = "5804e20be54f5001e6423f04ed96492c";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Łódź&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);