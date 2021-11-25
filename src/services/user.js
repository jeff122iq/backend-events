const User = require('../models/user');
const { Worker } = require('worker_threads');
const { v4: uuidv4 } = require('uuid');
const passport = require('passport');
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function signUp(req, res) {
  try {
    const {file, body, fileValidationError} = req;
    const { firstname, lastname, email, dob, password } = body;
    const fileName = uuidv4().toString();



    if (fileValidationError)
      return res.status(500).send({message: `${fileValidationError}`});

    const user = new User({
      firstname,
      lastname,
      email, 
      dob, 
      pictures: `/public/${fileName}.txt`,
      password
    });
    await user.save();

    const worker = new Worker('./src/worker/index.js');
    worker.postMessage({file, fileName})

    res.status(201).send({user, message: 'add user'});
  } catch (e) {
    res.status(500).send({message: `Something wrong --> ${e.message}`});
  }
}

function signIn(req, res, next) {
  passport.authenticate('local', function(err, user) {
    if (err) { return next(err); }
    if (!user) { return res.status(404).send('not found user'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.status(201).send({ user, message: 'User is login!!!'});
    });
  })(req, res, next);
}

function logOut(req, res) {
  try {
    req.logout();
    res.status(201).send({message: 'user logout'});
  } catch (e) {
    res.status(500).send({message: `Something wrong --> ${e.message}`});
  }
}

function registerEvent(req, res) {
  try {

    res.status(201).send({message: 'work'});
  } catch (e) {
    res.status(500).send({message: `Something wrong --> ${e.message}`});
  }
}

function unregisterEvent(req, res) {
  try {

    res.status(201).send({message: 'work'});
  } catch (e) {
    res.status(500).send({message: `Something wrong --> ${e.message}`});
  }
}

module.exports = {
  signUp,
  signIn,
  logOut,
  registerEvent,
  unregisterEvent
};