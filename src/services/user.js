const User = require('../models/user');
const { Worker } = require('worker_threads');
const { v4: uuidv4 } = require('uuid');

async function signUp(req, res) {
  try {
    const {file, body, fileValidationError} = req;
    const { firstname, lastname, email, dob } = body;
    const fileName = uuidv4().toString();

    if (fileValidationError)
      return res.status(500).send({message: `${fileValidationError}`});

    const user = new User({
      firstname,
      lastname,
      email, 
      dob, 
      pictures: `/public/${fileName}.txt`
    });
    await user.save();

    const worker = new Worker('./src/worker/index.js');
    worker.postMessage({file, fileName})

    res.status(201).send({message: 'work'});
  } catch (e) {
    res.status(500).send({message: `Something wrong --> ${e.message}`});
  }
}

async function getUser(req, res) {
  try {
    res.status(201).send(user);
  } catch (e) {
    res.status(500).send({message: `Something wrong --> ${e.message}`});
  }
}

function signIn(req, res) {
  try {

    res.status(201).send({message: 'work'});
  } catch (e) {
    res.status(500).send({message: `Something wrong --> ${e.message}`});
  }
}

function logOut(req, res) {
  try {

    res.status(201).send({message: 'work'});
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
  getUser,
  signIn,
  logOut,
  registerEvent,
  unregisterEvent
};