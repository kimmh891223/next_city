const submitBtn = document.querySelector(".submit-btn");
submitBtn.addEventListener("click", requestData);
function requestData(e) {
    var country = document.querySelector("input[name='country']").value;
    var city = document.querySelector("input[name='city']").value;

    if (!country || !city) {
        alert("Please, eneter country and city");
        return;
    }

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '097fd673a7msh7f511efd9cb5a26p13097cjsnaf0f7f767f24',
            'X-RapidAPI-Host': 'best-booking-com-hotel.p.rapidapi.com'
        }
    };

    fetch('https://best-booking-com-hotel.p.rapidapi.com/booking/best-accommodation?cityName='+city+'&countryName='+country, options)
        .then(response => response.json())
        .then(response => {
            var resultCnt = document.querySelector(".result");
            resultCnt.innerHTML = '<h3>'+response.name+'</h3>';
            resultCnt.innerHTML += '<a href='+response.link+' target="_blank">Visit hotel website</a>';
            resultCnt.innerHTML += '<p>Hotel rating: '+response.rating+'</p>';
        })
        .catch(err => console.error(err));
}