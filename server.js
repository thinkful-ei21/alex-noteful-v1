'use strict';

const express = require('express');

const morgan = require('morgan');

const notesRouter = require('./router/notes.router');

const {PORT} = require('./config');

const {requestLogger} = require('./middleware/logger');

const app = express();

app.use(morgan('dev'));
// ADD STATIC SERVER HERE
app.use(express.static("public"));

// Parse request body
app.use(express.json());

app.use('/api/notes', notesRouter);

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.status(404).json({ message: 'Not Found' });
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
});

app.startServer = function (port) {
  return new Promise((resolve, reject) => {
    this.listen(port, function () {
      this.stopServer = require('util').promisify(this.close);
      resolve(this);
    }).on('error', reject);
  });
};

if (require.main === module) {
  app.startServer(PORT).catch(err => {
    if (err.code === 'EADDRINUSE') {
      const stars = '*'.repeat(80);
      console.error(`${stars}\nEADDRINUSE (Error Address In Use). Please stop other web servers using port ${PORT}\n${stars}`);
    }
    console.error(err);
  });
}

module.exports = app; // Export for testing