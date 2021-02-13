// jQuery initial setup of application
$( window ).on( "load", firstData );




$(document).on("click", ".searchBtn", function(event) {

});

// firstData() loads once on load of the program to set intitial setting for the application
// sets columbus as the first city and allows for other quick cities to be chosen as well as
// seperate zip can be submitted
function firstData() {
    // sets intial zip to columbus
 let cityInput = "columbus";
 var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=c8d528298be5665ca591ee78f5afcc10";

 
// Call openweathermap.org API with the city selected by the user from the search box
var ajaxOptions = {
    url: queryURL,
    method: "GET"
};

$.ajax(ajaxOptions).then(function(response) {
    console.log("test");
    console.log(response);
    console.log(response.weather);
})
}