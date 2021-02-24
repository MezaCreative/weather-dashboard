// jQuery initial setup of application
var days = 0, temperature, humidty, windSpeed, lat, lon, icon, cityInput;
$( window ).on( "load", firstData(cityInput) );





// firstData() loads once on load of the program to set intitial setting for the application
// sets columbus as the first city and allows for other quick cities to be chosen as well as
// seperate zip can be submitted
function firstData(input) {
    // sets intial zip to columbus
    if (input==null ) {
    input = "columbus";
    }

 //pulls info from api
 var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + input + "&units=imperial&appid=c8d528298be5665ca591ee78f5afcc10";
//    "https://api.openweathermap.org/data/2.5/forecast/daily?q=" +  input  + "&cnt=5&appid=c8d528298be5665ca591ee78f5afcc10";

 


// Call openweathermap.org API with the city selected by the user from the search box
var ajaxOptions = {
    url: queryURL,
    method: "GET"
};

$.ajax(ajaxOptions).then(function(response) {
    var iconName = response.weather[0].icon;
    var iconURL = "http://openweathermap.org/img/w/" + iconName + ".png";
    
    // pulls weather icon and attaches by the name
    $(".cityName").text(response.name + " ");
    var iconDisplay = $("<img>").attr("src", iconURL)
    $(".cityIcon").empty();
    $(".cityIcon").append(iconDisplay);
    
    //adds variable relevant to time and weather
    $(".todayDate").text(moment(response.dateChecked).format("dddd hh:00 A  ") );
    $(".main").text(response.weather[0].main);
    $(".temp").text("Temperature: "+ response.main.temp + " F");
    $(".humidity").text("Humidity: " + response.main.humidity);
    $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");
   
   lon = response.coord.lon;
   lat = response.coord.lat;
    setFiveDay();

})
}

 // Populates info based after the search button is clicked
$("#searchBtn").on("click", function(event) {
    
   
    let searchedCity = $("#city").val().trim();
console.log(`The searched city is ` + searchedCity);
    firstData(searchedCity);
});

// Populates info based on the preset city buttons
$(".cityBtn").each(function(index) {
    $(this).on("click", function(event) {
  
    let clickedCity = $(this).text();
    console.log(clickedCity);
    firstData(clickedCity);
});
});

function setFiveDay() {
// pulls daily weather for city
var fiveURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat+ "&lon=" + lon + "&exclude=current,minutely,hourly,alerts&units=imperial&appid=c8d528298be5665ca591ee78f5afcc10"; 

// test for five day pull
$.ajax({url:fiveURL , method: "GET"}).then(function(response) {


    //populates five day weather forecast
    $(".everyday").each(function(index) {
        days += 1;
        let dailyTemp = response.daily[days].temp.day;
        console.log(dailyTemp);
        // var everyday = moment().day(days).format("dddd");
        var nameOfDay = moment().add(days, 'day').format("dddd");
        nameOfDay = nameOfDay.substring(0,3);
        
        $(this).append(nameOfDay);
        $(this).append($("<p>").text(dailyTemp + "°"));
    });



});


}
