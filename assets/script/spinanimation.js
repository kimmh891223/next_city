// code for spin animation

var buttonEl = document.querySelector("#spinMe");


buttonEl.addEventListener("click", function(){

  var aniEl = document.getElementById("animation");
  var resultEl = document.getElementById("result");

  // The audio is from https://mixkit.co/free-sound-effects/

  var wheelSound = new Audio('./assets/sound/mixkit-fast-bike-wheel-spin-1614.wav')
  var clickSound = new Audio('./assets/sound/mixkit-camera-long-shutter-1431.wav')
  

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


fetch('https://booking-com.p.rapidapi.com/v1/hotels/reviews-filter-metadata?locale=en-gb&hotel_id=1676161', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));


var requestUrl = 'https://booking-com.p.rapidapi.com/v1/hotels/reviews-filter-metadata?locale=en-gb&hotel_id=1676161'
  console.log(requestUrl);
  fetch(requestUrl)
      .then(function(response) {
          return response.json();
      })
      .then(function(data) {
      })