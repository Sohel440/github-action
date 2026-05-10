import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './model/user.model.js';
import cors from 'cors';
const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
/// app start

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log('MongoDb connected!');
  })
  .catch((e) => {
    console.error('Error in mongo: ', e.message);
  });

app.set('view engine', 'ejs');
app.set('views', './views');
app.post('/register', async (req, res) => {
  try {
    const { name, email, Emp_id } = req.body;
    const user = await User.create({
      name,
      email,
      Emp_id,
    });

    return res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();

    return res.status(201).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});
app.get('/', (req, res) => {
  return res.json({
    success: true,
    message: 'You are in home',
  });
});
app.get('/view', async (req, res) => {
  res.render('index.ejs');
});
app.post('/submit', async (req, res) => {
  const user = req.body;
  await User.create(user);

  return res.send({
    users: user,
    message: 'user created',
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listen at ${process.env.PORT}`);
});
