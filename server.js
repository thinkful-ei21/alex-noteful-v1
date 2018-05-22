'use strict';

// Load array of notes
// const data = require('./db/notes');

// console.log('Hello Noteful!');

const express = require('express');

const data = require('./db/notes');

const app = express();

// ADD STATIC SERVER HERE
app.use(express.static("public"));

app.get('/api/notes', (req, res) => {
    res.json(data);
  });

app.listen(8080, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});