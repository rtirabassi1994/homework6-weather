var apiKey = "d59832120efe0beac1c8d9640880067c";

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
            <h1>${cityName}</h1>
            <h2>${parseInt(date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear()}</h2>
            <h2 class="display-4">${fTemp}</h2>
            <p>Humidity: ${humidity}\u0025</p>
            <p>Wind Speed: ${windSpeed} MPH</p>
            <p>UV Index: ${uvIndex}</p>
            </div>
            </div>`

            // $("#history-column").html(forecastBlock);
            console.log(weatherBlock)
            $("#weather-forecast").html(weatherBlock);

        })

        console.log(lat);
        console.log(long);
        fiveDayForecast(lat, long);
        
    })

});

function fiveDayForecast(lat, long){
    var fiveDayForecastUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+long+"&appid="+apiKey;
    $.ajax({
        url: fiveDayForecastUrl,
        method: "GET"
    }).then(function(response){
        console.log(response);

        
        var date = new Date();

        
        var fiveDayForecastTitle = $("<h2>5-Day Forecast:</h2>");
        

        $("#outterContainer").append(fiveDayForecastTitle);
        var cardRow = $("<div>");
        cardRow.addClass("row");

        for(var i = 0; i < 5; i++) {
            var futureTemp = convertTemp(response.daily[i+1].temp.day);
            var futureHumidity = response.daily[i+1].humidity;

            var nextDay = date.getDate() + (i+1);
            var futureDate = new Date();
            futureDate.setDate(nextDay);

            var card = $("<div>");
            card.addClass("card");
            card.css("width","20%");

            var cardBody = $("<div>");
            cardBody.addClass("card-body");
            cardBody.text(parseInt(futureDate.getMonth()+1)+"/"+futureDate.getDate()+"/"+futureDate.getFullYear());
            cardBody.append("<br>");
            cardBody.append("Temp: "+futureTemp);
            cardBody.append("<br>");
            cardBody.append("Humidity: "+futureHumidity +"%");

            card.append(cardBody);

            $(cardRow).append(card);
        }
        $("#outterContainer").append(cardRow);

    })
}

// function uvIndex(lat, lon){
//     uvQuery = "http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={API key}"


// }

// $(document).ready(function(){

//     // $("#search-input").on("click", getForecast(input1));
//     //when the user clicks search, take input value and store to variable
//     //clear the input box
//     //call your getForecast function with the user input value
//     // getForecast(input1);
//     //make a button/list item for the history search

// })

function convertTemp(kelvin){
    var cel = kelvin - 273.15;
    return Math.round(cel * 9/5 + 32)+"\u00B0F"
}
