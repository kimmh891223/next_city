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

                    var temp = document.createElement("h5")
                    temp.textContent = data.main.temp
                    document.getElementById("temperature").append(temp)

                    var wind = document.createElement("h5")
                    wind.textContent = data.wind.speed
                    document.getElementById("wind").append(wind)

                    var humid = document.createElement("h5")
                    humid.textContent = data.main.humidity
                    document.getElementById("humidity").append(humid)




                })
        }
    })
}

