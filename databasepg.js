const {Client} = require('pg');

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

client.query(`SELECT * FROM users`, (err, res)=>{
    if(!err)
    {
        console.log(res.rows[0]);
    }else {
        console.log(err.message);
    }

    client.end;
});