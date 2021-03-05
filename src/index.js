require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const router = require('./routers');
const errorHandler = require('./middleware/error-handling-middleware');

const PORT = process.env.PORT || 5000;
const DB_NAME = process.env.DB_NAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_URL = `mongodb+srv://reactGame:${DB_PASSWORD}@cluster0.xfwc8.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);
app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect(
      DB_URL,
      { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true }
    );
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (e) {
    console.log('Server error', e.message);
    process.exit(1);
  }
}

start();
