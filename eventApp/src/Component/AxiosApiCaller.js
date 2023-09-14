// api.js
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast from react-toastify

const BASE_URL = 'http://localhost:3000'; // Replace with your actual API URL

// Function to make a login request
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/login`, {
      email,
      password,
    });
    return response.data; // Assuming your server returns a token or user data
  } catch (error) {
    throw error;
  }
};

// Function to make a signup request
export const signup = async (email, username, password,isAdmin) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/signup`, {
      email,
      username,
      password,
      isAdmin
    });
    toast.success('User created successfully');
    return response.data; // Assuming your server returns a success message or user data
  } catch (error) {
    throw error;
  }
};


// Function to make a loan creation request
export const createEvent = async (eventData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/create-events`, eventData);
    toast.success('Loan created successfully');
    return response.data; // Assuming your server returns a success message or loan data
  } catch (error) {
    throw error;
  }
};

// Function to fetch Events belonging to a customer
export const fetchEvents = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/events`);
    const Events = response.data;
    // console.log(Events);
    return Events; // Assuming your server returns a list of Events
  } catch (error) {
    throw error;
  }
};

export const ticketBook = async (ticket,ticketData ) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/events/${ticket}/book-ticket`,ticketData);
    const Events = response.data;
    toast.success('Ticket Booked successfully');
    // console.log(Events);
    return Events; // Assuming your server returns a list of Events
  } catch (error) {
    throw error;
  }
};

export const fetchBookedTickets = async (ticket) => {
try {
  const response = await axios.get(`${BASE_URL}/api/booked-event/${ticket}`);
  const Events = response.data;
  // console.log(Events);
  return Events; // Assuming your server returns a list of Events}
  } catch (error) {
    throw error;
  }
};
