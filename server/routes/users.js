const express = require('express');
const { users } = require('../data');
const router = express.Router();

router.get('/', (req, res) => {
  res.json(users.map(u => ({ id: u.id, phone: u.phone, name: u.name })));
});

router.get('/:id', (req, res) => {
  const u = users.find(x => x.id === req.params.id);
  if (!u) return res.status(404).json({ error: 'not_found' });
  res.json(u);
});

module.exports = router;
