var axios = require("axios").default;
const dotenv = require('dotenv');
const mongo = require('./mongo');
dotenv.config();

var options = {
    method: 'GET',
    url: 'https://transloc-api-1-2.p.rapidapi.com/vehicles.json',
    params: {
        agencies: '1199',
        callback: 'call'
    },
    headers: {
        'x-rapidapi-key': process.env.API_KEY,
        'x-rapidapi-host': 'transloc-api-1-2.p.rapidapi.com'
    }
};

const healthLogInterval = 300000;
const positionResolution = 500;

setInterval(() => {
    console.log(`[TIMESTAMP]: ${new Date().toUTCString()}`);
}, healthLogInterval);

setInterval(() => {
    axios.request(options).then(function (response) {
        const timestamp = response.data.generated_on;
        const vehicles = response.data["data"]["1199"];
        for (const vehicle of vehicles) {
            mongo.addData({
                time: timestamp,
                vehicle_id: vehicle.vehicle_id,
                route_id: vehicle.route_id,
                lat: vehicle.location.lat,
                lng: vehicle.location.lng,
                speed: vehicle.speed,
                heading: vehicle.heading,
                last_updated_on: vehicle.last_updated_on,
            });
        }
    }).catch(function (error) {
        console.log(`${new Date().toUTCString()} - [ERROR]:\t\ttrouble accessing transloc API.`);
        console.log(error);
    });
}, positionResolution);