const express = require("express");
const bodyParser = require('body-parser');

const database = require('./databasepg')

const app = express();
const urlencodedParser = bodyParser.urlencoded({extended: false});

app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
    var messages = await database.FetchMessages();
    const data = {messageData: messages.rows}
    res.render('index', data);
});

app.post("/submit", urlencodedParser, async (req, res) => {
    await database.PostMessage(req.body);
    res.redirect('/')
});

app.listen(3000);