// src/components/TicketBooking.js
import React, { useState } from 'react';
import { ticketBook } from './AxiosApiCaller';
import { useLocation } from 'react-router-dom';

function TicketBooking() {
  const [ticketData, setTicketData] = useState({
    quantity: 1,
    customer:localStorage.getItem('userId'),
  });
  const location = useLocation();
const pathParts = location.pathname.split('/'); // Split the pathname into parts
const id = pathParts[pathParts.length - 1]; // Get the last part, which should be the id

console.log(id);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
try {
  const response = await ticketBook(id, ticketData);
  console.log(response);

}catch (error) {
  console.log(error);
}
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h2 className="text-2xl font-semibold mb-4">Book Tickets</h2>
      <div className="bg-white w-full sm:w-96 p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={ticketData.quantity}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring focus:border-blue-500"
              min="1"
              required
            />
          </div>
          {/* Add other ticket-related input fields as needed */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Book Tickets
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TicketBooking;
