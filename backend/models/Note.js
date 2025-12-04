const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#fef3c7'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Note', noteSchema);
