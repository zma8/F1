
const mongoose = require('mongoose');

const raceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
},
  date: {
    type: Date,
    required: true,
  },
  circuit: {
    type: String,
    required: true,
},
  country: {
    type: String,
    required: true,
 },
  status: {
    type: String,
    enum: ['upcoming', 'completed', 'cancelled'],
    default: 'upcoming'
  },
  pole: {
    type: String,
    default: null
  },
  winner: {
    type: String,
    default: null
  },
  podium: {
    type: [String],
    default: [],
  },
  firstDNF: {
    type: Number,
    min: 1,
    max: 20,
    default: null
  },
  fastestLap: {
    type: String,
    default: null,
  },
});

const Race = mongoose.model('Race', raceSchema);

module.exports = Race;
