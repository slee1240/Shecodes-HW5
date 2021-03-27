let currentDate = document.querySelector("#current-date");
console.log(currentDate);

let now = new Date();
console.log(now);

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
//console.log(day);

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
//console.log(month);

let date = now.getDate();
//console.log(date);

let hour = now.getHours();
let minute = now.getMinutes();

console.log(hour);
console.log(minute);

currentDate.innerHTML = `${day}, ${month} ${date} ${hour}:${minute} EST`;
console.log(currentDate);

/*
let apiKey = "83729a2ef7b5c5578e2cc2d17b424dcf";
let city = "Baltimore";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

 function showTemp(response) {
  console.log(response.data);
  let city = response.data.name;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = `${city}`;
}

axios.get(`${apiUrl}`).then(showTemp);
*/

function showTemp(response) {
  console.log(response.data);

  let temperature = Math.round(response.data.main.temp);
  let degree = document.querySelector("#degree");
  degree.innerHTML = `${temperature}`;

  let description = document.querySelector("#weather-description");
  description.innerHTML = response.data.weather[0].main;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);

  let city = response.data.name;
  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = `${city}`;
}

function search(event) {
  event.preventDefault();
  let searchCitiesInput = document.querySelector("#search-box");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = `${searchCitiesInput.value}`;

  let apiKey = "83729a2ef7b5c5578e2cc2d17b424dcf";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCitiesInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}

function searchLocation(position) {
  let apiKey = "83729a2ef7b5c5578e2cc2d17b424dcf";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}

function displayCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentLocation(searchLocation);
}

let searchForm = document.querySelector("#search-form");
console.log(searchForm);
searchForm.addEventListener("submit", search);

let currentLocationButton = document.querySelector("#current-location");
console.log(currentLocationButton);
currentLocationButton.addEventListener("submit", displayCurrentLocation);

function convertTemp(event) {
  event.preventDefault();
  let degree = document.querySelector("#degree");
  degree.innerHTML = `(${temperature}* 9/5) + 32`;
}

function revertTemp(event) {
  event.preventDefault();
  let degree = document.querySelector("#degree");
  degree.innerHTML = `${temperature}`;
}

let conversion = document.querySelector("#fahrenheit");
conversion.addEventListener("click", convertTemp);

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", revertTemp);
