
$(document).ready(function () {
  $(".cityBlock1").hide()
 
  
  var data = JSON.parse(localStorage.getItem('city'))
   
  if(data === null){
    data = []
  }

  for (var i = 0; i < data.length; i++) {

    
    $(".contentContainer").append("<div class='d-flex align-items-center justify-content-center cityBlock'>" + data[i] + "</div>")

  }

 newFunction = ()=>{

    var cities = JSON.parse(localStorage.getItem('city'));

    var city = $("#cityInput").val();
    var cityCaps = city.toUpperCase();
    var key = "debb58b88aa0bc449e88ba80f54e04e0";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + key;

    cities.unshift(cityCaps);

  if(cities.length > 10){
    cities.pop()
  }
  

    localStorage.setItem("city", JSON.stringify(cities));


    const data = JSON.parse(localStorage.getItem('city'));

    $(".contentContainer").empty();

    for (var i = 0; i < data.length; i++) {
      // var cityVal = localStorage.getItem("city")
      $(".contentContainer").append("<div class='d-flex align-items-center justify-content-center cityBlock'>" + data[i] + "</div>")


    }


    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      

      $("#city").text(response.name);
      $("#wind").text(response.wind.speed);
      $("#humidity").text(response.main.humidity + "%");
      $("#temp").text(response.main.temp + " ºF");


      var iconCode = response.weather[0].icon;
      var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
      $("#city").append("<img src=" + iconUrl + ">");


      var uvLAT = response.coord.lat;
      var uvLON = response.coord.lon;
      var key = "debb58b88aa0bc449e88ba80f54e04e0";


      var uvURL = "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=" + key + "&lat=" + uvLAT + "&lon=" + uvLON;

      $.ajax({
        url: uvURL,
        method: "GET"
      }).then(function (response) {
        $("#uvIndex").text(response[0].value)
        // console.log(response)

        url5Day = "http://api.openweathermap.org/data/2.5/forecast?appid=" + key + "&lat=" + uvLAT + "&lon=" + uvLON + "&units=imperial";

        $.ajax({
          url: url5Day,
          method: "GET"
        }).then(function (response) {
          console.log(response)


          $("#cardDate1").text(moment().format('l'));
          $("#cardDate1").append("<br><img src=http://openweathermap.org/img/w/" + response.list[0].weather[0].icon + ".png>");
          $("#cardTemp1").text(response.list[0].main.temp + " ºF");
          $("#cardHumidity1").text(response.list[0].main.humidity + " %");

          $("#cardDate2").text(moment().add(1, 'days').format('l'));
          $("#cardDate2").append("<br><img src=http://openweathermap.org/img/w/" + response.list[6].weather[0].icon + ".png>");
          $("#cardTemp2").text(response.list[6].main.temp + " ºF");
          $("#cardHumidity2").text(response.list[6].main.humidity);

          $("#cardDate3").text(moment().add(2, 'days').format('l'));
          $("#cardDate3").append("<br><img src=http://openweathermap.org/img/w/" + response.list[14].weather[0].icon + ".png>");
          $("#cardTemp3").text(response.list[14].main.temp + " ºF");
          $("#cardHumidity3").text(response.list[14].main.humidity);

          $("#cardDate4").text(moment().add(3, 'days').format('l'));
          $("#cardDate4").append("<br><img src=http://openweathermap.org/img/w/" + response.list[22].weather[0].icon + ".png>")
          $("#cardTemp4").text(response.list[22].main.temp + " ºF");
          $("#cardHumidity4").text(response.list[22].main.humidity);

          $("#cardDate5").text(moment().add(4, 'days').format('l'));
          $("#cardDate5").append("<br><img src=http://openweathermap.org/img/w/" + response.list[30].weather[0].icon + ".png>")
          $("#cardTemp5").text(response.list[30].main.temp + " ºF");
          $("#cardHumidity5").text(response.list[30].main.humidity);


        })

      })

    })

  }
  $("#citySearch").on("click", newFunction)
  
})