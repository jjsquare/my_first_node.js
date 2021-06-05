const express = require("express");
const datastore = require("nedb");
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.listen(3000, () => console.log("listening at port 3000"));
app.use(express.static('public'))
app.use(express.json())

const database = new datastore('database.db');
database.loadDatabase();

app.get('/api', (request, response) => {
    database.find({}, (err, data) => {
        if(err){
            response.end();
            return;
        }
        response.json(data);
    })
    
});

app.post('/api',(request, response) => {
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    console.log(data);
    response.json({
        status: "success",
        timestamp: timestamp,
        latitude: data.lat,
        longitude: data.lng,
        Name : data.name_of_client,
    });
})

app.get('/weather/:latlng',async  (request,response) => {
    // console.log(request);
    const latlng = request.params.latlng.split(',');
    const lat = latlng[0];
    const lng = latlng[1];
    const API_key = process.env.API_key;
    const api_url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=hourly,daily&appid=${API_key}`
    const fetch_response = await fetch(api_url);
    const data_from_api = await fetch_response.json();
    response.json(data_from_api);
});