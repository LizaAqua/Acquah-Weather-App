function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature=response.data.temperature.current;
    let cityELement= document.querySelector ("#city");
    let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);

  let iconElement= document.querySelector("#icon")
  
  iconElement.innerHTML = '<img src="' + response.data.condition.icon_url + '" class="weather-app-icon"/>';
  
  
    
    cityELement.innerHTML= response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    timeElement.innerHTML =formatDate(date);
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
   windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
    temperatureElement.innerHTML= Math.round(temperature);


}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
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

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}


function searchCity(city) {
  let apiKey="abfec4b8be01abt65a50c3e50o5aa3d7"
  let apiURL=`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiURL).then(refreshWeather);

}



function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput= document.querySelector("#search-form-input");
    
searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("London");


function displayForecast() {
let days = ("Tue", "Wed","Thu","Fri", "Sat");
let forecastHtml="";
days.forEach(function (day) {
  forecastHtml =
  forecastHtml +
' <div class="weather-forecast-day">
                <div class="col-2">Tue</div>
                <div class="weather-forecast-date">$(day)</div>
                <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-day.png" alt=""width="40" />
                <div class="weather-temperatures-forecast">
                    <span class="weather-temperature-forcast-max"> 18°C </span>
                    <span class="weather-temperature-forcast-min"> 12°C</span>
                </div>
            </div>
';
});

let forecastElement= document.querySelector("#forecast");
forecastElement.innerHTML= forecastHtml;

}

       