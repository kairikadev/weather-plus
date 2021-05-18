function displayTemperature(response){
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML =Math.round(response.data.main.temp);
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML =response.data.name;
    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.weather[0].description;
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = response.data.main.humidity;
    let windElement = document.querySelector("#wind");
    windElement.innerHTML =Math.round(response.data.wind.speed);
    
}

let apiKey = "e1011e97bf969d1b569c2b62944075b5 ";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=e1011e97bf969d1b569c2b62944075b5&units=metric`;

axios.get(apiUrl).then(displayTemperature);