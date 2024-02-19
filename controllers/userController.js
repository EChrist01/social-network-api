const User = require("../models/User");

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getSingleUser(req, res) {
    try {
      const user = await User.findById(req.params.userId).select("-__v");
      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user); // HTTP status 201 for successful creation
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateUser(req, res) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        req.body,
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteUser(req, res) {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.userId);
      if (!deletedUser) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      res.json(deletedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async addFriend(req, res) {
    try {
      const userId = req.params.userId;
      const friendId = req.params.friendId;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      const friend = await User.findById(friendId);
      if (!friend) {
        return res.status(404).json({ message: "No friend with that ID" });
      }

      user.friends.push(friendId);
      await user.save();

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};