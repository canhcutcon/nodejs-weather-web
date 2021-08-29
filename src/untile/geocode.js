const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?types=address&access_token=pk.eyJ1IjoiY2FuaGN1dGNvbjIzIiwiYSI6ImNrc3N0MGJzaTB6bHMycG9kdHpqMm5kam8ifQ.zgBR77JQl4Qi6jNggDz4MQ';
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect the server!!', undefined); // loi wifi
        } else if (body.error) {
            callback('Unable to find location!', undefined);
        } else if (body.features.lenght === 0) {
            callback('Unkhonw address', undefined);
        } else {
            callback(undefined, {
                nameplace: body.features[0].place_name,
                latitude: body.features[0].center[0],
                longtitude: body.features[0].center[1]
            });
        }
    })
}

module.exports = geocode;