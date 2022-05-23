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

  displayDailyForecast();
  displayHourlyForecast();
}
  
  function displayHourlyForecast() {
    let hourlyElement = document.querySelector("#forecast-hourly");
    
    let hour = ["15:00", "16:00", "17:00", "18:00", "19:00"];
  
    let hourlyForecastHTML = `<div class="row">`;
    hour.forEach(function (hours) {
      console.log("dsf");
      hourlyForecastHTML =
      hourlyForecastHTML +
        `
        <div class="col">
        <div class="card-body-hourly">
          <h5 class="card-title-hourly">${hours}</h5>
          <h6 class="temperatures-hourly"><span class="forecast-temperature-max">19° </span><span class="forecast-temperature-min"> 10°</span></h6>
          <img
            src="vector-images/Cloudy_Outline.svg"
            class="img-weather"
            alt="cloudy"
          />
    
      </div>
       </div>`;
    });
        
          hourlyForecastHTML = hourlyForecastHTML + `</div>`;
          hourlyElement.innerHTML = hourlyForecastHTML;
        }
  
  function displayDailyForecast() {
    let dailyElement = document.querySelector("#forecast-daily");
  
    let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  
    let dailyForecastHTML = `<div class="row">`;
    days.forEach(function (day) {
      console.log("dsf");
      dailyForecastHTML =
      dailyForecastHTML +
        `
        <div class="col">
        <div class="card-body-daily">
          <h5 class="card-title-daily">${day}</h5>
          <h6 class="temperatures-daily"><span class="forecast-temperature-max">19° </span><span class="forecast-temperature-min"> 10°</span></h6>
          <img
            src="vector-images/Cloudy_Outline.svg"
            class="img-weather"
            alt="cloudy"
          />
    
      </div>
       </div>`;
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
  
  function displayFahrenheitTemperature(event) {
    event.preventDefault();
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    let  temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  }

  function displayCelsiusTemperature(event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let  temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
  }

  let fahrenheitLink = document.querySelector("#fahrenheit");
  fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

  let celsiusLink = document.querySelector("#celsius");
  celsiusLink.addEventListener("click", displayCelsiusTemperature);


  let celsiusTemperature = null;


  let searchForm = document.querySelector("#form-city-button");
  searchForm.addEventListener("submit", submit);
  
  let currentLocationButton = document.querySelector("#current-city-button");
  currentLocationButton.addEventListener("click", getCurrentLocation);
  
  searchCity("Łódź");

  