function formatDate(date) {
  let hours = date.getHours();
  let minutes = String(date.getMinutes()).padStart(2, "0");

  let number = date.getDate();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
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
    "December",
  ];
  let month = months[date.getMonth()];

  return `${day}, ${number} ${month} ${hours}:${minutes}`;
}

function showTemperature(response) {
  console.log(response.data);
  let cityName = document.querySelector("#city");
  let currentCity = response.data.name;
  cityName.innerHTML = currentCity;
  let cityInput = document.querySelector("#city-input");
  cityInput.value = "";

  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = temperature;

  let description = response.data.weather[0].description;
  let currDesc = document.querySelector(".description");
  currDesc.innerHTML = `${description}`;

  let humidity = Math.round(response.data.main.humidity);
  let currHum = document.querySelector(".humidity-info");
  currHum.innerHTML = `Humidity: ${humidity}%`;

  let wind = Math.round((response.data.wind.speed * (60 * 60)) / 1000);
  let currWind = document.querySelector(".wind-info");
  currWind.innerHTML = `Wind: ${wind} km/h`;
}

function searchCity(city) {
  let apiKey = "3bc520cc14bbdedfd7e45158f2ef0439";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  searchCity(cityInput);
}

function searchLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function covertToCel(event) {
  event.preventDefault();
  let tempEl = document.querySelector("#temperature");
  tempEl.innerHTML = 14;
}

function covertToFar(event) {
  event.preventDefault();
  let tempEl = document.querySelector("#temperature");
  tempEl.innerHTML = 67;
}

let dateEl = document.querySelector(".date-time");
let currentTime = new Date();
dateEl.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentBtn = document.querySelector("#btn-current-location");
currentBtn.addEventListener("click", getCurrentLocation);

let celciusLink = document.querySelector("#cel");
celciusLink.addEventListener("click", covertToCel);

let farLink = document.querySelector("#far");
farLink.addEventListener("click", covertToFar);
