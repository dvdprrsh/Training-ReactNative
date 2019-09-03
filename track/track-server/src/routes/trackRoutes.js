const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');
const jwt = require('jsonwebtoken');

const Track = mongoose.model('Track');
const router = express.Router();

router.use(requireAuth);

router.get('/tracks', async (req, res) => {
  const tracks = await Track.find({ userId: req.user._id });

  res.send(tracks);
});

router.post('/tracks', async (req, res) => {
  const { name, locations } = req.body;

  if (!name || !locations) {
    return res.status(422).send({ error: 'Must provide a name and locations' });
  }

  const track = new Track({ name, locations, userId: req.user._id });
  try {
    await track.save();
    res.send(track);
  } catch (e) {
    res.status(422).send({ error: e.message });
  }
});

module.exports = router;
