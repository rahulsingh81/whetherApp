const inputBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("searchBtn");
const weatherImg = document.querySelector("weather-img");
const description = document.querySelector("description");
const temperature = document.querySelector("temperature");
const humidity = document.querySelector(".humidity");
const windSpeed = document.querySelector(".wind-speed");
const loctionNotFound = document.querySelector(".location-not-found");
const weatherBody = document.querySelector(".weather-body");

async function checkWeather(city) {
  const api_key = "2ca32e8530cf0fb94b2b7fb4e4661693";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

  const weatherData = await fetch(`${url}`).then((response) => response.json());

  if (weatherData.cod === `404`) {
    loctionNotFound.style.display = "flex";
    weatherBody.style.display = "none";
    console.log("error");
    return;
  }

  console.log("run");
  loctionNotFound.style.display = "none";
  weatherBody.style.display = "flex";
  temperature.innerHTML = `${Math.round(weatherData.main.temp - 273.15)}°C`;
  description.innerHTML = `${weatherData.weather[0].description}`;

  humidity.innerHTML = `${weatherData.main.humidity}%`;
  windSpeed.innerHTML = `${weatherData.wind.speed}Km/H`;

  switch (weatherData.weather[0].main) {
    case "Clouds":
      weatherImg.src = "/assets/a1.jpeg";
      break;
    case "Clear":
      weatherImg.src = "/assets/b1.jpeg";
      break;
    case "Rain":
      weatherImg.src = "/assets/c1.jpeg";
      break;
    case "Mist":
      weatherImg.src = "/assets/d1.jpeg";
      break;
    case "Snow":
      weatherImg.src = "/assets/d1.png";
      break;
  }

  console.log(weatherData);
}

searchBtn.addEventListener("click", () => {
  const city = inputBox.value.trim();
  if (city) {
    checkWeather(city);
  }
});
