const User = require('../models/user');
const fs = require('fs');
const crypto = require('crypto');

const algorithm = 'aes-256-ctr';

async function signUp(req, res) {
  try {
    const {file, body, fileValidationError} = req;
    const { firstname, lastname, email, dob } = body;
    const cipher = crypto.createCipheriv(algorithm, 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3', crypto.randomBytes(16));

    if (fileValidationError)
      return res.status(500).send({message: `${fileValidationError}`});

      const buf = Buffer.from(file.path, 'base64');

      console.log(buf)
      const encrypted = Buffer.concat([cipher.update(buf), cipher.final()]);
      console.log(encrypted.toString('hex'))
  

    //const user = new User({firstname, lastname, email, dob});
    //await user.save();
    
    
    res.status(201).send({message: 'work'});
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
  signIn,
  logOut,
  registerEvent,
  unregisterEvent
};