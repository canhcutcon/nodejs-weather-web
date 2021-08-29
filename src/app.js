const request = require('request');
const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const geocode = require('./untile/geocode');
const forecast = require('./untile/forecast');

const publicDirectoryPath = path.join(__dirname, '../public');
const viewDirectoryPath = path.join(__dirname, '../template/views');
const partialPath = path.join(__dirname, '../template/partial');

app.set('view engine', 'hbs');
app.set('views', viewDirectoryPath);
app.use(express.static(publicDirectoryPath));
hbs.registerPartials(partialPath);


app.get('', (req, res) => {
    res.render('index', {
        title: 'INDEX PAGE',
        name: 'CANHCUTCON'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'ABOUT PAGE',
        name: 'CANHCUTCON'
    })
});

app.get('/weather', (req, res) => {
    //the query string
    const address = req.query.address;
    if (!address) {
        res.send({
            error: 'You must return an adress!'
        })
    }
    geocode(address, (error, { latitude, longtitude, nameplace } = {}) => {
        if (error) {
            res.render('page404', {
                error: 'Page not found' + error,
                name: 'CANHCUTCON'
            })
            return error;
        }
        forecast(latitude, longtitude, (error, { temperature, precip } = {}) => {
            if (error) {
                res.render('page404', {
                    error: 'Page not found' + error,
                    name: 'CANHCUTCON'
                })
            }
            res.send({
                forcast: temperature + ' Clelius .' + precip,
                location: nameplace,
                latitude,
                longtitude
            })
        })
    })
})
app.get('/about/*', (req, res) => {
    res.render('page404', {
        error: 'About not found',
        name: 'CANHCUTCON'
    })
});

app.get('*', (req, res) => {
    res.render('page404', {
        error: 'Page not found',
        name: 'CANHCUTCON'
    })
});

app.listen(3000, () => {
    console.log('post 3000.');
})