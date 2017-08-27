const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname+'/views/partials/');
app.set('view_engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to append to sever.log');
        }
    });
    next();
});

/*
app.use((req, res, next) => {
    res.render('maintenance.hbs');
});
*/

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>');
    // res.send({name: 'Luis', likes: ['Games','Technology']});
    res.render('index.hbs', {
        title: 'Homepage Node JS',
        head: 'This is the Homepage',
        welcome: 'Welcome to the Node JS homepage',
    })
});

app.get('/about', (req, res) => {
  //  res.send('About page');
    res.render('about.hbs', {
        title: 'About Node JS',
        head: 'Welcome to About JS',
    });
})

app.get('/bad', (req, res) => {
    res.send({ errorMessage: 'Unable to handle request'});
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});