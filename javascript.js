// jQuery initial setup of application
var days = 0, temperature, humidty, windSpeed, lat, lon, uv, icon, cityInput, lastSelectedState;
$( window ).on( "load", firstData(cityInput) );

// firstData() loads once on load of the program to set intitial setting for the application
// sets columbus as the first city and allows for other quick cities to be chosen as well as
// seperate city can be submitted
function firstData(input) {
    // sets intial city to columbus
    let stateStore = JSON.parse(localStorage.getItem("lastSelectedState"));
    if (input==null ) {
    input = "columbus";
        if (stateStore !== null){
        input = stateStore;
        }
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
        $(".cityName").text(response.name + " (" + moment(response.dateChecked).format("dddd hh:00 A  ") + ")");
        var iconDisplay = $("<img>").attr("src", iconURL)
        $(".cityIcon").empty();
        $(".cityIcon").append(iconDisplay);
        
        //adds variable relevant to time and weather
        // $(".todayDate").text(moment(response.dateChecked).format("dddd hh:00 A  ") );
        $(".main").text(response.weather[0].main);
        $(".temp").text("Temperature: "+ response.main.temp + " °F");
        $(".humidity").text("Humidity: " + response.main.humidity + "%");
        $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");
        
        lon = response.coord.lon;
        lat = response.coord.lat;
        getUV(lat,lon);

        // $(".everyday").each(function(index) {
        //     this.empty();
        // });
     
        setFiveDay();

    })
    console.log("pre");
    localStorage.setItem("lastSelectedState", JSON.stringify(input));
    console.log("post");
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

function getUV(lt, ln){
var uvURL= "http://api.openweathermap.org/data/2.5/uvi?lat=" + lt + "&lon=" + ln + "&appid=c8d528298be5665ca591ee78f5afcc10";
$.ajax({url:uvURL , method: "GET"}).then(function(response) {
    uv = response.value;
    
    
    
    $(".uvText").text("UV index: ");
    $(".uvValue").text(uv);
   
 
    //  if (uv <= 8)
     $(".uvValue").html() >= 8 ? $(".uvValue").css('background-color','red') : null;
    $(".uvValue").html() >= 6 && $(".uvValue").html() < 8 ? $(".uvValue").css('background-color','orange') : null;
    $(".uvValue").html() >= 3 && $(".uvValue").html() <6 ? $(".uvValue").css('background-color','yellow') : null;
    $(".uvValue").html() <2 ? $(".uvValue").css('background-color','green') : null;
    });
}

function setFiveDay() {
    // pulls daily weather for city
    var fiveURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat+ "&lon=" + lon + "&exclude=current,minutely,hourly,alerts&units=imperial&appid=c8d528298be5665ca591ee78f5afcc10"; 
    days = 0;
    
    // test for five day pull
    $.ajax({url:fiveURL , method: "GET"}).then(function(response) {
        // console.log(response);
        //populates five day weather forecast
        $(".everyday").each(function(index) {
            
            days += 1;
            let dailyTemp = response.daily[days].temp.day;
             let dailyHumidity = response.daily[days].humidity;
           
            iconName= response.daily[days].weather[0].icon;
            iconURL = "http://openweathermap.org/img/w/" + iconName + ".png";
            iconDisplay = $("<img>").attr("src", iconURL);
            //temp log for days
            // console.log(response.daily[days]);
            // var everyday = moment().day(days).format("dddd");
            var nameOfDay = moment().add(days, 'day').format("dddd");
            
            nameOfDay = nameOfDay.substring(0,3);
            $(this).empty();
            $(this).append(nameOfDay);
            $(this).append(iconDisplay);
            $(this).append($("<p>").text("Temp: " + dailyTemp + "°F"));
            $(this).append($("<p>").text("Humidity: " + dailyHumidity + "%"));
        });
    });
}
