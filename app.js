const express = require("express");
const app = express();
const bodyParser = require('body-parser');

const database = require('./databasepg')

var urlencodedParser = bodyParser.urlencoded({extended: false});

app.get('/', function(req, res){
    res.sendFile(__dirname + '/Client/index.html');
});

app.post('/', urlencodedParser, function(req, res) {
    database.PostMessage(req.body);
});

app.listen(3000);