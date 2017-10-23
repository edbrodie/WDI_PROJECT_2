const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: String,
  caption: String
});


const wineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  region: { type: String },
  pairings: { type: String },
  tastingNotes: { type: String },
  buyLink: { type: String },
  images: [ imageSchema ]
});

module.exports = mongoose.model('Wine', wineSchema);
