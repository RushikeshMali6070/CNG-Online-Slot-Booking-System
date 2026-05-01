const express = require('express');
const { stations } = require('../data');
const router = express.Router();

// list all stations
router.get('/', (req, res) => {
  res.json(stations);
});

router.get('/:id', (req, res) => {
  const s = stations.find(x => x.id === req.params.id);
  if (!s) return res.status(404).json({ error: 'not_found' });
  res.json(s);
});

module.exports = router;
