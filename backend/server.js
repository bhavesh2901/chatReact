const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const crypto = require('crypto'); 
const path = require("path");
const app = express();
const PORT = 3000; // You can choose any available port
const multer = require('multer');
const fs = require('fs');
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
    const {  phone, name, signupemail, signuppassword, Status } = req.body;
  
    // First, check if the email or phone number already exists in the database
    const checkQuery = 'SELECT * FROM user WHERE email = ? OR mobail = ?';
    db.query(checkQuery, [signupemail, phone], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
  
      if (result.length > 0) {
        // If a user is found with the same email or phone number
        return res.status(409).json({ message: 'User already exists' });
      } else {
        // If no user is found, proceed with the insertion
        const insertQuery = 'INSERT INTO user ( mobail, user_profile, email, password, ac_status) VALUES (?, ?, ?, ?, ?)';
        db.query(insertQuery, [ phone, name, signupemail, signuppassword, Status], (err, result) => {
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


app.get('/api/followlistuser/:userID', (req, res) => {
  const userID = req.params.userID; // Use userID from params
  
  // const query = ` SELECT u.* FROM follow_list p LEFT JOIN user u ON p.follower_id = u.id WHERE p.userid = ?;`;
  const query = ` SELECT u.*, c.msg, c.create_at, c.photo, c.video
FROM follow_list f1
JOIN follow_list f2 
  ON f1.userid = f2.follower_id 
  AND f1.follower_id = f2.userid
LEFT JOIN user u ON f1.userid = u.id
LEFT JOIN messages c 
  ON (c.from_user_id = f1.follower_id AND c.to_user_id = f1.userid)
  OR (c.from_user_id = f1.userid AND c.to_user_id = f1.follower_id)
WHERE f1.follower_id = ?
  AND c.create_at = (
      SELECT MAX(create_at)
      FROM messages
      WHERE (from_user_id = f1.follower_id AND to_user_id = f1.userid)
         OR (from_user_id = f1.userid AND to_user_id = f1.follower_id)
  )
ORDER BY u.id;
;
    `;


  db.query(query, [userID], (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).send('Server error'); // Properly handle the error response
    }
    res.json(results); // Send the results as JSON
  });
});

app.get('/api/userchat/:userID/:followingid', (req, res) => {
  const userID = req.params.userID; // Extract userID from params
  const followingid = req.params.followingid; // Extract followingid from params
  
  const query = `
    SELECT u.user_profile , u.name , u.email , u.pro_pic , p.*
    FROM messages p
    LEFT JOIN user u ON p.from_user_id = u.id 
    WHERE (p.from_user_id = ? AND p.to_user_id = ?) 
       OR (p.from_user_id = ? AND p.to_user_id = ?);`;

       

  db.query(query, [userID, followingid, followingid, userID], (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).send('Server error'); // Properly handle the error response
    }
    res.json(results); // Send the results as JSON
  });
});

app.get('/api/userByuserid/:userID', (req, res) => {
  const userID = req.params.userID; // Use userID from params
  
  const query = `
    SELECT * FROM user WHERE id = ? ;`;

  db.query(query, [userID], (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).send('Server error'); // Properly handle the error response
    }
    res.json(results); // Send the results as JSON
  });
});

app.post('/api/sendmessage', async (req, res) => {
  const { senderid, receiverid, messageText} = req.body;
  const createdAt = new Date();

  try {

    await db.query('INSERT INTO messages (msg, from_user_id, to_user_id, 	create_at) VALUES (?, ?, ?, ? )', [messageText, senderid, receiverid, createdAt ]);
    res.status(200).json({ message: 'message saved successfully!' });

  } catch (error) {
    console.error('Error saving rating:', error);
    res.status(500).json({ message: 'Failed to save message' });
  }
});


app.post('/api/outModeTheame', async (req, res) => {
  const { UserID, theme} = req.body;

  try {

    await db.query(
      'UPDATE user SET mscolor = ? WHERE id = ?',
      [theme, UserID]
    );
    res.status(200).json({ message: 'theme saved successfully!' });

  } catch (error) {
    console.error('Error saving rating:', error);
    res.status(500).json({ message: 'Failed to save message' });
  }
});


