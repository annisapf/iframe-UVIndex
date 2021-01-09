
var APIKey = "3d44e735d54eb161a90e34a5ec76979e";



//Function .on("click") to trigger AJAX call
$('#find-city').on("click", function (event) {
    event.preventDefault();
    getWeatherTodayButton();

});


function getWeatherTodayButton() {

    var cityInput = $("#city-input").val();

    getWeatherToday(cityInput, "new");

}


function getWeatherToday(cityInput, callType) {


    //clear for new search result
    $("#weather-result").html("");


    // Query the database
    // var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=" + APIKey;
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + cityInput + ",AU&appid=" + APIKey;


    var cityLat;
    var cityLon;

    $.ajax({
        url: queryURL,
        method: "GET"
    })


        .then(function (response) {


            var currentDate = "Today";


            //Create div for weather
            var weatherDiv = $('<div class="weatherdiv">');



            var city = $("<p>").html("<h3>" + response.name + " (" + currentDate + ")");


            weatherDiv.append(city);


            $("#weather-result").prepend(city);


            cityLat = response.coord.lat;
            cityLon = response.coord.lon;

            getUVInd(APIKey, cityLat, cityLon);


        })
}


//Function to get UV Index
function getUVInd(APIKey, cityLat, cityLon) {

    var queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?lat=" + cityLat + "&lon=" + cityLon + "&appid=" + APIKey;



    $.ajax({
        url: queryURLUV,
        method: "GET"
    })

        .then(function (response) {

            console.log(response);

            //Create div for weather
            var weatherDiv = $('<div class="weatherdiv">');


            var uvInd = $('<p>').html("UV Index: " + "<span class='badge badge-danger p-2'>" + response.value + "</span>");

            weatherDiv.append(uvInd);

            $("#weather-result").append(uvInd);
        })
}

function getWeatherForecastButton(APIKey) {
    var cityInput = $("#city-input").val();
    getWeatherForecast(cityInput, APIKey)
}


function getWeatherForecast(cityInput, APIKey) {

    //clear for new search result
    $("#weather-forecast").html("");


    var queryURLFor = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&units=imperial&appid=" + APIKey;


    $.ajax({
        url: queryURLFor,
        method: "GET",

    })

        .then(function (response) {


            var getForInfo = response.list;


            //divide by 8 since API updates weather every 3 hours a day
            for (var i = 1; i <= getForInfo.length / 8; i++) {

                var getIcon = getForInfo[i * 7].weather[0].icon;

                //get epoch time and convert to date
                var getForDate = getForInfo[i * 7].dt * 1000;
                var getWeatherDate = new Date(getForDate).getDate();
                var getWeatherMonth = new Date(getForDate).getMonth();
                var getWeatherYear = new Date(getForDate).getFullYear();


                //create card body
                var cardWeather = $('<div>').attr({ "class": "card bg-info shadow m-4 flex-container" });

                var cardBodyWeather = $('<div>').attr({ "class": "card-body" });
                var iconURL = $('<img>').attr({ "src": "https://openweathermap.org/img/w/" + getIcon + ".png" });

                var weatherForDate = $('<p>').html(getWeatherMonth + "/" + getWeatherDate + "/" + getWeatherYear);


                var weatherIcon = $("<p>").append(iconURL);


                cardBodyWeather.append(weatherForDate, weatherIcon);

                cardWeather.append(cardBodyWeather);
                $("#weather-forecast").append(cardWeather);


            }


        })

}


