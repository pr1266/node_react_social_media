const express = require('express');
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const app = express();
const expressValidator = require('express-validator');
const dotenv = require('dotenv');
const mongoClient = require('mongoose'), format = require('util').format;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

dotenv.config()

mongoClient.connect('mongodb://127.0.0.1:27017', { useUnifiedTopology: true }).then(() => console.log('mongo db connected')).catch(() => console.log('fff'))

app.use(bodyParser.json());
app.use(expressValidator());
app.use(cookieParser());
app.use('/', userRoutes);
app.use('/', postRoutes);
app.use('/', authRoutes);

const port = process.env.PORT;
app.listen(port, () => console.log(`a node js server is running on port ${port}`));