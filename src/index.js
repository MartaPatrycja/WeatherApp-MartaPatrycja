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

 function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
    return days[day];
  }

  function formatHour(timestamp) {
    let now = new Date(timestamp * 1000);
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let hour = `${hours}:${minutes}`;

    if (hours < 10) {
      hours = `0${hours}`;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    return hour[hours, minutes];

  }
  

function getForecast(coordinates) {
  let apiKey = "5804e20be54f5001e6423f04ed96492c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayHourlyForecast);
  axios.get(apiUrl).then(displayDailyForecast);
  
}
     

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let countryElement = document.querySelector("#country");
  let descriptionElement = document.querySelector("#weather-change");
  let windElement =  document.querySelector("#wind");
  let humidityElement =  document.querySelector("#humidity");
  let pressureElement =  document.querySelector("#pressure");
  let iconElement =  document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  countryElement.innerHTML = response.data.sys.country;
  descriptionElement.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = response.data.wind.speed;
  humidityElement.innerHTML = response.data.main.humidity;
  pressureElement.innerHTML = Math.round(response.data.main.grnd_level);
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);

  

  getForecast(response.data.coord);

 
}
  
  function displayHourlyForecast(response) {
    console.log(response.data.hourly);
    let forecast = response.data.hourly;
    let hourlyElement = document.querySelector("#forecast-hourly");
    
  
    let hourlyForecastHTML = `<div class="row">`;
    forecast.forEach(function (forecastHour, index) {
      if (index < 6) {
      
      hourlyForecastHTML =
      hourlyForecastHTML +
        `
        <div class="col">
        <div class="card-body-hourly">
          <h5 class="card-title-hourly">${formatHour(forecastHour.dt)}</h5>
          <h6 class="temperatures-hourly"><span class="forecast-temperature-max">${Math.round(forecastHour.temp.max)}°</span> <span class="forecast-temperature-min">${Math.round(forecastHour.temp.min)}°</span></h6>
          <img
            src="http://openweathermap.org/img/wn/${forecastHour.weather[0].icon}@2x.png"
            class="img-weather"
            alt="cloudy"
          />
    
      </div>
       </div>`;
      }
    });
        
          hourlyForecastHTML = hourlyForecastHTML + `</div>`;
          hourlyElement.innerHTML = hourlyForecastHTML;
        }
  
  function displayDailyForecast(response) {
    let forecast = response.data.daily;
    let dailyElement = document.querySelector("#forecast-daily");
  
    let dailyForecastHTML = `<div class="row">`;
    forecast.forEach(function (forecastDay, index) {
      if (index < 6) {
      dailyForecastHTML =
      dailyForecastHTML +
        `
        <div class="col">
        <div class="card-body-daily">
          <h5 class="card-title-daily">${formatDay(forecastDay.dt)}</h5>
          <h6 class="temperatures-daily"><span class="forecast-temperature-max">${Math.round(forecastDay.temp.max)}°</span> <span class="forecast-temperature-min">${Math.round(forecastDay.temp.min)}°</span></h6>
          <img
            src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
            class="img-weather"
            alt="cloudy"
          />
    
      </div>
       </div>`;
      }
    });
        
          dailyForecastHTML = dailyForecastHTML + `</div>`;
          dailyElement.innerHTML = dailyForecastHTML;
          
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

  