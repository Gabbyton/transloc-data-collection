var axios = require("axios").default;
const dotenv = require('dotenv');
dotenv.config();

module.exports.getVehicles = async() => {
    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}

var options = {
    method: 'GET',
    url: 'https://transloc-api-1-2.p.rapidapi.com/arrival-estimates.json',
    params: {
        agencies: '1199',
        callback: 'call'
    },
    headers: {
        'x-rapidapi-key': process.env.API_KEY,
        'x-rapidapi-host': 'transloc-api-1-2.p.rapidapi.com'
    }
};