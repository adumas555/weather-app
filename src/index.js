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
  let high = document.querySelector(".high");
  let low = document.querySelector(".low");
  let feels = document.querySelector(".feels-like");
  toFahrenheit.classList.remove("active");
  toCelcius.classList.add("active");
  let celciusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  temperature.innerHTML = Math.round(celciusTemperature);
  let cHigh = ((highTemperature - 32) * 5) / 9;
  high.innerHTML = `${Math.round(cHigh)}°`;
  let cLow = ((lowTemperature - 32) * 5) / 9;
  low.innerHTML = `${Math.round(cLow)}°`;
  let cFeels = ((feelTemperature - 32) * 5) / 9;
  feels.innerHTML = `${Math.round(cFeels)}°`;
}

function cToF(fahrenheit) {
  let temperature = document.querySelector(".current-temp");
  let high = document.querySelector(".high");
  let low = document.querySelector(".low");
  let feels = document.querySelector(".feels-like");
  toCelcius.classList.remove("active");
  toFahrenheit.classList.add("active");
  temperature.innerHTML = Math.round(fahrenheitTemperature);
  high.innerHTML = `${Math.round(highTemperature)}°`;
  low.innerHTML = `${Math.round(lowTemperature)}°`;
  feels.innerHTML = `${Math.round(feelTemperature)}°`;
}

let fahrenheitTemperature = null;
let highTemperature = null;
let lowTemperature = null;
let feelTemperature = null;

let toCelcius = document.querySelector("#celcius-link");
toCelcius.addEventListener("click", fToC);

let toFahrenheit = document.querySelector("#fahrenheit-link");
toFahrenheit.addEventListener("click", cToF);

let form = document.querySelector("#search-form");

let losAngelesLink = document.querySelector(".hub1");

function losAngelesUpdate(event) {
  event.preventDefault();
  citySearch("Los Angeles");
}

losAngelesLink.addEventListener("click", losAngelesUpdate);

let londonLink = document.querySelector(".hub2");

function londonUpdate(event) {
  event.preventDefault();
  citySearch("London");
}

londonLink.addEventListener("click", londonUpdate);

let seoulLink = document.querySelector(".hub3");

function seoulUpdate(event) {
  event.preventDefault();
  citySearch("Seoul");
}

seoulLink.addEventListener("click", seoulUpdate);

let sydneyLink = document.querySelector(".hub4");

function sydneyUpdate(event) {
  event.preventDefault();
  citySearch("Sydney");
}

sydneyLink.addEventListener("click", sydneyUpdate);

function formatDate(timezone) {
  let d = new Date();
  let localTime = d.getTime();
  let localOffset = d.getTimezoneOffset() * 60000;
  let utc = localTime + localOffset;
  let nDate = new Date(utc + 1000 * timezone);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[nDate.getDay()];
  let hours = nDate.getHours();
  hours = hours > 9 ? hours : "0" + hours;
  let minutes = nDate.getMinutes();
  minutes = minutes > 9 ? minutes : "0" + minutes;

  return `${day} ${hours}:${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row row-col-5">`;
  let days = ["MON", "TUE", "WED", "THU", "FRI"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
            <div class="col" >
              <div class="forecast-day">${day}</div>
              <img src="http://openweathermap.org/img/wn/04d@2x.png"
              alt=""
              id="forecast-icon"
              width="60"
              />
              <div class="col"  class="forecast-temperatures">
              <span class="max-temp-1">66°</span>
              <span class="min-temp-1">61°</span>
              </div>
            </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function weatherInfo(response) {
  highTemperature = response.data.main.temp_max;
  lowTemperature = response.data.main.temp_min;
  feelTemperature = response.data.main.feels_like;
  let dayTime = document.querySelector("#day-time");
  dayTime.innerHTML = formatDate(response.data.timezone);
  let description = document.querySelector(`.condition`);
  description.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector(`.humidity`);
  humidity.innerHTML = `${response.data.main.humidity}%`;
  let wind = document.querySelector(`.wind-speed`);
  wind.innerHTML = `${response.data.wind.speed} mph`;
  let feels = document.querySelector(".feels-like");
  feels.innerHTML = `${Math.round(feelTemperature)}°`;
  let high = document.querySelector(".high");
  high.innerHTML = `${Math.round(highTemperature)}°`;
  let low = document.querySelector(".low");
  low.innerHTML = `${Math.round(lowTemperature)}°`;
  let iconElement = document.querySelector("#day-weather-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  displayForecast();
}

function updateCityTemp(response) {
  fahrenheitTemperature = response.data.main.temp;
  let cityName = response.data.name;
  let cityTemp = Math.round(fahrenheitTemperature);

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
