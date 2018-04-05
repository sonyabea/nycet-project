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

const db = pgp(cnxn);

// function pingDB(query){

// }

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.get('/', function(req, res) {
    // Handle the get for this route
    // debugger
    // let params = req.params;
    const db = pgp(cnxn);
    let query = "SELECT * FROM acs_ed_demographics LIMIT 10"
    db.query(query, [true])
        .then(data => {
            console.log('DATA:', data);
        })
        .catch(error => {
            console.log(error)
        })

  res.send('Hello world\n');
  });

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);







