var getCity;

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
    console.log(data)
    var cityList = data._links['ua:item'];
    var random = Math.floor(Math.random()* cityList.length)
    console.log(cityList)
    console.log(random)
    console.log(cityList[random])
  })
}

getCity();

document.getElementById("randomCity").innerHTML = "You will visit" + " " + getCity;