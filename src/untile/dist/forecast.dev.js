"use strict";

var request = require('request');

var forecast = function forecast(latitude, longtitude, callback) {
  var url = 'http://api.weatherstack.com/current?access_key=fa807b29b21346c47ee573bd9eac2caa&query=' + latitude + ',' + longtitude + '&units=m';
  request({
    url: url,
    json: true
  }, function (error, _ref) {
    var body = _ref.body;

    if (error) {
      callback("Unable to connect to server!", undefined);
    } else if (body.error) {
      callback('Unable to find location!', undefined);
    } else {
      callback(undefined, {
        temperature: body.current.temperature,
        precip: body.current.precip,
        localtime: body.location.localtime,
        description: body.current.weather_descriptions[0]
      });
    }
  });
};

module.exports = forecast;