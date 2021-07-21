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

setInterval(() => {
    axios.request(options).then(function (response) {
        const timestamp = response.data.generated_on;
        console.log(`timestamp: ${timestamp}`);
        console.log(response.data);
        const vehicles = response.data["data"]["1199"];
        console.log(`vehicles: ${vehicles}`);
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
        console.log('[ERROR]:\t\tcould not connect to transloc API.');
        console.log(error);
    });
}, 500);