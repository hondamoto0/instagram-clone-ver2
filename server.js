const express = require('express');
const app = express();
const PORT = 5000;
const connectDB = require('./config/db');
const authRoute = require('./routes/auth');
const postsRoute = require('./routes/posts');
const usersRoute = require('./routes/users');
var cors = require('cors');
var bodyParser = require('body-parser');
require('dotenv').config();
// connect MongoDB
connectDB();

// middleWares
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use('/api', authRoute);
app.use('/api', postsRoute);
app.use('/api', usersRoute);
// routes

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
