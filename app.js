require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})

app.use(userRoutes)

// mongoose.connect("mongodb://localhost:27017/prac_4")

mongoose.connect('mongodb://localhost:27017/react_exam2')
    .then(() => {
        app.listen(process.env.PORT, (req, res) => {
            console.log('Database connected');
            console.log(`Server Running at http://${process.env.HOST}:${process.env.PORT}`);
        })
    })
    .catch((err) => { console.log(err); });
