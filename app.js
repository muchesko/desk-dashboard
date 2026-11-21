const timeContainer = document.querySelector(".time");


function updateClock() {
    const date = new Date();

    let hour = date.getHours();
    let minute = date.getMinutes();
    let period = "";

    /*if (hour === 0) {
        hour = 12;
        period = "AM";
    } else if (hour === 12) {
        period = "PM";
    } else if (hour <= 11) {
        period = "AM";
    } else {
        period = "PM";
        hour = hour - 12;
    }*/

    minute = minute.toString();
    minute = minute.padStart(2, "0");

    timeContainer.textContent = `${hour}:${minute} ${period}`;
};

updateClock();
setInterval(updateClock, 1000);

const dateContainer = document.querySelector(".date");

let previousDate = "";

function updateDate() {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthsNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12

    ]
    month = monthsNumber[month];

    dateContainer.textContent = `${month}/${day}/${year}`;

    const today = date.toDateString();

    if (today !== previousDate && previousDate !== "") {
        updateWeather();
    }

    previousDate = today;
};

updateDate();
setInterval(updateDate, 60000);

const temperatureContainer = document.querySelector(".temperature");
const dailyTemperatureContainer = document.querySelector(".daily-temperature");
const weatherContainer = document.querySelector(".weather");
const weatherIcon = document.querySelector(".weather-icon")

const url = "https://api.open-meteo.com/v1/forecast?latitude=35.2271&longitude=-80.8431&current=temperature_2m,weather_code,is_day&daily=temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&timezone=America%2FNew_York";

async function updateWeather() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Weather request failed");
        }
        const weatherData = await response.json();

        console.log(weatherData);

        let temperature = weatherData.current.temperature_2m;
        temperature = Math.round(temperature);
        temperatureContainer.textContent = `${temperature}°F`;

        let weatherCode = weatherData.current.weather_code;

        const weatherConditions = {
            0: {
                description: "Clear sky",
                dayIcon: "wi wi-day-sunny",
                nightIcon: "wi wi-night-clear"
            },
            1: {
                description: "Mainly clear",
                dayIcon: "wi wi-day-sunny-overcast",
                nightIcon: "wi wi-night-alt-partly-cloudy"
            },
            2: {
                description: "Partly cloudy",
                dayIcon: "wi wi-day-cloudy",
                nightIcon: "wi wi-night-alt-cloudy"
            },
            3: {
                description: "Overcast",
                dayIcon: "wi wi-cloudy",
                nightIcon: "wi wi-cloudy"
            },
            45: {
                description: "Fog",
                dayIcon: "wi wi-day-fog",
                nightIcon: "wi wi-night-fog"
            },
            48: {
                description: "Depositing rime fog",
                dayIcon: "wi wi-day-fog",
                nightIcon: "wi wi-night-fog"
            },
            51: {
                description: "Light drizzle",
                dayIcon: "wi wi-day-sprinkle",
                nightIcon: "wi wi-night-alt-sprinkle"
            },
            53: {
                description: "Moderate drizzle",
                dayIcon: "wi wi-day-sprinkle",
                nightIcon: "wi wi-night-alt-sprinkle"
            },
            55: {
                description: "Dense drizzle",
                dayIcon: "wi wi-day-showers",
                nightIcon: "wi wi-night-alt-showers"
            },
            56: {
                description: "Light freezing drizzle",
                dayIcon: "wi wi-day-sleet",
                nightIcon: "wi wi-night-alt-sleet"
            },
            57: {
                description: "Dense freezing drizzle",
                dayIcon: "wi wi-day-sleet",
                nightIcon: "wi wi-night-alt-sleet"
            },
            61: {
                description: "Slight rain",
                dayIcon: "wi wi-day-sprinkle",
                nightIcon: "wi wi-night-alt-sprinkle"
            },
            63: {
                description: "Moderate rain",
                dayIcon: "wi wi-day-rain",
                nightIcon: "wi wi-night-alt-rain"
            },
            65: {
                description: "Heavy rain",
                dayIcon: "wi wi-rain-wind",
                nightIcon: "wi wi-rain-wind"
            },
            66: {
                description: "Light freezing rain",
                dayIcon: "wi wi-day-sleet",
                nightIcon: "wi wi-night-alt-sleet"
            },
            67: {
                description: "Heavy freezing rain",
                dayIcon: "wi wi-day-sleet",
                nightIcon: "wi wi-night-alt-sleet"
            },
            71: {
                description: "Slight snowfall",
                dayIcon: "wi wi-day-snow",
                nightIcon: "wi wi-night-alt-snow"
            },
            73: {
                description: "Moderate snowfall",
                dayIcon: "wi wi-day-snow",
                nightIcon: "wi wi-night-alt-snow"
            },
            75: {
                description: "Heavy snowfall",
                dayIcon: "wi wi-snow-wind",
                nightIcon: "wi wi-snow-wind"
            },
            77: {
                description: "Snow grains",
                dayIcon: "wi wi-snow",
                nightIcon: "wi wi-snow"
            },
            80: {
                description: "Slight rain showers",
                dayIcon: "wi wi-day-showers",
                nightIcon: "wi wi-night-alt-showers"
            },
            81: {
                description: "Moderate rain showers",
                dayIcon: "wi wi-day-showers",
                nightIcon: "wi wi-night-alt-showers"
            },
            82: {
                description: "Violent rain showers",
                dayIcon: "wi wi-day-storm-showers",
                nightIcon: "wi wi-night-alt-storm-showers"
            },
            85: {
                description: "Slight snow showers",
                dayIcon: "wi wi-day-snow",
                nightIcon: "wi wi-night-alt-snow"
            },
            86: {
                description: "Heavy snow showers",
                dayIcon: "wi wi-snow-wind",
                nightIcon: "wi wi-snow-wind"
            },
            95: {
                description: "Thunderstorm",
                dayIcon: "wi wi-day-thunderstorm",
                nightIcon: "wi wi-night-alt-thunderstorm"
            },
            96: {
                description: "Thunderstorm with slight hail",
                dayIcon: "wi wi-day-sleet-storm",
                nightIcon: "wi wi-night-alt-sleet-storm"
            },
            97: {
                description: "Heavy thunderstorm",
                dayIcon: "wi wi-day-thunderstorm",
                nightIcon: "wi wi-night-alt-thunderstorm"
            },
            99: {
                description: "Thunderstorm with heavy hail",
                dayIcon: "wi wi-day-sleet-storm",
                nightIcon: "wi wi-night-alt-sleet-storm"
            }
        };

        // || instead of ?? here since older devices don't support ??
        const weather = weatherConditions[weatherCode] || {
            description: "Unknown weather conditions",
            dayIcon: "wi wi-na",
            nightIcon: "wi wi-na"
        };

        let isDay = weatherData.current.is_day;
        let icon;
        if (isDay === 1) {
            icon = weather.dayIcon;
        } else {
            icon = weather.nightIcon;
        }

        let highTemperature = weatherData.daily.temperature_2m_max[0];
        highTemperature = Math.round(highTemperature);
        let lowTemperature = weatherData.daily.temperature_2m_min[0];
        lowTemperature = Math.round(lowTemperature);

        dailyTemperatureContainer.textContent = `H: ${highTemperature}°F\nL: ${lowTemperature}°F`;
        weatherContainer.textContent = `${weather.description}`;
        //weatherIcon.className = icon;
    } catch (error) {
        weatherContainer.textContent = "Weather data unavailable";
        console.error(error);
    }
}
updateWeather();
setInterval(updateWeather, 900000);