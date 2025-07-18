const express = require('express');
const jwt = require('jsonwebtoken');
const Log = require('../models/Log');
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

const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admin access required' });
  next();
};

router.get('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const logs = await Log.find().populate('user');
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// No delete or edit routes for logs to ensure transparency

module.exports = router;
