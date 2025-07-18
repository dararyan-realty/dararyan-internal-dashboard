const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  type: { type: String, enum: ['apartment', 'house', 'land', 'building', 'chalet', 'farm', 'commercial'], required: true },
  region: { type: String, required: true },
  address: { type: String },
  piece: { type: String },
  street: { type: String },
  buildingNumber: { type: String },
  autoNumber: { type: String },
  road: { type: String },
  propertyNumber: { type: String },
  returnValue: { type: Number },
  floor: { type: Number }, // for apartment
  apartmentNumber: { type: String }, // for apartment
  buildingDetails: { apartmentsCount: Number, apartmentRent: Number }, // for building
  status: { type: String, enum: ['new', 'maintenance', 'rented', 'for_sale', 'for_rent', 'stopped', 'available'], default: 'new' },
  vip: { type: Boolean, default: false },
  files: [{ type: String }], // URLs for images, contracts, etc.
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  archived: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);
