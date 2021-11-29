require('dotenv').config();
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();
const PORT = process.env.PORT || 5000;
const URL = process.env.MONGO_URI;

app.use(express.json({ extended: true }));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        store: new FileStore(),
        cookie: {
            path: '/api',
            httpOnly: true,
            maxAge: 60 * 60 * 1000 
        },
        resave: true,
        saveUninitialized: true
    })
);

app.get('', (req, res) => res.send('SERVER STARTED!!!'));
require('./config/config-passport');
app.use(passport.initialize());
app.use(passport.session());
app.use('/api', require('./routes/index'));
require('./config/config-cron');


async function start() {
    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        app.listen(PORT, () => console.log(`PORT is ${PORT}...`));
    } catch (err) {
        console.log(err.stack);
    }
};

start();

module.exports = app;