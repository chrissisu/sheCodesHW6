let now = new Date();
let currentdate = document.querySelector("#current-date");

let days = [
  "Sunday",
  "Monday",
  "Tueday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

let hours = now.getHours();
let minutes = now.getMinutes();

currentdate.innerHTML = `${day} ${hours}:${minutes}`;

function searchLocation() {
  let changeCity = document.querySelector("#alter-city");

  let currentApiKey = "fcd0a0f8638227b09e295db37316a9a5";
  let currentApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${changeCity.value}&appid=${currentApiKey}&units=metric`;

  axios.get(currentApiUrl).then(showTemperature);
}

function searchButton(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let search = document.querySelector("#search-button");

search.addEventListener("click", searchButton);

function showTemperature(response) {
  let display = document.querySelector("#temperature");
  let city = document.querySelector("#current-name");
  let humidity = document.querySelector("#humidity");
  let windspeed = document.querySelector("#windspeed");

  let temperature = Math.round(response.data.main.temp);
  let currentCity = response.data.name;
  let currentHumidity = response.data.main.humidity;
  let currentWindspeed = response.data.wind.speed;

  display.innerHTML = `${temperature}°C`;
  city.innerHTML = `${currentCity}`;
  humidity.innerHTML = `${currentHumidity}%`;
  windspeed.innerHTML = `${currentWindspeed} km/h`;
}

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "fcd0a0f8638227b09e295db37316a9a5";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function clickButton(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let current = document.querySelector("#current-button");

current.addEventListener("click", clickButton);
