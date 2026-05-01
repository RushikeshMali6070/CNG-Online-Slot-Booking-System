const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Simple health
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: Date.now() });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/stations', require('./routes/stations'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/users', require('./routes/users'));

// Static (optional) - allow serving QR images or other assets if needed
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use((err, req, res, next) => {
  console.error(err && err.stack ? err.stack : err);
  res.status(500).json({ error: err && err.message ? err.message : 'internal_error' });
});

app.listen(PORT, () => {
  console.log(`CNG Slot backend running on http://localhost:${PORT}`);
});
