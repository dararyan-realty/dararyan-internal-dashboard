const express = require('express');
const jwt = require('jsonwebtoken');
const Property = require('../models/Property');
const Client = require('../models/Client');
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const router = express.Router();

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

router.get('/', authMiddleware, async (req, res) => {
  try {
    const propertiesCount = await Property.countDocuments();
    const clientsCount = await Client.countDocuments();
    const appointmentsCount = await Appointment.countDocuments();
    const stats = { propertiesCount, clientsCount, appointmentsCount };
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
