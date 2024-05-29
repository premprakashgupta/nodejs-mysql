const UserService = require('../services/userService');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await UserService.getUserById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUserById = async (req, res) => {
  try {
    const updatedUser = await UserService.updateUserById(req.params.id, req.body);
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const result = await UserService.deleteUserById(req.params.id);
    res.status(200).json({ message: 'User deleted successfully', result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
