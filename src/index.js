let now = new Date();
let dayTime = document.querySelector("#day-time");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
minutes = minutes > 9 ? minutes : "0" + minutes;

dayTime.innerHTML = `${day}   ${hours}:${minutes}`;

function fToC(celcius) {
  let temperature = document.querySelector(".current-temp");
  temperature.innerHTML = "17 ";
}

function cToF(fahrenheit) {
  let temperature = document.querySelector(".current-temp");
  temperature.innerHTML = "72 ";
}

let toCelcius = document.querySelector("#celcius-link");
toCelcius.addEventListener("click", fToC);

let toFahrenheit = document.querySelector("#fahrenheit-link");
toFahrenheit.addEventListener("click", cToF);

let form = document.querySelector("#search-form");

function weatherInfo(response) {
  console.log(response.data);
  let description = document.querySelector(`.condition`);
  description.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector(`.humidity`);
  humidity.innerHTML = `${response.data.main.humidity}%`;
  let wind = document.querySelector(`.wind-speed`);
  wind.innerHTML = `${response.data.wind.speed} mph`;
  let feels = document.querySelector(".feels-like");
  feels.innerHTML = `${Math.round(response.data.main.feels_like)}°F`;
  let high = document.querySelector(".high");
  high.innerHTML = `${Math.round(response.data.main.temp_max)}°`;
  let low = document.querySelector(".low");
  low.innerHTML = `${Math.round(response.data.main.temp_min)}°`;
  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute =
    ("src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

function updateCityTemp(response) {
  let cityName = response.data.name;
  let cityTemp = Math.round(response.data.main.temp);

  let enterCity = document.querySelector("#city");
  enterCity.innerHTML = cityName;
  let enterTemp = document.querySelector(".current-temp");
  enterTemp.innerHTML = cityTemp;
  weatherInfo(response);
}

function citySearch(city) {
  let apiKey = "57b463acac326f9d3b29b49c1092e284";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(updateCityTemp);
}

function submitForm(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city").value;
  citySearch(city);
}

form.addEventListener("submit", submitForm);

let currentCityButton = document.querySelector("#current-city-button");

function locateCityTemp(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "57b463acac326f9d3b29b49c1092e284";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(updateCityTemp);
}

function locateCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(locateCityTemp);
}

currentCityButton.addEventListener("click", locateCity);

citySearch("New York City");
