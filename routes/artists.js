var express = require('express');
var router = express.Router();
const Artist = require('../models/Artist');

router.get('/', function(req, res, next) {
  Artist.find()
  .then(artist => {
    res.json(artist);
  })
  .catch(e => {
    console.log(e)
  })
});

// Get artist by name (using slug)
router.get('/:artistSlug', function(req, res, next) {
  const artistSlug = req.params.artistSlug;

  Artist.findOne({ name: { $regex: new RegExp("^" + artistSlug + "$", "i") } }) // Exact case-insensitive match
    .then(artist => {
      if (!artist) {
        return res.status(404).json({ message: 'Artist not found' });
      }
      res.json(artist);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    });
});

router.post('/add', function (req, res, next) {
    if (req.body.lengtg == 0) return;
    const { name, email, descripcion, imagen, vacaciones } = req.body;
    console.log(name, email, descripcion);
    Artist.create({
        name,
        email,
        descripcion,
        imagen,
        vacaciones
    }, (err, artist) => {
        if (err) return res.status(500).send(err);
        // console.log(err);
        res.json(artist);
    })
});

router.put('/:id', function (req, res, next) {
  const { id } = req.params;
  const { name, email, descripcion, imagen, vacaciones } = req.body;
  Artist.findByIdAndUpdate(id, {
    name,
    email,
    descripcion,
    imagen,
    vacaciones
  }, (err, artist) => {
    if (err) return res.status(500).send(err);
    res.send(`Artist updated`);
  })
});

router.delete('/:id', function (req, res, next) {
  const { id } = req.params;
  Artist.findByIdAndDelete(id, (err, artist) => {
    if (err) return res.status(500).send(err);
    res.send(`Artist deleted`);
  })
});

module.exports = router;
