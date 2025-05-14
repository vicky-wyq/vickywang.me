"use strict";

const cityInput = document.querySelector("#cityInput");
const button = document.querySelector("#getWeather");
const result = document.querySelector("#weatherResult");
const apiKey = "d4b1d0223b552f5f81e38cd0779714ea";

button.addEventListener("click", async function () {
  const city = cityInput.value.trim();
  if (city === "") return;

  result.innerText = "Loading...";

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    result.innerHTML = `
      <p><strong>${data.name}</strong></p>
      <p>🌡 ${data.main.temp}°C</p>
      <p>🌤 ${data.weather[0].main}</p>
    `;
  } catch (err) {
    result.innerText = "❌ " + err.message;
  }
});
