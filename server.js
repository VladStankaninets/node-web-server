const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(`${__dirname}/views/partials`);
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', `${log}\n`, (err) => {
        if (err) console.log('Unable to write into server.log');
    });

    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs');
    // NOTE: next() is not used to stop execution off all the code below - We are in Maintenance mode
});

app.use(express.static(`${__dirname}/public`));


hbs.registerHelper('getCurrentYear', function GetYear () {
    return new Date().getFullYear(); // inline comment
});

hbs.registerHelper('screamIt', (text) => text.toUpperCase()); // implicit return from the arrow function

// app.get('/', (req, res) => {
//     // res.send('<h1>Hello, Express!</h1>');
//     res.send({
//         'name': 'Vladimir',
//         'likes': [
//             'reading',
//             'cooking'
//         ]
//     });
// });

app.get('/', (req, res) => {
    // res.send('About page');
    res.render('home.hbs', {
        // enjecting data into home.hbs template
        'pageTitle': 'My Home Page',
        'welcomeMessage': 'My Dear Friend'
        // 'currentYear': new Date().getFullYear() - no need anymore using hbs helpers hbs.registerHelper
    });
    // using handlebars (hbs) rendering template in views folder
});

app.get('/about', (req, res) => {
    // res.send('About page');
    res.render('about.hbs', {
        // enjecting data into about.hbs template
        'pageTitle': 'About Page!!!!!!!!!!!!!!!!!!!!!!!!!!'
        // 'currentYear': new Date().getFullYear() - no need anymore using hbs helpers hbs.registerHelper
    });
    // using handlebars (hbs) rendering template in views folder
});

app.listen(3000, () => {
    console.log('The server is started on port 3000');
});
