const express = require('express');
const path = require('path');
require('dotenv').config();

const connectDB = require('./db/connect');
const taskRoutes = require('./routes/taskRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Routes
app.use('/api/v1/tasks', taskRoutes);
app.use(errorHandler);
// Connect to DB
const port = 8888;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL).then(() =>
      console.log('DB successfully connected ...')
    );
    app.listen(port, console.log(`Listening on port 127.0.0.1:${port}`));
  } catch (err) {
    console.log(err);
  }
};

start();
