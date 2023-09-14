// src/components/EventRetrieval.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { fetchEvents } from './AxiosApiCaller';

function EventRetrieval() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from your API or database
    async function fetchData() {
      const fetchedEvents = await fetchEvents();
      // console.log(fetchedEvents);
      setEvents(fetchedEvents);
    }

    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
      <div className="w-full sm:w-96 p-4 space-y-4">
        {events.length === 0 ? (
          <p className="text-gray-500">No events found.</p>
        ) : (
          events.map((event) => (
            <div
              key={event._id} // Use a unique identifier for each event
              className="bg-white rounded-lg shadow-md p-4"
            >
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <p className="text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
              <p className="text-gray-600">{event.venue}</p>
              <p className="text-gray-600">{event.time}</p>
              <p className="text-gray-600">{event.availableTickets}</p>
              <p className="mt-2">{event.description}</p>
{console.log(event._id)}
              {/* Add a Link to the ticket booking page with the event ID */}
              <Link
                to={`/ticket-book/${event._id}`}
                state={event._id}
                className="mt-2 text-blue-500 hover:underline"
              >
                <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                  Book Tickets
                </button>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default EventRetrieval;
