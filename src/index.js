//let rightNow = new Date("October 15, 2025 05:04:00");
let rightNow = new Date();
let arrayDaysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
let outputCurrentDay = document.querySelector("#todaysDayOfWeek");
let outputCurrentDate = document.querySelector("#todaysDate");
let outputCurrentTime = document.querySelector("#todaysTime");
let copyCityVillage = document.querySelector("#city-village-form");
let apiKey = "b501360990c356ff9914efdf5758a53e";

function searchWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let degreeValue = document.querySelector("#degreeValue");
  let pressureValue = document.querySelector("#pressureValue");
  let humidityValue = document.querySelector("#humidityValue");
  let windValue = document.querySelector("#windValue");
  degreeValue.innerHTML = temperature;
  pressureValue.innerHTML = response.data.main.pressure;
  humidityValue.innerHTML = `${response.data.main.humidity}%`;
  windValue.innerHTML = `${response.data.wind.speed} km/h`;
}

function outputCityVillage(event) {
  event.preventDefault();
  let outputCity = document.querySelector("#city-village");
  let outputCityVillage = document.querySelector("#copyCityVillage");
  outputCityVillage.innerHTML = `${outputCity.value}`;
  let apiUrlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${outputCity.value}&units=metric&appid=${apiKey}`;
  axios.get(apiUrlWeather).then(searchWeather);
}

function showCurrentCoordinatesCityTemperature(response) {
  let cityName = response.data.name;
  let temperature = response.data.main.temp;
  alert(`The temperature in ${cityName} is ${temperature} ˚C`);
}

function defineCurrentCoordinates(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let urlRequestCityTemperature = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios
    .get(urlRequestCityTemperature)
    .then(showCurrentCoordinatesCityTemperature);
}

function getCurrentCoordinates(event) {
  navigator.geolocation.getCurrentPosition(defineCurrentCoordinates);
}

copyCityVillage.addEventListener("submit", outputCityVillage);
outputCurrentDay.innerHTML = arrayDaysOfWeek[rightNow.getDay()];

outputCurrentDate.innerHTML = `${rightNow.getDate()}/${
  rightNow.getMonth() + 1
}/${rightNow.getFullYear()}`;

outputCurrentTime.innerHTML = `${String(rightNow.getHours()).padStart(
  2,
  "0"
)}:${String(rightNow.getMinutes()).padStart(2, "0")}`;

let buttonCurrentPosition = document.querySelector(".coordinatesButton");
buttonCurrentPosition.addEventListener("click", getCurrentCoordinates);
