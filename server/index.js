const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const db = require('./config/db'); // Import the database connection
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./utils/errorHandler.js');

// Initialize the Express application
const app = express();

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session and Passport setup
app.use(session({ secret: 'your_session_secret', resave: false, saveUninitialized: true }));

app.use(passport.session());

// Import Passport config
require('./config/passport');

// Route setup
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);


// Error handling middleware
app.use(errorHandler);

// Sync database and start server
const PORT = process.env.PORT || 5000;

db.sync({ force: false })
  .then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });
