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



getCity();

// spin animation code
var buttonEl = document.querySelector("#spinMe");
buttonEl.addEventListener("click", function(){

  var aniEl = document.getElementById("animation");
  var resultEl = document.getElementById("result");

  // The audio is from https://mixkit.co/free-sound-effects/

  var wheelSound = new Audio('./assets/sound/mixkit-fast-bike-wheel-spin-1614.wav')
  var clickSound = new Audio('./assets/sound/mixkit-camera-long-shutter-1431.wav')
  
  console.log(secondsLeft)
  var secondsLeft = 4;
  buttonEl.disabled = true;
  resultEl.replaceChildren();

  function setTime() {
    var timerInterval = setInterval(function() {
      secondsLeft--;

      if(secondsLeft > 0) {
        showSlideshow();
        wheelSound.play();
        
      }

      if(secondsLeft === 0) {
        clearInterval(timerInterval);
        clickSound.play();
        showResult();
        buttonEl.disabled = false;
      }

    }, 1000);
  }

  function showSlideshow () {
    // Images are from https://www.pexels.com/
      var images = ['./assets/img/pexels-ágoston-fung-2227942.jpg', './assets/img/pexels-belle-co-402028.jpg', './assets/img/pexels-engin-akyurt-2760964.jpg', './assets/img/pexels-francesco-ungaro-409127.jpg', './assets/img/pexels-haley-black-2087392.jpg', './assets/img/pexels-iloveswitzerland-7932564.jpg', './assets/img/pexels-josh-hild-2422461.jpg', './assets/img/pexels-matteo-basile-7155056.jpg', './assets/img/pexels-nout-gons-378570.jpg', './assets/img/pexels-paweł-l-1121782.jpg', './assets/img/pexels-pixabay-161850.jpg', './assets/img/pexels-pixabay-161901.jpg', './assets/img/pexels-pixabay-208745.jpg', './assets/img/pexels-pixabay-280221.jpg', './assets/img/pexels-pixabay-460672.jpg', './assets/img/pexels-tyler-lastovich-412681.jpg']; // List of image URLs
      var imageObjects = [];
      let currentIndex = 0;

      for (let i = 0; i < images.length; i++) {
        var imgNew = new Image();
        imgNew.src = images[i];
        imageObjects.push(imgNew);
      }
      
      
      function displayNextImage() {
        if (currentIndex < imageObjects.length) {
          var img = imageObjects[currentIndex];
          var imageContainer = aniEl;
          imageContainer.innerHTML = "";
          imageContainer.appendChild(img);
      
         
          if (currentIndex > 16) {
            var prevImg = imageObjects[currentIndex - 1];
            aniEl.removeChild(prevImg);
          }
      
          currentIndex++;
         
          if (currentIndex === imageObjects.length) {
            currentIndex = 0;
          }
          console.log(currentIndex);

          if (secondsLeft === 0) {
            aniEl.replaceChildren();
            return;
          }

          
          setTimeout(displayNextImage, 50);
        }
        
      }
      
      displayNextImage(); 
  }
  
  function showResult() {
    
    var imgEl = document.createElement("img");

    // styling code for zoom in and out after result pops up
    var keyframes = `
      @keyframes resultLoad {
        0% {
            transform: scale(1.0);
        }
        80% {
            transform: scale(1.15);
        }
    
        100% {
            transform: scale(1.0);
        }
      }
      `;
    var styleEl = document.createElement('style');
    styleEl.innerHTML = keyframes;
    document.head.appendChild(styleEl);

    imgEl.style.animationName = "resultLoad";
    imgEl.style.animationDuration = '500ms';
    imgEl.style.animationTimingFunction = 'ease-in-out';
    
    // change the image below to the API image
    // change image width and height of the animation to match the API image
    imgEl.setAttribute("src", "./assets/img/pexels-haley-black-2087392.jpg");
    resultEl.appendChild(imgEl);

  }

  setTime();
})