$(document).ready(function(){
  

$("#citySearch").on("click", function(){
  

var city = $("#cityInput").val();
var key =  "debb58b88aa0bc449e88ba80f54e04e0";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key;

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
      console.log(response)
      $("#city").text(response.name);
      $("#wind").text(response.wind.speed)
      $("#humidity").text(response.main.humidity)

  })
    


})

    









 






})