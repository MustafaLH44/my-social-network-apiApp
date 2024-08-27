const Thought = require('../models/Thought');
const User = require('../models/User');

// Get all thoughts
const getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get a single thought by ID
const getThoughtById = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id);
    if (!thought) return res.status(404).json({ message: 'Thought not found' });
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Create a new thought
const createThought = async (req, res) => {
  try {
    const thought = await Thought.create(req.body);

    // Push the created thought's ID to the associated user's thoughts array
    await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } });

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update a thought by ID
const updateThought = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!thought) return res.status(404).json({ message: 'Thought not found' });
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete a thought by ID
const deleteThought = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.id);
    if (!thought) return res.status(404).json({ message: 'Thought not found' });

    // Remove the thought's ID from the associated user's thoughts array
    await User.findByIdAndUpdate(thought.userId, { $pull: { thoughts: thought._id } });

    res.json({ message: 'Thought deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Create a reaction
const createReaction = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) return res.status(404).json({ message: 'Thought not found' });

    thought.reactions.push(req.body);
    await thought.save();
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete a reaction
const deleteReaction = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) return res.status(404).json({ message: 'Thought not found' });

    thought.reactions.pull(req.params.reactionId);
    await thought.save();
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
};
