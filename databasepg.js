const { Client } = require('pg');

const fs = require('fs');

const passwd = fs.readFileSync('credentials.txt', 'utf8')

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: passwd,
    database: 'postgres'
});

client.connect();

function PostMessage(message) {
    try {
        const query = 'INSERT INTO messages VALUES ($1) RETURNING *'
        client.query(query, [message.text], (err, res) => {
            var message = (err) ? "Error: " + err.message : "Res: " + res.rows;
            console.log(message);
        });
    } catch (err) {
        console.log(err.stack);
    }

}

function FetchMessages() {
    try {
        const query = 'SELECT * FROM messages'
        client.query(query, (err, res) => {
            var message = (err) ? "Error: " + err.message : res.rows;
            console.log(message);
            if(!err) return message;
        });
    } catch (err) {
        console.log(err.stack);
    }
}

module.exports = { PostMessage, FetchMessages }