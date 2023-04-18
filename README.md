# Random City Generator Project

## About the Application
The purpose of this application is to generate the random city upon the request of the user. The button on the main page triggers the proccess
of generating random city. Further more, if the user is interested in randomly selected city, then the user is provided with pages for weather and hotel booking.
The weather page will provide the user with weather forcasting for a whole week with a daily breakdown by date. The booking page will provide the list of avaliable hotels and also a link to booking.com website, where the user
will be able to book a disered hotel.

## Functionality

### Random city generator

1. We used teleport.org api to retrtieve data for our city pool with a getCity function. 

2. Then, in cityList function we created an array of random cities.

3. Next, we used math.random to generate images, city details and other relevant info.

4. getStorage function saves retrieved city info in the local storage.

5. Renders generated info from the local storage to the webpage.

6. for loop iterates through all items in the array and renders them to the page.

7. spin button starts the function on click.


SHOULD WE ADD SCREENSHOTS OF THE CODE?!?!


### Weather forcasting

1. We use querySelector to input the city and apply it in the next function.

2. getWeatherInfo function leverages API to retrieve information on current weather in the searched city.

3. getForecast function provides the user with the weather forecast for the whole, next week.


### Travel Info

1. querySelector is used to retrieve the data after the user clicks the submit button.

2. Then on click, the program starts the function requestData that uses if statement with alert to ask the user for data and provide with the relevant answer in response.

3. Following that, the program leverages API to retrieve the data on hotels, based on a city choice and provide with a hotel from booking.com

BULLET POINT STRUCTURE, OR BLOCKS OF TEXT?!?!

HOMEPAGE SCREENSHOT WILL GO HERE: