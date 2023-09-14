// Import necessary modules and Event model
const express = require('express');
const router = express.Router();
const Event = require('../Models/Event');

// Create an event
router.post('/create-events', async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the event' });
  }
});

// Retrieve all events
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving events' });
  }
});

// Retrieve a single event by ID
router.get('/events/:eventId', async (req, res) => {
  const eventId = req.params.eventId;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the event' });
  }
});

module.exports = router;
