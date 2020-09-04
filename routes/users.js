const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const { registerValidation, loginValidation } = require("../utils/validator");

// Get all users (protected route)
router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
});

// Get specific user
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});

// Create a user
router.post("/", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
  });

  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

// Delete a user
router.delete("/:userId", async (req, res) => {
  try {
    const result = await User.deleteOne({ _id: req.params.userId });
    res.json(result);
  } catch (err) {
    res.json({ message: err });
  }
});

// Update a user (can also use patch and updateOne instead depending on requirements)
router.put("/:userId", async (req, res) => {
  try {
    const updatedUser = await User.replaceOne(
      { _id: req.params.userId },
      { name: req.body.name, email: req.body.email }
    );
    res.json(updatedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

// Register
router.post("/register", async (req, res) => {
  // Validate body
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error);

  //Check if user already exists
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) return res.status(400).send("User already exists");

  //Hash password
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  // Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  // Register user
  try {
    await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.send(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("User does not exist.");

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordValid) return res.status(400).send("Password is not valid.");

  // Create token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth", token).send("You're now logged in");
});

module.exports = router;
