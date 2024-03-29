const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const signupRoute = require('./Routes/SignUp');
const loginRoute = require('./Routes/Login');
const eventRoutes = require('./Routes/events');

const ticketRoutes = require('./Routes/tickets');
dotenv.config();
const app = express();

app.use(express.json());

// Configure CORS to allow requests from a specific origin
const corsOptions = {
  origin: '*',
  methods: 'GET, PUT, POST, DELETE',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
};

app.use(cors(corsOptions));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to DB!'))
  .catch(error => console.log(error));

// Routes
app.use('/api', signupRoute); // Register a new user
app.use('/api', loginRoute);  // Login
app.use('/api', eventRoutes);
app.use('/api', ticketRoutes);
const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
