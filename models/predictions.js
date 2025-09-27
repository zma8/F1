const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  raceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Race',
    required: true,
  },
  pole: {
    type: String,
    required: true,
  },
  winner: {
    type: String,
    required: true,
  },
  podium: {
    type: [String],
    required: true,
  },
  fastestLap: {
    type: String,
    required: true,
  },
  firstDNF: {
    type: String,
    required: true,
  },
  confidence: {
    type: Number,
    required: true, 
    min: 1, 
    max: 100,
    default: 50
  },
  points: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
});

const Predictions = mongoose.model('Predictions', predictionSchema);

module.exports = Predictions;
