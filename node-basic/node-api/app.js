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
const fs = require('fs');
const cors = require('cors');

dotenv.config();

mongoClient.connect('mongodb://127.0.0.1:27017', { useUnifiedTopology: true }).then(() => console.log('mongo db connected')).catch(() => console.log('fff'))

app.use(cors());
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cookieParser());
app.use('/', userRoutes);
app.use('/', postRoutes);
app.use('/', authRoutes);

app.get('/', (req, res) =>{
    fs.readFile('./docs/apiDocs.json', (err, data) =>{
        if(err){
            res.status(400).json({error: err});
        }

        const docs = JSON.parse(data);
        res.json(docs);
    });
});

const port = process.env.PORT;
app.listen(port, () => console.log(`a node js server is running on port ${port}`));