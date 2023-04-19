var h1Name = document.getElementById('city-name');
var imgCity = document.getElementById('city-image');
var spinButton = document.getElementById('spin-btn');
var storageContainer = document.getElementsByClassName('storage-container');
var exploreCityBtn = document.getElementById('explorebtn')
var apiKey = 'c36e92a6ba7d753715bfc90e32631c4e';

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
    var cityName = cityList[random].name
    h1Name.textContent = cityName;

    // Set city image to webpage
    getCityImage(cityDetails);

    // adding city location to local storage
    var cityStorage = getStorage();
    var city = {
      name: cityName,
      cityURL: cityDetails,
    }
    cityStorage.push(city);
    setStorage(cityStorage);    
    setCityStorage(city.name);

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

// Gets the chosen City from storage
function getCityStorage() {
  var city = localStorage.getItem('city');
  if(city) {
    city = JSON.parse(city);
  } else {
    city = '';
  }
  return city;
}

// Sets the local storage
function setStorage(cities) { 
  // If there are more than 15 cities in array , remove the first element 
  if (cities.length > 15) {
    cities.shift();
    localStorage.setItem('cities', JSON.stringify(cities));
    return;
  }
  localStorage.setItem('cities', JSON.stringify(cities));
}

// Sets the Chosen City to Storage
function setCityStorage(city) { 
  localStorage.setItem('city', JSON.stringify(city));
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

// Current weather information
function getWeatherInfo(searchValue){
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${apiKey}&units=imperial`;
  fetch(apiUrl)
  .then( function (response) {
    if (!response.ok) {
      throw response.json();
    }
    return response.json();
    })
  .then (function (data) {
    if(document.location.pathname === '/explore.html') {
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
    }
    
  })
}

// forecast information
var getForecast = function (searchValue) {
  var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&appid=${apiKey}&units=imperial`;

  fetch(apiUrl)
  .then(function (response) {
    if (!response.ok) {
      throw response.json();
    }
    return response.json();
  })
  .then (function (data) { 
    if(document.location.pathname === '/explore.html') {
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
    }
  })
};

// Handles the functions when page loads explore html
function handleExplore() { 
  var pickedCity = getCityStorage();
  h1Name.textContent = pickedCity;
  getWeatherInfo(pickedCity)
  getForecast(pickedCity)
}

// Handles the search History
function handleRecentSearch(e) { 
  console.log(e.target.dataset.URL)
  if(e.target.dataset.URL) {
    var city = e.target.textContent;
    setCityStorage(city);
    document.location.replace('./explore.html')
  }
}

spinButton.addEventListener('click', getCity)

// adds onload to explore html
if (document.location.pathname === '/explore.html') {
  document.getElementById("exploreHTML").onload = function() {handleExplore()};
}

// Renders only when user is in the correct html
if (document.location.pathname === '/random.html') {
  renderCityStorage();
}

// Adds eventlistener to search history
document.addEventListener('click', handleRecentSearch);
