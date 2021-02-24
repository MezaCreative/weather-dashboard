// jQuery initial setup of application
var temperature, humidty, windSpeed, lat, lon, icon, cityInput;
$( window ).on( "load", firstData(cityInput) );





// firstData() loads once on load of the program to set intitial setting for the application
// sets columbus as the first city and allows for other quick cities to be chosen as well as
// seperate zip can be submitted
function firstData(input) {
    // sets intial zip to columbus
    if (input==null ) {
    input = "columbus";
    }

 
 var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + input + "&units=imperial&appid=c8d528298be5665ca591ee78f5afcc10";
console.log( queryURL);
 
// Call openweathermap.org API with the city selected by the user from the search box
var ajaxOptions = {
    url: queryURL,
    method: "GET"
};

$.ajax(ajaxOptions).then(function(response) {
    var iconName = response.weather[0].icon;
    var iconURL = "http://openweathermap.org/img/w/" + iconName + ".png";
    // var iconDisplay = $("<img>").attr("src", iconURL);

    $(".cityName").text(response.name + " ");
    var iconDisplay = $("<img>").attr("src", iconURL)
    $(".cityIcon").empty();
    $(".cityIcon").append(iconDisplay);
    
    // $(".cityName").attr("src", iconURL);
    $(".todayDate").text(moment(response.dateChecked).format("dddd HH:00 A  ") );
    $(".main").text(response.weather[0].main);
    $(".temp").text("Temperature: "+ response.main.temp + " F");
    $(".humidity").text("Humidity: " + response.main.humidity);
    $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");
    console.log(response);
})
}
// $(document).on("click", "#searchBtn", function(event)
 
$("#searchBtn").on("click", function(event) {
    
    console.log("it works!");
    let searchedCity = $("#city").val().trim();
console.log(`The searched city is ` + searchedCity);
    firstData(searchedCity);
});

$(".cityBtn").each(function(index) {
    $(this).on("click", function(event) {
    console.log("city button works!");
    let clickedCity = $(this).text();
    console.log(clickedCity);
    firstData(clickedCity);
});
});



// $("cityBtn").on("click", function(event){
//     console.log("city button works!");
// } )