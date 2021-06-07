// Constants
const openweatherApiKey = "e1011e97bf969d1b569c2b62944075b5";
 
function formatDay(timestamp){
  let date = new Date(timestamp *1000);
  let day = date.getDay();
  let days =["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  return days[day];
}

function displayForecast(response){
  let forecastElement = document.querySelector(".forecast");
  
  let forecast = response.data.daily;
  let forecastHTML = ``;
 
  forecast.forEach(function(forecastDay, index){
      if(index < 5){
      forecastHTML = forecastHTML +
      `
        <div class="col-2">  
            <div class="forecast-day">${formatDay(forecastDay.dt)}</div> 
              <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
              width="42"/>
              <div class="forecast-temperatures">
                 <span class="forecast-degrees-max"><strong>${Math.round(forecastDay.temp.max)}</strong></span>
                 <span class="forecast-degrees-min">${Math.round(forecastDay.temp.min)}</span>
              </div> 
            </div>
        </div>
      `; }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(latitude, longitude){
  let apiUrl =`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${openweatherApiKey}&units=metric`;
  axios
  .get(apiUrl)
  .then(displayForecast);
}
 
function processCityForecastResponse(response){
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let speed = Math.round(response.data.wind.speed);
  let humitidy = response.data.main.humidity;
  let weatherDescription = response.data.weather[0].description;
  let cityName = response.data.name;
  let image = response.data.weather[0].icon;

  let forecast = {
    temperature: temperature,
    windSpeed: speed,
    humidity: humitidy,
    description: weatherDescription,
    cityName: cityName,
    image: image
  };
  replaceValues(forecast);

  let lat = response.data.coord.lat;
  let lon = response.data.coord.lon;

  getForecast(lat, lon);
}
 
let searchForm = document.querySelector("#search-city");
searchForm.addEventListener("submit",searchCity);
 
function searchCity(event){
  event.preventDefault();
  // this code inside this functions executes when button is clicked
  // 1. Read the input text and store in a let city variable
  // 2. Create a variable let apiUrl that has the base url and the city and api key query parameters
  // 3. Send GET http request to remote API and associate the response to a callback function
  // 4. In the response callback function do whatever you have to do with the json response (set temperature in an html element)

  let searchInput= document.querySelector("#city-input");
  let city = searchInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${openweatherApiKey}`;
  axios
    .get(apiUrl)
    .then(processCityForecastResponse);
}

function formatDate(){
  let currentTime= new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"];
    
  let day = days[currentTime.getDay()];
  let hours=currentTime.getHours();
  if(hours <10){
    hours=`0${hours}`;
  }
  let minutes= currentTime.getMinutes();
  if(minutes<10){
    minutes=`0${minutes}`;
  }

  let date= document.getElementById("date");
  date.innerHTML= `${day},${hours}:${minutes}`;
}
 
//let fahrenheitButton = document.getElementById("fahrenheit");
//fahrenheitButton.addEventListener("click", () => {
  //let degreesNumberElement = document.getElementById("degrees-number");
  //let degreesNumber = degreesNumberElement.innerHTML;
  //let degreesNumberInF = convertToF(degreesNumber);
  //degreesNumberElement.innerHTML = degreesNumberInF;
  //alert(degreesNumberInF);
//});
 
//let celsiusButton = document.getElementById("celsius");
//celsiusButton.addEventListener("click",() => {
  //let degreesNumberElement = document.getElementById("degrees-number");
  //let degreesNumber = degreesNumberElement.innerHTML;
  //let degreesNumberInC = convertToC(degreesNumber);
 // degreesNumberElement.innerHTML = degreesNumberInC;
//});

//function convertToC(fahrenheit) {
  //let celsius= (fahrenheit-32)*5/9
  //return celsius;
//}

//function convertToF(celsius) {
  //let fahrenheit= celsius* 9/5+32
  //return fahrenheit;
//}

let locationButton = document.querySelector(".location");
locationButton.addEventListener("click", getForecastForCurrentLocation);

function getForecastForCurrentLocation() {
  // Get coordinates from geolocation API
  navigator.geolocation.getCurrentPosition((position) => {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;    
    // Once I have coordinates, make forecast API call
    let apiUrlLocation = `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&units=metric&appid=${openweatherApiKey}`;
    axios
      .get(apiUrlLocation)
      .then((response) => {
        getForecast(lat, lon);
        
        let temperature = Math.round(response.data.list[0].main.temp);
        let speed = Math.round(response.data.list[0].wind.speed);
        let humitidy = response.data.list[0].main.humidity;
        let weatherDescription = response.data.list[0].weather[0].description;
        let cityName = response.data.list[0].name;
        let image = response.data.list[0].weather[0].icon;

        let forecast = {
          temperature: temperature,
          windSpeed: speed,
          humidity: humitidy,
          description: weatherDescription,
          cityName: cityName,
          image: image
        };
        replaceValues(forecast);
      });
  });
}

function clearCity() {
  let cityInput = document.getElementById("city-input");
  cityInput.value = "";
}

function replaceValues(forecast){
  console.log(forecast);
  let title = document.querySelector("h1");
  title.innerHTML = forecast.cityName;

  let degrees=document.querySelector("#degrees-number");
  degrees.innerHTML = `${forecast.temperature} &#176;`;

  let description= document.querySelector("#description");
  description.innerHTML = forecast.description;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML =Math.round(forecast.windSpeed);

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = forecast.humidity;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${forecast.image}@2x.png`);

  clearCity();
}

formatDate();