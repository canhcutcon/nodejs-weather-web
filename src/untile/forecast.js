const request = require('request');

const forecast = (latitude, longtitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=fa807b29b21346c47ee573bd9eac2caa&query=' + latitude + ',' + longtitude + '&units=m';

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to server!", undefined);
        } else if (body.error) {
            callback('Unable to find location!', undefined);
        } else {
            callback(undefined, {
                temperature: body.current.temperature,
                precip: body.current.precip
            });
        }
    })
}

module.exports = forecast;