app.post('/api/chatTheam', async (req, res) => {
  const { UserID, theme} = req.body;

  try {

    await db.query(
      'UPDATE user SET msthem = ? WHERE id = ?',
      [theme, UserID]
    );
    res.status(200).json({ message: ' chat theme saved successfully!' });

  } catch (error) {
    console.error('Error saving rating:', error);
    res.status(500).json({ message: 'Failed to save message' });
  }
});

const dir = path.resolve(__dirname, '..', 'public', 'assets', 'chatPhoto');

// Function to generate a random token for the filename
const generatename = () => {
  return Math.random().toString(36).substr(2, 9) + Date.now(); // Add current timestamp to make it unique
};

// Create the destination directory if it doesn't exist
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Configure multer for storage and filename handling
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dir); // Use the absolute path for the destination
  },
  filename: (req, file, cb) => {
    const randomname = generatename(); // Generate a new random name for each image upload
    const newFilename = `${randomname}.jpg`; // Save as JPG format
    cb(null, newFilename); // Save the file with the new filename
  },
});

const upload = multer({ storage });

// Route to upload image
app.post('/api/uploadphoto/:senderid/:receiverid', upload.single('image'), (req, res) => {
  const { senderid, receiverid } = req.params; // Extract userid from params
  const image = req.file;
  const createdAt = new Date();
  
  if (!image) {
    return res.status(400).json({ message: 'No image uploaded' });
  }
  
  const imagePath = path.join('assets/chatPhoto/', image.filename); // Use the generated filename from multer

  // Save the image path in the database
  const query = 'INSERT INTO messages (photo, from_user_id, to_user_id, create_at) VALUES (?, ?, ?, ?)';
  db.query(query, [imagePath, senderid, receiverid, createdAt], (err, result) => {
    if (err) {
      console.error('Error updating image path:', err);
      return res.status(500).json({ message: 'Database update failed' });
    }
    res.json({ message: 'Image uploaded successfully', imagePath });
  });
});





app.get('/api/AlluserByUser/:userID', (req, res) => {
  const userID = req.params.userID; // Use userID from params
  
  const query = `SELECT DISTINCT u.*
FROM user u
LEFT JOIN follow_list f ON u.id = f.userid
WHERE u.id != ?
  AND u.id NOT IN (
      SELECT userid
      FROM follow_list
      WHERE follower_id = ?
  );

 `;

  db.query(query, [userID ,userID], (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).send('Server error'); // Properly handle the error response
    }
    res.json(results); // Send the results as JSON
  });
});


// Example routes
app.get('/api/follow/status/:currentUserId/:targetUserId', (req, res) => {
  const { currentUserId, targetUserId } = req.params;

  const query = 'SELECT EXISTS(SELECT 1 FROM follow_list WHERE follower_id = ? AND userid = ?) AS isFollowing';
  
  db.query(query, [currentUserId, targetUserId], (err, result) => {
    if (err) return res.status(500).send('Database query error');
    
    const isFollowing = result[0].isFollowing ? true : false;
    res.json({ isFollowing });
  });
});

// 2. Follow a user
app.post('/api/follow', (req, res) => {
  const { follower_id, user_id } = req.body;

  const query = 'INSERT INTO follow_list (follower_id, userid) VALUES (?, ?)';
  
  db.query(query, [follower_id, user_id], (err, result) => {
    if (err) return res.status(500).send('Error following user');
    
    res.status(200).send('Followed successfully');
  });
});

// 3. Unfollow a user
app.post('/api/unfollow', (req, res) => {
  const { follower_id, user_id } = req.body;

  const query = 'DELETE FROM follow_list WHERE follower_id = ? AND userid = ?';
  
  db.query(query, [follower_id, user_id], (err, result) => {
    if (err) return res.status(500).send('Error unfollowing user');
    
    res.status(200).send('Unfollowed successfully');
  });
});

