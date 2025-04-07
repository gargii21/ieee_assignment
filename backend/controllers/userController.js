// backend/controllers/userController.js
import { userModel } from "../config/db.js";

 const createUser = async (req, res) => {
  const { name, email,password } = req.body;

  try {
    const user = await userModel.create({ name, email, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

 const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export {createUser, getAllUsers}