// Import necessary modules and Ticket model
const express = require('express');
const router = express.Router();
const Ticket = require('../Models/Ticket');
const Event = require('../Models/Event');

// Book tickets for an event
router.post('/events/:eventId/book-ticket', async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const userId = req.body.customer; // Assuming you have userId in the request body
    const quantity = req.body.quantity; // Assuming you have quantity in the request body

    // Check if the event exists
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Check ticket availability (You can implement your own logic)
    const availableTickets = event.availableTickets || 0; // Assuming you have availableTickets field in the Event model
    
    if (availableTickets < quantity) {
      return res.status(400).json({ error: 'Not enough tickets available' });
    }

    // Book the tickets
    const tickets = [];

    for (let i = 0; i < quantity; i++) {
      const ticket = new Ticket({
        eventId: eventId,
        userId: userId,
        // Add other ticket-related fields as needed
      });

      await ticket.save();
      tickets.push(ticket);
    }

    // Update available tickets for the event
    event.availableTickets -= quantity;
    await event.save();

    res.status(201).json({ message: 'Tickets booked successfully', tickets });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while booking tickets' });
  }
});

// Booked tickets for an event
// Fetch booked tickets for a customer
router.get('/booked-event/:customer', async (req, res) => {
  const customer = req.params.customer;

  try {
    const tickets = await Ticket.find({ userId: customer }).populate({
      path: 'userId', // Populate the 'userId' field
      select: 'username email', // Select the fields you want to populate
    }).populate({
      path: 'eventId', // Populate the 'eventId' field
       // Select the fields you want to populate
    }) ;

    if (!tickets) {
      return res.status(404).json({ error: 'Tickets not found' });
    }

    res.status(200).json({ tickets });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving tickets' });
  }
});

module.exports = router;
