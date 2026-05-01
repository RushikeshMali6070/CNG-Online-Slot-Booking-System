const express = require('express');
const { bookings, stations } = require('../data');
const { v4: uuidv4 } = require('uuid');
const QRCode = require('qrcode');
const router = express.Router();

// list bookings (optional ?userId=)
router.get('/', (req, res) => {
  const { userId } = req.query;
  if (userId) return res.json(bookings.filter(b => b.userId === userId));
  res.json(bookings);
});

// create booking
router.post('/', async (req, res) => {
  const { userId, stationId, time } = req.body || {};
  if (!userId || !stationId || !time) return res.status(400).json({ error: 'missing_fields' });

  const station = stations.find(s => s.id === stationId);
  if (!station) return res.status(400).json({ error: 'invalid_station' });

  // simple capacity check: count bookings for station at same time
  const sameTime = bookings.filter(b => b.stationId === stationId && b.time === time && b.status === 'confirmed');
  if (sameTime.length >= (station.slots || 6)) return res.status(400).json({ error: 'no_slots' });

  const id = uuidv4();
  const booking = { id, userId, stationId, time, status: 'confirmed', qr: null };

  // generate QR data URL (contains booking id)
  try {
    booking.qr = await QRCode.toDataURL(JSON.stringify({ bookingId: id }));
  } catch (err) {
    console.warn('QR generation failed', err);
  }

  bookings.push(booking);
  res.status(201).json(booking);
});

module.exports = router;
