const express = require('express');

const data = require('../db/notes');
const simDB = require('../db/simDB');  // <<== add this
const notes = simDB.initialize(data);

const router = express.Router();

router.get('/', (req, res, next) => {
    const { searchTerm } = req.query;
  
    notes.filter(searchTerm, (err, list) => {
      if (err) {
        return next(err); // goes to error handler
      }
      res.json(list); // responds with filtered array
    });
});

router.get('/:id', (req, res, next) => {
    const { id } = req.params;

    notes.find(id)
    .then(item => {
      if (item) {
        res.json(item);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err)
    });
});

router.put('/:id', (req, res, next) => {
    const id = req.params.id;
  
    /***** Never trust users - validate input *****/
    const updateObj = {};
    const updateFields = ['title', 'content'];
  
    updateFields.forEach(field => {
      if (field in req.body) {
        updateObj[field] = req.body[field];
      }
    });
  
    notes.update(id, updateObj)
      .then(item => {
      if (item) {
        res.json(item);
      }
      else {
        next();
      }
      })
      .catch(err => {
        next(err)
      });
    
});

// Post (insert) an item
router.post('/', (req, res, next) => {
    const { title, content } = req.body;
    const newItem = { title, content };
    /***** Never trust users - validate input *****/
    if (!newItem.title) {
      const err = new Error('Missing `title` in request body');
      err.status = 400;
      return next(err);
    }
  
    notes.create(newItem)
      .then(item => {
        if (item) {
          res.json(item);
        }
        else {
          next();
        }
        })
        .catch(err => {
          next(err)
      });
  });

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  notes.delete(id)
    .then(res.status(204).json({message: 'No Content'}))
      .catch(err => { next(err) });
});
  
module.exports = router;