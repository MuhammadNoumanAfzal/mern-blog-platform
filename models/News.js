const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  newsTitle: {
    type: String,
    required: true
  },
  newsDescription: {
    type: String,
    required: true
  },
  newsDate: {
    type: Date,
    default: Date.now
  },
  newsImage: {
    type: String
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('News', newsSchema);
