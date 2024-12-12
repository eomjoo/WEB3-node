const db = require('../config/db');

const User = {

    
  create: (username, email, password, callback) => {
    const sql = 'INSERT INTO Users (username, email, password) VALUES (?, ?, ?)';
    db.query(sql, [username, email, password], callback);
  },

  findByEmail: (email, callback) => {
    const sql = 'SELECT * FROM Users WHERE email = ?';
    db.query(sql, [email], callback);
  },

  updateProfile: (userId, username, callback) => {
    const sql = 'UPDATE Users SET username = ? WHERE user_id = ?';
    db.query(sql, [username, userId], callback);
  },

   deleteUser(userId, callback) {
    const query = 'DELETE FROM Users WHERE user_id = ?';
    db.query(query, [userId], callback);
  },
};



module.exports = User;
