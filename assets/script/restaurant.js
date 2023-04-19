
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '9b263f569amshba731ad5fc34b0ap196c9bjsn10d532f596cc',
		'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
	}
};
var cityName = "toronto"

fetch('https://travel-advisor.p.rapidapi.com/locations/search?query='+ cityName +'&limit=30&offset=0&units=km&location_id=1&currency=USD&sort=relevance&lang=en_US', options)
	.then(response => response.json())
	.then(data => {
        console.log(data);
        var destIdRes = data[0].result_object.location_id
    })
	.catch(err => console.error(err));





// fetch('https://booking-com.p.rapidapi.com/v1/hotels/locations?name='+ cityName +'&locale=en-gb', options)
// 	.then(response => response.json())
// 	.then(data => {
//         console.log(data);
//         var destId = data[0].dest_id

//     fetch('https://booking-com.p.rapidapi.com/v1/hotels/search?checkin_date=2023-09-27&dest_type=city&units=metric&checkout_date=2023-09-28&adults_number=2&order_by=popularity&dest_id='+ destId +'&filter_by_currency=AED&locale=en-gb&room_number=1&children_number=2&children_ages=5%2C0&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1&page_number=0&include_adjacency=true', options)
//         .then(response => response.json())
//         .then(data => {
            
//             hotelInfo();

//             function hotelInfo () {
            
//                 for(var i = 0; i < 8; i++) {

//                     var infoList = document.getElementById("infoList");

//                     var hotelName = document.createElement('p');
//                     hotelName.setAttribute("id", "hotelName");
//                     hotelName.setAttribute("style", "font-size: 30px; font-weight: 600")
//                     infoList.appendChild(hotelName);

//                     var hotelImg = document.createElement('img');
//                     hotelImg.setAttribute("id", "image");
//                     infoList.appendChild(hotelImg);

//                     var hotelAddr = document.createElement('p');
//                     hotelAddr.setAttribute("id", "hotelAddr");
//                     infoList.appendChild(hotelAddr);

//                     var reviewScore = document.createElement('p');
//                     reviewScore.setAttribute("id", "reviewScore");
//                     infoList.appendChild(reviewScore);

//                     var price = document.createElement("p");
//                     price.setAttribute("id", "price");
//                     infoList.appendChild(price);

//                     var hotelUrl = document.createElement('a');
//                     hotelUrl.setAttribute("id","hotelUrL");
//                     infoList.appendChild(hotelUrl);

//                     console.log(data);
                    
//                     hotelImg.setAttribute("style", 'width: 400px');
//                     hotelImg.setAttribute("src", data.result[i].max_photo_url);
//                     hotelName.innerHTML = data.result[i].hotel_name;
//                     hotelAddr.innerHTML = data.result[i].address + ", " + data.result[i].city;
//                     hotelUrl.innerHTML = data.result[i].url;
//                     hotelUrl.setAttribute("href", data.result[i].url);
//                     reviewScore.innerHTML = "Review Score: " + data.result[i].review_score;
//                     price.innerHTML = "All Inclusive Price: " + data.result[i].price_breakdown.gross_price + " " + data.result[i].price_breakdown.currency;
//                 }
//             }
//         })
//     })
    
    
    
