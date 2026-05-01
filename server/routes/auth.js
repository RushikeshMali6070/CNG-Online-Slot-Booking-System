const express = require('express');
const jwt = require('jsonwebtoken');
const { users } = require('../data');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

// login with phone, returns token and user
router.post('/login', (req, res) => {
  const { phone, name } = req.body || {};
  if (!phone) return res.status(400).json({ error: 'phone_required' });

  let user = users.find(u => u.phone === phone);
  if (!user) {
    user = { id: `u${users.length + 1}`, phone, name: name || `User ${users.length + 1}` };
    users.push(user);
  }

  const token = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user });
});

module.exports = router;
