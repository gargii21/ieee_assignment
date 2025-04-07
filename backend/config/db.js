// backend/db.js
import { Sequelize } from 'sequelize';
import users from '../models/users.js'; // make sure you add .js extension

const sequelize = new Sequelize('sample', 'root', 'gargimysql', {
  host: 'localhost',
  dialect: 'mysql',
});

// Initialize model with sequelize instance
const userModel = users(sequelize);

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export { sequelize, userModel };
