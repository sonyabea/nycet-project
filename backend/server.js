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

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  const db = pgp(cnxn);

app.get('/table/:table/:filterOn?/:filterBy?', function(req, res) {
  let {table, filterOn, filterBy} = req.params
  let query = `SELECT * FROM ${table}`
  if (filterOn && filterBy) {
    query += ` WHERE ${filterOn} = '${filterBy}'`
  }

  db.query(query, [true])
    .then(data => {
      res.send(data)
    })
    .catch(error => {
      console.log(error)
    })
});




app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
