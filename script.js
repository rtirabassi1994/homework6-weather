

// //declare your api key as a global variable
var apiKey = "d59832120efe0beac1c8d9640880067c";
// //declare and queries as a variable
// var input1 = $("#city-search").val()
// var forecastQuery = "https://api.openweathermap.org/data/2.5/weather?q=" + input1 + "&appid=" + apiKey;
// var fiveDayQuery = "";
// var uvQuery = "http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={API key}"

$("#search-input").on("click", function(){
    //declare and queries as a variable
    var input1 = $("#city-search").val()
    var forecastQuery = "https://api.openweathermap.org/data/2.5/weather?q=" + input1 + "&appid=" + apiKey;
    $.ajax({
        type: "GET",
        url: forecastQuery
    }).then(function(response){
        console.log(response);
        console.log(response.name);
        var fTemp = convertTemp(response.main.temp);

        var forecastBlock =`<h1>${response.name}</h1>`
        var weatherBlock = `<div class="jumbotron jumbotron-fluid">
        <div class="container">
        <h1>${response.name}</h1> 
        <h2 class="display-4">${fTemp} \u00B0 F</h2>
        <p class="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
        </div>
      </div>`

        $("#history-column").html(forecastBlock);
        console.log(weatherBlock)
        $("#weather-forecast").html(weatherBlock);
        //fiveDayForecast(userInput);
        //uvIndex(response.coord.lat, response.coord.lon);
    })

});
//make your api calls as functions
// function getForecast(userInput){
    // $.ajax({
    //     type: "GET",
    //     url: forecastQuery + userInput + apiKey
    // }).then(function(response){
    //     console.log(response);
    //     console.log(response.name);

    //     var forecastBlock =`<h1>${response.name}</h1>`

    //     $("#history-column").html(forecastBlock);
    //     //fiveDayForecast(userInput);
    //     //uvIndex(response.coord.lat, response.coord.lon);
    // })
// }

function fiveDayForecast(userInput){

}

function uvIndex(lat, lon){
    uvQuery = "http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={API key}"


}

$(document).ready(function(){

    // $("#search-input").on("click", getForecast(input1));
    //when the user clicks search, take input value and store to variable
    //clear the input box
    //call your getForecast function with the user input value
    // getForecast(input1);
    //make a button/list item for the history search

})

function convertTemp(kelvin){
    var cel = kelvin - 273.15;
    return Math.round(cel * 9/5 + 32)
}
