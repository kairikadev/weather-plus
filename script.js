 //Display the search bar input on the main page
  
 function searchCity(event){
    event.preventDefault();
    // this code inside this functions executes when button is clicked
    // 1. Read the input text and store in a let city variable
    // 2. Create a variable let apiUrl that has the base url and the city and api key query parameters
    // 3. Send GET http request to remote API and associate the response to a callback function
    // 4. In the response callback function do whatever you have to do with the json response (set temperature in an html element)
 
   let searchInput= document.querySelector("#city-input");
   let city = searchInput.value;
   let apiKey = "e1011e97bf969d1b569c2b62944075b5";
   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
   axios
     .get(apiUrl)
     .then(processResponse);
 }

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

 function getForecast(coordinates){
  let apiKey = "e1011e97bf969d1b569c2b62944075b5 ";
  let apiUrl =`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=e1011e97bf969d1b569c2b62944075b5&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}
 
 function processResponse(response){
   let temperature = Math.round(response.data.main.temp);
   let degrees=document.querySelector("#degrees-number");
   let humidityElement = document.querySelector("#humidity");
   let windElement = document.querySelector("#wind");
   let weatherDescription = response.data.weather[0].description;
   let description= document.querySelector("#description");
   let cityName = response.data.name;
   let title = document.querySelector("h1");
  
   degrees.innerHTML = `${temperature} &#176;`;
   windElement.innerHTML =Math.round(response.data.wind.speed);
   humidityElement.innerHTML = response.data.main.humidity;
   description.innerHTML = weatherDescription;
   title.innerHTML = cityName;

   getForecast(response.data.coord);
 }
 
 let searchForm = document.querySelector("#search-city");
 searchForm.addEventListener("submit",searchCity);
 
  
 //Change the time and display current time
 
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
 
 formatDate();
 
 // Convert temperatures 
 function convertToF(celsius){
   
   let fahrenheit= celsius* 9/5+32
   return fahrenheit;
 
 }
 
 function fahrenheitClicked() {
   let degreesNumberElement = document.getElementById("degrees-number");
   let degreesNumber = degreesNumberElement.innerHTML;
   let degreesNumberInF = convertToF(degreesNumber);
   degreesNumberElement.innerHTML = degreesNumberInF;
   //alert(degreesNumberInF);
 }
 
 let fahrenheitButton = document.getElementById("fahrenheit");
 fahrenheitButton.addEventListener("click", fahrenheitClicked);
 
 function convertToC(fahrenheit){
   let celsius= (fahrenheit-32)*5/9
   return celsius;
 }
 function celsiusClicked() {
   let degreesNumberElement = document.getElementById("degrees-number");
   let degreesNumber = degreesNumberElement.innerHTML;
   let degreesNumberInC = convertToC(degreesNumber);
   degreesNumberElement.innerHTML = degreesNumberInC;
   //alert(degreesNumberInF);
 }
 
 let celsiusButton = document.getElementById("celsius");
 celsiusButton.addEventListener("click",celsiusClicked);
 
 
 function replaceValues(name, temperature){
   let h1 =document.querySelector("h1");
   h1.innerHTML = name;
   let degrees =document.querySelector("#degrees-number");
   degrees.innerHTML = temperature;
 }
 
 let lat = 0;
 let lon = 0;
 
 navigator.geolocation.getCurrentPosition((position) => {
     lat = position.coords.latitude;
     lon = position.coords.longitude;    
 });
 
 let button = document.querySelector(".location");
 button.addEventListener("click", () => {
   let apiUrlLocation = `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&units=metric&appid=e1011e97bf969d1b569c2b62944075b5`;
   axios
     .get(apiUrlLocation)
     .then((response) => {
       let myCity = response.data.list[0];
       if(myCity != undefined){
         let name = myCity.name;
         let temp = Math.round(myCity.main.temp);
         replaceValues(name, temp); 
       } 
     });
 });
 
 