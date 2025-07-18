const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
  date: { type: Date, required: true },
  time: { type: String },
  note: { type: String },
  status: { type: String, enum: ['scheduled', 'completed', 'canceled'], default: 'scheduled' },
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
