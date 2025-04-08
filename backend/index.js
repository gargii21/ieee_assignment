// backend/index.js
import express from 'express';
import cors from 'cors';
import { sequelize } from './config/db.js';
//import { createUser, getAllUsers } from './controllers/userController.js';
import userRoutes from './routes/userRoutes.js';
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(cors({
  origin:'http://localhost:5173',
  methods: "GET,POST,PUT,DELETE",
  credentials:true,
}));

sequelize.sync();

// app.get('/getUsers', getAllUsers);
// app.post('/createUsers', createUser);
app.use('/', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
