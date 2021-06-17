const express = require('express');
const https = require('https');
const app = express();

const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extended: true }));

app.listen(3000, function () {
    console.log("The server has started at port 3000 ");
});


app.get("/", function (request, response) {
    response.sendFile(__dirname + "/index.html");
});

app.post("/", function (request, response) {
    // console.log(request.body.cityname);
    // response.send("this is work proper");

    var cityname = request.body.cityname;
    const apikey = "e2c9c811ced8aee3e193f1f1a10f1969";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=" + apikey + "&units=metric";


    https.get(url, function (res) {
        // console.log(res);

        //A chunk of data has been recieved.
        res.on("data", (data) => {
            // console.log(data);

            var weatherinfo = JSON.parse(data);
            // console.log(weatherinfo);
            var weather = weatherinfo.weather[0].main;
            // console.log(weather);
            var weatherTemp = weatherinfo.main.temp;
            // console.log(weatherTemp);
            var palce = weatherinfo.name;
            var icon = weatherinfo.weather[0].icon;
            var iconImgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            response.write(`
            
                <br><br><br>
                <center>
                    <h1>Weather Result</h1>
                </center>
                <br><br><br>

            `);

            response.write(`
            <center>
                <h1> <u>${palce}</u> has the weather <u><b>${weather}</b></u> </h1>
            </center>
            `);

            response.write(`
            <center>
                <h2>The temperature in <u>${palce}</u> is <u><b>${weatherTemp}</b></u> degree Celcius</h2>
            </center>
            `);

            response.write(`
            <center>
                <img src=${iconImgURL} alt="${palce}'s weather icon">
            </center>
            `)

            response.write(`
            <center>
                <button onclick="history.back()">Back to search</button>
            </center>
            `)

            

            response.send();

        })

    });




});

