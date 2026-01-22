const apiKey = "ca018df54353f065aaed7d802825b8be";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

function getWeather() {
    const city = document.getElementById("city").value.trim();
    const result = document.getElementById("result");

    if (city === "") {
        result.innerHTML = "<p class='hint'>Please enter a city name</p>";
        return;
    }

    result.innerHTML = "<p class='hint'>Loading weather...</p>";

    fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== 200) {
                result.innerHTML = "<p class='hint'>City not found</p>";
                return;
            }

            result.innerHTML = `
                <div class="city">${data.name}, ${data.sys.country}</div>
                <div class="temp">${Math.round(data.main.temp)}°C</div>
                <div class="desc">${data.weather[0].description}</div>

                <div class="extra">
                    Feels like ${Math.round(data.main.feels_like)}°C<br>
                    Humidity ${data.main.humidity}%<br>
                    Wind ${data.wind.speed} m/s
                </div>
            `;
        })
        .catch(() => {
            result.innerHTML = "<p class='hint'>Error fetching data</p>";
        });
}
