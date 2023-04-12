
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
    var cityList = data._links['ua:item'];
    var random = Math.floor(Math.random()* cityList.length)
    console.log(cityList[random])
    var city = cityList[random].href
    getCityDetails(city)
    getCityImage(city)
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
    console.log(data)
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
    // console.log(data)
    console.log(data.photos[0].image.web)
    var cityImage = data.photos[0].image.web;
  })
}
getCity();