const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  civilId: { type: String }, // Protected, only visible to authorized
  civilIdImage: { type: String }, // Optional upload
  type: { type: String, enum: ['buyer', 'seller', 'renter', 'owner', 'office', 'broker'] },
  classification: { type: String, enum: ['normal', 'vip'], default: 'normal' },
  followUps: [{ date: Date, note: String, employee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } }]
}, { timestamps: true });

module.exports = mongoose.model('Client', clientSchema);
