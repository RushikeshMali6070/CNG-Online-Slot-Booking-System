# CNG Slot Booking System — Backend (mock)

This is a minimal Express backend used for local development and testing. It uses an in-memory data store (no DB) and provides simple endpoints for auth, stations, bookings and users.

Start:

```powershell
cd "d:\CNG Slot Booking System\server"
npm install
npm start
```

Health: GET /api/health

Auth: POST /api/auth/login { phone }

Stations: GET /api/stations

Bookings: GET/POST /api/bookings
