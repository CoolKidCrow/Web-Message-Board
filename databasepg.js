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

async function PostMessage(message) {
    try {
        const query = 'INSERT INTO messages (text) VALUES ($1)';
        await client.query(query, [message.text]);
    } catch (err) {
        console.log(err.stack);
    }
}

async function FetchMessages() {
    try{
        const query = 'SELECT * FROM messages ORDER BY created_at DESC';
        var message = await client.query(query);

        return message;
    } catch (err){
        console.log(err.stack);
    }
}

module.exports = { PostMessage, FetchMessages }