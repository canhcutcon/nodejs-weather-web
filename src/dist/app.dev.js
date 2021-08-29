"use strict";

var request = require('request');

var express = require('express');

var path = require('path');

var app = express();

var hbs = require('hbs');

var geocode = require('./untile/geocode');

var forecast = require('./untile/forecast');

var port = process.env.PORT || 3000;
var publicDirectoryPath = path.join(__dirname, '../public');
var viewDirectoryPath = path.join(__dirname, '../template/views');
var partialPath = path.join(__dirname, '../template/partial');
app.set('view engine', 'hbs');
app.set('views', viewDirectoryPath);
app.use(express["static"](publicDirectoryPath));
hbs.registerPartials(partialPath);
app.get('', function (req, res) {
  res.render('index', {
    title: 'INDEX PAGE',
    name: 'CANHCUTCON'
  });
});
app.get('/about', function (req, res) {
  res.render('about', {
    title: 'ABOUT PAGE',
    name: 'CANHCUTCON'
  });
});
app.get('/weather', function (req, res) {
  //the query string
  var address = req.query.address;

  if (!address) {
    res.send({
      error: 'You must return an adress!'
    });
  }

  geocode(address, function (error) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        latitude = _ref.latitude,
        longtitude = _ref.longtitude,
        nameplace = _ref.nameplace;

    if (error) {
      res.render('page404', {
        error: 'Page not found' + error,
        name: 'CANHCUTCON'
      });
    }

    forecast(latitude, longtitude, function (error) {
      var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          temperature = _ref2.temperature,
          precip = _ref2.precip;

      if (error) {
        res.render('page404', {
          error: 'Page not found' + error,
          name: 'CANHCUTCON'
        });
      }

      res.send({
        forcast: temperature + ' Clelius .' + precip,
        location: nameplace,
        latitude: latitude,
        longtitude: longtitude
      });
    });
  });
});
app.get('/about/*', function (req, res) {
  res.render('page404', {
    error: 'About not found',
    name: 'CANHCUTCON'
  });
});
app.get('*', function (req, res) {
  res.render('page404', {
    error: 'Page not found',
    name: 'CANHCUTCON'
  });
});
app.listen(port, function () {
  console.log('post 3000.');
});