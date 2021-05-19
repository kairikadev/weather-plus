function formatDate(timestamp){
    //calculate the date
    let date = new Date(timestamp);
    let hours = date.getHours();
    let minutes =date.getMinutes();
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
   
}

function displayTemperature(response){
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");

    windElement.innerHTML =Math.round(response.data.wind.speed);
    temperatureElement.innerHTML =Math.round(response.data.main.temp);
    cityElement.innerHTML =response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    dateElement.innerHTML = formatDate(response.data.dt*1000);
    iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt",response.data.weather[0].description);
}

function search(city){
    let apiKey = "e1011e97bf969d1b569c2b62944075b5 ";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e1011e97bf969d1b569c2b62944075b5&units=metric`;
    
    axios.get(apiUrl).then(displayTemperature);
    
}

function handleSubmit(event){
    event.preventDefault();

    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

search();
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);