app.get('/api/get-unread-messages', async (req, res) => {
  const { to_user_id } = req.query;

  const query = `
    SELECT m.id, m.from_user_id, m.msg, m.photo, m.video, m.doc, m.create_at , u.name
    FROM messages m
    LEFT JOIN user u ON m.from_user_id = u.id 
    WHERE m.to_user_id = ? AND read_status = 0
    ORDER BY m.create_at DESC
    LIMIT 1;
  `;

  db.query(query, [to_user_id], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send("Internal Server Error");
    }
  
    if (results.length > 0) {
      res.json(results[0]); // Send the first result as JSON
    } else {
      res.json(null); // Send null if no results are found
    }
  });
});

app.get('/api/notifiaction/:userID', (req, res) => {
  const userID = req.params.userID; // Use userID from params
  
  const query = ` SELECT 
                    n.*, 
                    uf.pro_pic AS whoProPic, 
                    uf.user_profile AS whoName, 
                    uw.pro_pic AS whomPic, 
                    uw.user_profile AS whomName
                  FROM notification n
                  LEFT JOIN user uf ON n.whofollow = uf.id 
                  LEFT JOIN user uw ON n.whom = uw.id 
                  WHERE n.whofollow = ? AND n.whom = ?
                `;


  db.query(query, [userID , userID], (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).send('Server error'); // Properly handle the error response
    }
    res.json(results); // Send the results as JSON
  });
});


app.post('/api/updateMessageStatus', async (req, res) => {
  const { senderid, receiverid } = req.body;

  try {
    // First query
    const firstUpdate = await new Promise((resolve, reject) => {
      db.query(
        'UPDATE messages SET read_status = ? WHERE from_user_id = ? AND to_user_id = ?',
        [1, senderid, receiverid],
        (err, results) => {
          if (err) return reject(err);
          resolve(results);
        }
      );
    });

    // Second query
    const secondUpdate = await new Promise((resolve, reject) => {
      db.query(
        'UPDATE messages SET read_status = ? WHERE from_user_id = ? AND to_user_id = ?',
        [1, receiverid, senderid],
        (err, results) => {
          if (err) return reject(err);
          resolve(results);
        }
      );
    });

    // Check if either query updated rows
    if (firstUpdate.affectedRows > 0 || secondUpdate.affectedRows > 0) {
      res.status(200).json({ message: 'Message status updated successfully!' });
    } else {
      res.status(404).json({ message: 'No messages found to update.' });
    }
  } catch (error) {
    console.error('Error updating message status:', error);
    res.status(500).json({ message: 'Failed to update message status.' });
  }
});


app.get('/api/followrList/:userID', (req, res) => {
  const userID = req.params.userID; // Use userID from params
  
  const query = `SELECT 
    f.follower_id AS follower_id,
    uf.user_profile AS user_profile,
    uf.email AS follower_email,
    uf.name AS name,
    uf.pro_pic AS follower_profile_pic,
    uf.bio_pic AS follower_bio_pic
    FROM 
        follow_list f
    JOIN 
        user uf ON f.follower_id = uf.id
    WHERE 
        f.userid = ?;
 `;

  db.query(query, [userID ,userID], (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).send('Server error'); // Properly handle the error response
    }
    res.json(results); // Send the results as JSON
  });
});


app.get('/api/followingList/:userID', (req, res) => {
  const userID = req.params.userID; // Use userID from params
  
  const query = `SELECT 
    f.userid AS userid,
    uf.user_profile AS user_profile,
    uf.email AS follower_email,
    uf.name AS name,
    uf.pro_pic AS follower_profile_pic,
    uf.bio_pic AS follower_bio_pic
    FROM 
        follow_list f
    JOIN 
        user uf ON f.userid = uf.id
    WHERE 
        f.follower_id = ?;
 `;

  db.query(query, [userID ,userID], (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).send('Server error'); // Properly handle the error response
    }
    res.json(results); // Send the results as JSON
  });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
