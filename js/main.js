
let weather = {
    'apiKey': 'd9fdb0d2abe77ad96c97d951ef77aa3c',
    fetchWeather: function (city) {
        fetch(
            'https://api.openweathermap.org/data/2.5/weather?q='
            // only call api for current weather day because your account is free account
            + city
            + '&units=metric&appid='
            + this.apiKey
        )
            .then((response) => response.json())
            // .then((data) => console.log(data))
            .then((data) => this.displayWeather(data))
            // .catch(function(){
            //     alert('Can't find weather in this City!');
            // })
    },
    displayWeather: function(data){
        const {name} = data;
        const {country} = data.sys;
        const {icon, description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;
        console.log(name, country, icon, description, temp, humidity, speed);
        document.querySelector('.location').innerText = `${name}, ${country}`;
        document.querySelector('.weather-icon').src = 'https://openweathermap.org/img/wn/' + icon + '.png';
        document.querySelector('.weather-temp').innerText = `${Math.round(temp)}°C`;
        document.querySelector('.weather-desc').innerText = description;
        document.querySelector('.description-value').innerText = description;
        document.querySelector('.humidity-value').innerText = `${humidity} %`;
        document.querySelector('.title-value').innerText = `${speed} km/h`;
        document.querySelector('.day_1').src = 'https://openweathermap.org/img/wn/' + icon + '.png';
        document.querySelector('.day-temp').innerText = `${Math.round(temp)}°C`;
        
            /*render image_weather by temp*/
        var weatherside_el = document.querySelector('.weather-side');
        if (temp > 35){
            weatherside_el.style.backgroundImage = "url('./assets/img/sun_weather.jpg')";
            console.log('Trời Nắng');
        }
        else if (temp>30 && temp <=35){
            weatherside_el.style.backgroundImage = "url('./assets/img/cloud_weather.jpg')";
            console.log('Trời có mây')
        }
        else if(temp>25 && temp<=30){
            weatherside_el.style.backgroundImage = "url('./assets/img/so_cloud_weather.jpg')";
            console.log('Gió Mạnh');
        }
        else if(temp>15 && temp<=25){
            weatherside_el.style.backgroundImage = "url('./assets/img/rain_weather.jpg')";
            console.log('Trời Mưa');
        }
        else if(temp<=15){
            weatherside_el.style.backgroundImage = "url('./assets/img/storm_weather.jpg')";
            console.log('Trời bão');
        }
    },
    search: function(){
        this.fetchWeather(document.querySelector('.search-bar').value);
    }
};

/* Render date */
function renderDate(){
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const weekday_contract = ["Sun", "Mon", "Tus", "Wed", "Thu", "Fri", "Sat"]

    const d = new Date();
    let day = weekday[d.getDay()];  /*d.getDay() select current day -> value from 0 to 6 */
    
    let day_1 = weekday_contract[d.getDay()]

    let day_2 = weekday_contract[(d.getDay() + 1) % 7];
    let day_3 = weekday_contract[(d.getDay() + 2) % 7];
    let day_4 = weekday_contract[(d.getDay() + 3) % 7];
    
    document.querySelector('.date-dayname').innerText = day;    /*render as Current day */
    document.querySelector('.date-day').innerText = d.toDateString().slice(3,); /*render as Jan 15 2022 */

    document.querySelector('.day-1').innerText = day_1;
    document.querySelector('.day-2').innerText = day_2;
    document.querySelector('.day-3').innerText = day_3;
    document.querySelector('.day-4').innerText = day_4;
}

var searchBtn = document.querySelector('.search-btn');
searchBtn.addEventListener('click', function(){
    weather.search();
});

document.querySelector('.search-bar').addEventListener('keyup', function(event){
    if(event.key == 'Enter'){
        weather.search();
    }
});

weather.fetchWeather('Hue');    /*Cho mặc định hiển thi weather in Hue*/
renderDate();
