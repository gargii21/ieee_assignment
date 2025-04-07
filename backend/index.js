// backend/index.js
import express from 'express';
import cors from 'cors';
import { sequelize } from './config/db.js';
import { createUser, getAllUsers } from './controllers/userController.js';
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

sequelize.sync();

app.get('/getUsers', getAllUsers);
app.post('/createUsers', createUser);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
