const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const JWT_SECRET = 'FinalYearProjectABAS'; // Replace with your own secret

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token, user: { username: user.username, role: user.role } });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Register route
router.post('/register', async (req, res) => {
  const { name, lastname, email, gender, username, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    const newUser = new User({ name, lastname, email, gender, username, password, role });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: { username: newUser.username, role: newUser.role } });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Check username route
router.get('/check-username', async (req, res) => {
  const { username } = req.query;
  try {
    const user = await User.findOne({ username });
    res.status(200).json({ exists: !!user });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to authenticate token' });
    }
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

// Protected route example
router.get('/protected', verifyToken, (req, res) => {
  res.status(200).json({ message: 'This is a protected route', userId: req.userId, userRole: req.userRole });
});

// Fetch user data by username
router.get('/user/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Verify password route
router.post('/verify-password', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    res.status(200).json({ isMatch });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;