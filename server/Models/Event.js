const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  date: {
    type: Date,
    required: true,
  },
  availableTickets: {
    type: Number,
    default: 100,
  },
  time: String, // You can choose to store time as a separate field
  venue: String,
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model for the customer
  },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
