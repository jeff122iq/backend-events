require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 8080;
const URL = process.env.MONGO_URI;

app.use(express.json({ extended: true }));

app.use('/api', require('./routes/index'));

async function start() {
    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        app.listen(PORT, () => console.log(`PORT is ${PORT}...`));
    } catch (err) {
        console.log(err.stack);
    } finally {

    }
};

start();

module.exports = app;