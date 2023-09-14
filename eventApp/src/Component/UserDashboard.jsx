import React, { useEffect, useState } from 'react';
import { fetchBookedTickets } from './AxiosApiCaller';

function UserDashboard() {
  const [bookings, setBookings] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    async function fetchBookings() {
      try {
        const userBookings = await fetchBookedTickets(userId);
        setBookings(userBookings.tickets);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    }

    fetchBookings();
  }, [userId]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">User Dashboard</h2>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-2">Your Bookings</h3>
        <ul className="list-disc pl-6">
          {bookings.map((booking) => (
            <li key={booking._id} className="mb-4">
              <p className="text-blue-500 font-semibold">Event: {booking.eventId.title}</p>
              <p>Date: {new Date(booking.eventId.date).toLocaleDateString()}</p>
              <p>Time: {booking.eventId.time}</p>
              <p>Venue: {booking.eventId.venue}</p>
              <p>Username: {booking.userId.username}</p>
              <p>Email: {booking.userId.email}</p>
              <p>Seat book:{booking.quantity} </p>
              {/* Display other booking information as needed */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserDashboard;
