const { v4: uuidv4 } = require('uuid');

const stations = [
  { id: 'st1', name: 'Station A', address: '123 Main St', slots: 8 },
  { id: 'st2', name: 'Station B', address: '456 Side Rd', slots: 6 }
];

const users = [
  { id: 'u1', phone: '+10000000001', name: 'Alice' },
  { id: 'u2', phone: '+10000000002', name: 'Bob' }
];

const bookings = [
  {
    id: uuidv4(),
    userId: 'u1',
    stationId: 'st1',
    time: new Date(Date.now() + 3600 * 1000).toISOString(),
    status: 'confirmed',
    qr: null
  }
];

module.exports = { stations, users, bookings };
