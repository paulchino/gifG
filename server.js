var express = require('express');
var app = express();
var path = require('path');

var bodyParser = require('body-parser');

var http = require('http');


app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');



//app.use(express.static(path.join(__dirname, './client')));

//This gets server routes. 
require('./config/routes.js')(app);



app.listen(8000, function() {
  console.log('gifs: 8000');
})