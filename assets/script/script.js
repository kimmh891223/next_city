var h1Name = document.getElementById('city-name');
var imgCity = document.getElementById('city-image');
var spinButton = document.getElementById('spin-btn');
var storageContainer = document.getElementsByClassName('storage-container');

var cityInputEl = document.querySelector("#city-input")
var searchButtonEl = document.querySelector("#search-btn")
var searchValue = cityInputEl.value

searchButtonEl.addEventListener("click", function () {
    var searchValue = cityInputEl.value
    console.log(searchValue)

    getWeatherInfo(searchValue)
    getForecast(searchValue)
})

// get random city from api
function getCity() {
  var search = 'https://api.teleport.org/api/urban_areas';
  fetch(search)
  .then (function (response) {
    if(!response) {
      throw response.json();
    }
    return response.json();
  })
  .then (function (data) {

    // city array/ list of cities
    var cityList = data._links['ua:item'];
    var random = Math.floor(Math.random()* cityList.length);

    // random city selected
    var cityDetails = cityList[random].href;

    // Set city name to webpage
    h1Name.textContent = cityList[random].name;

    // Set city image to webpage
    getCityImage(cityDetails);

    // adding city location to local storage
    var cityStorage = getStorage();
    var city = {
      name: cityList[random].name,
      cityURL: cityList[random].href,
    }
    cityStorage.push(city);
    setStorage(cityStorage);

    // Renders Local storage to webpage
    renderCityStorage();
  })
}

// get City Details of select city
function getCityDetails(city) {
  city +='details';
  fetch(city)
  .then (function (response) {
    if(!response) {
      throw response.json();
    }
    return response.json();
  })
  .then (function (data) {
    // console.log(data)
  })
}

// get city image of select city
function getCityImage(city) {
  city +='images';
  fetch(city)
  .then (function (response) {
    if(!response) {
      throw response.json();
    }
    return response.json();
  })
  .then (function (data) {
    var cityImage = data.photos[0].image.web;
    imgCity.src = cityImage;
  })
}

// get local storage 
function getStorage() {
  var cities = localStorage.getItem('cities');
  if(cities) {
    cities = JSON.parse(cities);
  } else {
    cities = [];
  }
  return cities;
}

// Sets the local storage
function setStorage(cities) { 
  // If there are more than 15 cities in array , remove the first element 
  if (cities.length > 15) {
    cities.shift();
    localStorage.setItem('cities', JSON.stringify(cities));
    console.log(cities.length)
    return;
  }
  localStorage.setItem('cities', JSON.stringify(cities));
}

// Renders the local city array to webpage as recent city results
function renderCityStorage() { 

  // gets city array
  var cities = getStorage();

  // Clears the list container to make sure it doesnt render twice
  storageContainer[0].replaceChildren();

  // loops through each array element and renders to page
  for(var i = 0; i < cities.length; i++) {

    // Creates a list and a tag elemenets
    var li = document.createElement('li');
    var a = document.createElement('a');

    // adds the api city url to a dataset on the elemenet/  sets the text in element to city name
    a.dataset.URL = cities[i].cityURL;
    a.textContent = cities[i].name;

    // appened elements to the webpage
    li.append(a);
    storageContainer[0].append(li);

  }
}

spinButton.addEventListener('click', getCity)

getCity();

//Weather 

var cityInputEl = document.querySelector("#city-input")
var searchButtonEl = document.querySelector("#search-btn")
var searchValue = cityInputEl.value

searchButtonEl.addEventListener("click", function () {
    var searchValue = cityInputEl.value
    console.log(searchValue)

    getWeatherInfo(searchValue)
    getForecast(searchValue)
})


// current weather information
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

// forecast information
var getForecast = function (searchValue) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&appid=${apiKey}&units=imperial`;

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);


                    for (var i = 0; i < 5; i++) {
                        var forecast = data.list[i * 8];

                        var temp = document.createElement("p");
                        document.querySelector(`.fiveDay-temp${i + 1}`).innerHTML = "";
                        temp.textContent = forecast.main.temp;
                        document.querySelector(`.fiveDay-temp${i + 1}`).append(temp);

                        var humidity = document.createElement("p");
                        document.querySelector(`.fiveDay-humid${i + 1}`).innerHTML = "";
                        humidity.textContent = forecast.main.humidity;
                        document.querySelector(`.fiveDay-humid${i + 1}`).append(humidity);

                        var wind = document.createElement("p");
                        document.querySelector(`.fiveDay-wind${i + 1}`).innerHTML = "";
                        wind.textContent = forecast.wind.speed;
                        document.querySelector(`.fiveDay-wind${i + 1}`).append(wind);

                        var date = document.createElement("p");
                        document.querySelector(`#date${i + 1}`).innerHTML = "";
                        date.textContent = forecast.dt_txt;
                        document.querySelector(`#date${i + 1}`).append(date);
                    }
                });
            }
        });
};

// Hotel API

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '9b263f569amshba731ad5fc34b0ap196c9bjsn10d532f596cc',
		'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
	}
};



var cityName = "toronto"

fetch('https://booking-com.p.rapidapi.com/v1/hotels/locations?name='+ cityName +'&locale=en-gb', options)
	.then(response => response.json())
	.then(data => {
        console.log(data);
        var destId = data[0].dest_id

    fetch('https://booking-com.p.rapidapi.com/v1/hotels/search?checkin_date=2023-09-27&dest_type=city&units=metric&checkout_date=2023-09-28&adults_number=2&order_by=popularity&dest_id='+ destId +'&filter_by_currency=AED&locale=en-gb&room_number=1&children_number=2&children_ages=5%2C0&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1&page_number=0&include_adjacency=true', options)
        .then(response => response.json())
        .then(data => {
            
            hotelInfo();

            function hotelInfo () {
            
                for(var i = 0; i < 8; i++) {

                    var infoList = document.getElementById("infoList");

                    var hotelName = document.createElement('p');
                    hotelName.setAttribute("id", "hotelName");
                    hotelName.setAttribute("style", "font-size: 30px; font-weight: 600")
                    infoList.appendChild(hotelName);

                    var hotelImg = document.createElement('img');
                    hotelImg.setAttribute("id", "image");
                    infoList.appendChild(hotelImg);

                    var hotelAddr = document.createElement('p');
                    hotelAddr.setAttribute("id", "hotelAddr");
                    infoList.appendChild(hotelAddr);

                    var reviewScore = document.createElement('p');
                    reviewScore.setAttribute("id", "reviewScore");
                    infoList.appendChild(reviewScore);

                    var price = document.createElement("p");
                    price.setAttribute("id", "price");
                    infoList.appendChild(price);

                    var hotelUrl = document.createElement('a');
                    hotelUrl.setAttribute("id","hotelUrL");
                    infoList.appendChild(hotelUrl);

                    console.log(data);
                    
                    hotelImg.setAttribute("style", 'width: 400px');
                    hotelImg.setAttribute("src", data.result[i].max_photo_url);
                    hotelName.innerHTML = data.result[i].hotel_name;
                    hotelAddr.innerHTML = data.result[i].address + ", " + data.result[i].city;
                    hotelUrl.innerHTML = data.result[i].url;
                    hotelUrl.setAttribute("href", data.result[i].url);
                    reviewScore.innerHTML = "Review Score: " + data.result[i].review_score;
                    price.innerHTML = "All Inclusive Price: " + data.result[i].price_breakdown.gross_price + " " + data.result[i].price_breakdown.currency;
                }
            }
        })
    })
    
    
    