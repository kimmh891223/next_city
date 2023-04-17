var h1Name = document.getElementById('city-name');
var imgCity = document.getElementById('city-image');
var spinButton = document.getElementById('spin-btn');
var storageContainer = document.getElementsByClassName('storage-container');

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
    getCityInfo(cityDetails);

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
function getCityInfo(city) {
  fetch(city)
  .then (function (response) {
    if(!response) {
      throw response.json();
    }
    return response.json();
  })
  .then (function (data) {
    // var name = data.full_name;
    // var result = name.split(', ')[1];
    // console.log(result);

    var country = data._links['ua:countries'][0].name;
    console.log(country);

  })
}

// get City Details of select city
// function getCityDetails(city) {
//   city +='details';
//   fetch(city)
//   .then (function (response) {
//     if(!response) {
//       throw response.json();
//     }
//     return response.json();
//   })
//   .then (function (data) {
//     console.log(data)
//   })
// }

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