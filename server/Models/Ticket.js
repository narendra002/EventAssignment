// models/Ticket.js
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event', // Reference to the Event model
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  quantity: {
    type: Number,
    default: 1, // Default quantity, you can change this as needed
  },
  bookingDate: {
    type: Date,
    default: Date.now(), // Default to the current date and time
  },
  // Add more fields as needed, e.g., price, seatNumber, etc.
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
