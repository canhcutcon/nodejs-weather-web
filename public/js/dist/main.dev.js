"use strict";

// fetch('https://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     });
// });
$('#btnSearch').click(function (e) {
  e.preventDefault();
  var addLocation = $('#txtlocation').val();
  var error = 'Data is available';

  if (!addLocation) {
    renderError(error);
  } else {
    fetch('http://localhost:3000/weather?address=' + addLocation + '').then(function (response) {
      response.json().then(function (data) {
        if (data.error) {
          renderError(data.error);
        } else {
          renderWeather(data);
        }
      });
    });
  }
});

var renderError = function renderError(error) {
  $('.information').empty();

  if (error) {
    $('.information').append("\n            <p class=\"error\">".concat(error, "</p>\n            "));
  }
};

var renderWeather = function renderWeather() {
  var user = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  $('.information').empty();

  if (user) {
    $('.information').append("\n            <p class=\"location\">".concat(user.location, "</p>\n            <p class=\"weather\">").concat(user.forcast, "</p>\n            "));
  }
};