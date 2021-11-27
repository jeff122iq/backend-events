const User = require('../models/user');
const Event = require('../models/event');
const { Worker } = require('worker_threads');
const { v4: uuidv4 } = require('uuid');
const passport = require('passport');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const worker = new Worker('./src/worker/index.js');
const { validationResult } = require('express-validator');

async function signUp(req, res) {
  try {
    const { file, body, fileValidationError } = req;
    const { firstname, lastname, email, dob, password } = body;
    const fileName = uuidv4().toString();
    const pass = await bcrypt.hash(password, saltRounds);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) 
      return res.status(400).json({ errors: errors.array() });
    
    if (fileValidationError)
      return res.status(400).send({message: `${fileValidationError}`});
    
    const user = new User({
      firstname,
      lastname,
      email, 
      dob, 
      pictures: `/public/${fileName}.txt`,
      password: pass
    });
    await user.save();
   
    worker.postMessage({file, fileName})
 
    res.status(201).send({user, message: 'add user'});
  } catch (e) {
    res.status(500).send({message: `Something wrong --> ${e.message}`});
  }
}

function signIn(req, res, next) {
  passport.authenticate('local', function(err, user) {
    if (err) { return next(err); }
    if (!user) { return res.status(404).send({message: 'not found user'}); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.status(201).send({user, message: 'User is login!!!'});
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

async function registerEvent(req, res) {
  try {
    const { params, session } = req;
    const update = await Event.updateOne(
      { 
        _id: params._id 
      }, 
      { 
        $addToSet: { 
          users: session.passport.user 
        }
      });

    if(!update.matchedCount)
      return res.status(404).send({message: 'haven\'t this event'});

    if (!update.modifiedCount) 
     return res.status(201).send({message: 'user was registered'});
    
    res.status(201).send({message: 'register user on event'});
  } catch (e) {
    res.status(500).send({message: `Something wrong --> ${e.message}`});
  }
}

async function unregisterEvent(req, res) {
  try {
    const { params, session } = req;
    
    //IF CREATOR UNREGISTER THE EVENT THEN WE DELETE THIS EVENT
    const remove = await Event.deleteOne({
      _id: params._id,
      creator: session.passport.user
    }); 

    if (!remove.deletedCount) {
      const update = await Event.updateOne(
        { 
          _id: params._id 
        }, 
        { 
          $pull: { 
            users: session.passport.user 
          }
        });

      if(!update.matchedCount)
        return res.status(404).send({message: 'haven\'t this event'});
      
      if (!update.modifiedCount) 
        return res.status(201).send({message: 'user was unregistered'});
    }
    res.status(201).send({message: 'unregister user on event'});
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