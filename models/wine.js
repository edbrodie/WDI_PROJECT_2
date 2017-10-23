const mongoose = require('mongoose');
//
// const imageSchema = new mongoose.Schema({
//   url: String,
//   caption: String
// });


const wineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  region: { type: String },
  pairings: { type: String },
  tastingNotes: { type: String },
  buyLink: { type: String },
  images: { type: String }
});


wineSchema.methods.belongsTo = function wineBelongsTo(user) {
  if(typeof this.createdBy.id === 'string') return this.createdBy.id === user.id;
  return user.id === this.createdBy.toString();
};


module.exports = mongoose.model('Wine', wineSchema);
