var cityInputEl = document.querySelector("#city-input")
var searchButtonEl = document.querySelector("#search-btn")

searchButtonEl.addEventListener("click", function () {
    var searchValue = cityInputEl.value
    console.log(searchValue)

    getWeatherInfo(searchValue)

})


// get weather information
var apiKey = 'c36e92a6ba7d753715bfc90e32631c4e';
var getWeatherInfo = function (searchValue) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${apiKey}&units=imperial`;
    fetch(apiUrl
    ).then(function (response) {
        if (response.ok) {
            response.json()
                .then(function (data) {

                    console.log(data)

                    var Des = document.createElement("h5")
                    document.getElementById("Des").innerHTML = "";
                    Des.textContent = data.weather[0].description
                    document.getElementById("Des").append(Des)


                    var temp = document.createElement("h5")
                    document.getElementById("temperature").innerHTML = "";
                    temp.textContent = data.main.temp
                    document.getElementById("temperature").append(temp)

                    var Feels = document.createElement("h5")
                    document.getElementById("feels_like").innerHTML = "";
                    Feels.textContent = data.main.feels_like
                    document.getElementById("feels_like").append(Feels)

                    var wind = document.createElement("h5")
                    document.getElementById("wind").innerHTML = "";
                    wind.textContent = data.wind.speed
                    document.getElementById("wind").append(wind)

                    var humid = document.createElement("h5")
                    document.getElementById("humidity").innerHTML = "";
                    humid.textContent = data.main.humidity
                    document.getElementById("humidity").append(humid)




                })
        }
    })
}

