const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const crypto = require('crypto'); 

const app = express();
const PORT = 3000; // You can choose any available port

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON data

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost', // Your database host
    user: 'root', // Your database username
    password: '', // Your database password
    database: 'interect' // Your database name
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

// Function to generate a random token
const generateRandomToken = () => {
    return crypto.randomBytes(32).toString('hex');  // Generate 32-byte random token
  };
  
  // Login endpoint with token generation
  app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    
    // SQL query to select the user
    const query = 'SELECT * FROM user WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
      if (err) {
        console.error('Error during login:', err);
        return res.status(500).json({ error: 'Server error' });
      }
  
      if (results.length > 0) {
        const user = results[0]; // Get user data
  
        // Generate a random token
        const token = generateRandomToken();
  
        // Save the token in the database for the user
        const updateTokenQuery = 'UPDATE user SET token = ? WHERE id = ?';
        db.query(updateTokenQuery, [token, user.id], (err, updateResult) => {
          if (err) {
            console.error('Error updating token in database:', err);
            return res.status(500).json({ error: 'Error updating token' });
          }
  
          // Send token and user information back to the client
          return res.json({
            message: 'Login successful',
            user,
            token
          });
        });
      } else {
        // No user found, return failure response
        return res.status(401).json({ error: 'Invalid credentials' });
      }
    });
  });
  app.post('/api/signup/add', (req, res) => {
    const { Role_id, phone, name, signupemail, signuppassword, Status } = req.body;
  
    // First, check if the email or phone number already exists in the database
    const checkQuery = 'SELECT * FROM users WHERE email = ? OR mobail = ?';
    db.query(checkQuery, [signupemail, phone], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
  
      if (result.length > 0) {
        // If a user is found with the same email or phone number
        return res.status(409).json({ message: 'User already exists' });
      } else {
        // If no user is found, proceed with the insertion
        const insertQuery = 'INSERT INTO users ( mobail, user_profile, email, password, ac_status) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(insertQuery, [Role_id, phone, name, signupemail, signuppassword, Status], (err, result) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          res.status(200).json({ message: 'You are now registered' });
        });
      }
    });
  });

  
app.get('/api/protected-route', (req, res) => {
  // Get the token from the Authorization header
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
  
  if (!token) {
    return res.status(401).json({ error: 'Token is required' });
  }

  // Query the database to find a user with the matching token
  const query = 'SELECT * FROM user WHERE token = ?';
  db.query(query, [token], (err, results) => {
    if (err) {
      console.error('Error fetching user with token:', err);
      return res.status(500).json({ error: 'Server error' });
    }

    if (results.length > 0) {
      // Token is valid, return user info
      const user = results[0];
      return res.json({
        message: 'Access granted',
        user
      });
    } else {
      // Invalid token
      return res.status(403).json({ error: 'Access denied: Invalid token' });
    }
  });
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});