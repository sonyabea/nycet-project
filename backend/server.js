'use strict';

const express = require('express');
const pgp = require('pg-promise')();

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
const cnxn = {
    'user': 'nycetmember',
    'password': 'J4}83,?{6X4$',
    'host': '10.39.38.14',
    'port': '5432',
    'database': 'probono'
}

// App
const app = express();
app.get('/', (req, res) => {

    const db = pgp(cnxn);
    db.connect()
    .then(obj => {
        console.log('poopdypants');
        obj.done(); // success, release the connection;
    })
    .catch(error => {
        console.log('ERROR:', error.message || error);
    });

//   res.send('Hello world\n');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);







