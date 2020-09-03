const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Get all users
router.get("/", async (req, res) => {
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

module.exports = router;
