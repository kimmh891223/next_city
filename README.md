# Random City Generator Project


## About the Application
The purpose of this application is to generate the random city upon the request of the user. The button on the main page triggers the proccess.
of generating random city. Further more, if the user is interested in randomly selected city, then the user is provided with pages for weather and hotel booking.
The weather page will provide the user with weather forcasting for a whole week with a daily breakdown by date. The booking page will provide the list of avaliable hotels and also a link to booking.com website, where the user
will be able to book a disered hotel.


## Functionality


### Random city generator

This is the function of the main page of our app and it provides the user with a city of random choice, leveraging teleport.org api of a pool of cities. All the user is required to do is click the button spin and this will start the function. If the user is not satisfied with the random choice, he can click the button again and the new city will be chosen for a user.

1. We used teleport.org api to retrtieve data for our city pool with a getCity function. 

2. Then, in cityList function we created an array of random cities.

3. Next, we used math.random to generate images, city details and other relevant info.

4. getStorage function saves retrieved city info in the local storage.

5. Renders generated info from the local storage to the webpage.

6. for loop iterates through all items in the array and renders them to the page.

7. spin button starts the function on click.


### Travel Info

Here, the user is provided with a hotel information of the chosen city. This page shows a list of hotels and re-directs the user to booking.com website, where the user will be able to make booking of a desired accomodation.

1. var cityName is used for a chosen city.

2. hotelInfo function uses for loop to go and variable infoList to go through the list of hotels and provide the user with the result of 8 hotels, and also display to the user name, price, address, image and url for each of those hotels.


### Weather Forcasting

This page hosts a weather dashboard, where the user can check out a local weather of a chosen city, along with a weather forcasting up to 5 days. From functional perspective, the weather information page consits of:

1. current weather info:
getWeatherInfo function fetches an api provided in apiUrl, uses data from it to then render to the user on the page data such as: destination, current temperature, feels like temperature etc.

2. getForecast:
function leverages the same api to provide the user with the weather forecast for five days, using for loop.


HOMEPAGE SCREENSHOT WILL GO HERE: