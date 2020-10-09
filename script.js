

var apiKey = "d59832120efe0beac1c8d9640880067c";
// //declare and queries as a variable


$("#search-input").on("click", function(){
    var input1 = $("#city-search").val()
    var forecastQuery = "https://api.openweathermap.org/data/2.5/weather?q=" + input1 + "&appid=" + apiKey;
    $.ajax({
        type: "GET",
        url: forecastQuery
    }).then(function(response){
        console.log(response);
        console.log(response.name);
        var cityName = response.name;
        var fTemp = convertTemp(response.main.temp);
        var humidity = response.main.humidity;
        var windSpeed = response.wind.speed;
        var date = new Date();
        
        var lat = response.coord.lat;
        var long = response.coord.lon;
        var uvQuery = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + long +"&appid=" +apiKey;
        $.ajax({
            url: uvQuery,
            method: "GET"
        }).then(function(response){
            console.log(response);
            var uvIndex = response.value;

        
        
            // var forecastBlock =`<h1>${cityName}</h1>`
            var weatherBlock = `<div class="jumbotron jumbotron-fluid">
            <div class="container">
            <h1>${cityName} (${parseInt(date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear()})</h1> 
            <h2 class="display-4">${fTemp}\u00B0F</h2>
            <p>Humidity: ${humidity}\u0025</p>
            <p>Wind Speed: ${windSpeed} MPH</p>
            <p>UV Index: ${uvIndex}</p>
            </div>
            </div>`

            // $("#history-column").html(forecastBlock);
            // console.log(weatherBlock)
            $("#weather-forecast").html(weatherBlock);

        })
        
        //fiveDayForecast(userInput);
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
    // var fiveDayQuery = "api.openweathermap.org/data/2.5/forecast?q=" + {city name}+ "&appid" + apiKey;
    var fiveDayQuery = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&appid=" + apiKey;
    $.ajax({
        type: "GET",
        url: fiveDayQuery
    }).then(function(response){
        console.log(response);

})}


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


// will probably be able to delete