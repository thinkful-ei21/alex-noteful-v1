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
    if(req.query.searchTerm){
        const searchData = data.filter(function (item) {return item.title.includes(req.query.searchTerm)});
        res.json(searchData);
    }
    else {
    res.json(data);
    }
});

app.get('/api/notes/:id', (req, res) => {
    const dataItem = data.find(item=>item.id==req.params.id);
    res.json(dataItem);
});

app.listen(8080, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});