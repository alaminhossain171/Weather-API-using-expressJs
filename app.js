const express = require('express');
var bodyParser = require('body-parser');
const https = require('https');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))


app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res) {

    const city = req.body.cityInput;
    const key = "4f9dea48410dc751b32aed708cbb2181&";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key + "units=" + unit + "";

    https.get(url, function(response) {
        console.log(response.statusCode);
        response.on("data", function(data) {
            const weather = JSON.parse(data);
            const temp = weather.main.temp;
            console.log(temp);
            const disc = weather.weather[0].description;
            console.log(disc);
            const img = weather.weather[0].icon;
            const imgurl = " http://openweathermap.org/img/wn/" + img + "@2x.png"
            res.write("<h1>Temperature in " + city + "   is :" + temp + " degree celcius </h1>");
            res.write("<h3>Currently weather is: " + disc + "</h3>")
            res.write("<img src=" + imgurl + ">")
            res.send();
        })
    })


})



app.listen(3000, function(req, res) {
    console.log("app running at the port 3000");
})