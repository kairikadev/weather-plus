function formatDate(timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
    let minutes =date.getMinutes();
    let day = day.getDay();
    return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response){
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date")
    windElement.innerHTML =Math.round(response.data.wind.speed);
    temperatureElement.innerHTML =Math.round(response.data.main.temp);
    cityElement.innerHTML =response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    dateElement.innerHTML = formatDate(response.data.dt*1000);
}

let apiKey = "e1011e97bf969d1b569c2b62944075b5 ";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=e1011e97bf969d1b569c2b62944075b5&units=metric`;

axios.get(apiUrl).then(displayTemperature);