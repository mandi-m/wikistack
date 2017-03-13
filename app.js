'use strict';
var express = require('express');
var app = express();
var morgan = require('morgan');
var nunjucks = require('nunjucks');
var bodyParser = require('body-parser');


// Where your server and express app are being defined:

var models = require('./models');

// ... other stuff


// point nunjucks to the directory containing templates and turn off caching; configure returns an Environment 
// instance, which we'll want to use to add Markdown support later.
var env = nunjucks.configure('views', {noCache: true});
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);
// logging middleware
app.use(morgan('dev'));

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests
app.use(express.static('public'));


models.User.sync({})
.then(function () {
    return models.Page.sync(); // coordinates database with page model
})
.then(function () { // create database before starting server
    app.listen(3000, function () {
        console.log('Server is listening on port 3001!');
    });
})
.catch(console.error);

// start the server
//app.listen(3000);
app.use('/wiki', require('./routes/wiki'));

app.get('/', function (req, res) {
    res.render('index');
  });

