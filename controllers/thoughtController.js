const Thought = require("../models/Thought");

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }
      res.json(thought);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.status(201).json(thought); // HTTP status 201 for successful creation
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateThought(req, res) {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
      if (!updatedThought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }
      res.json(updatedThought);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteThought(req, res) {
    try {
      const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);
      if (!deletedThought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }
      res.json(deletedThought);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};