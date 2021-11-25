const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('Users');
const keys = process.env.KEYS_PASSPORT;

function auth(req, res, next) {
  try {
    if (req.isAuthenticated()) {
      next();
    } else {
      return res.status(404).send({message: 'user unauthenticated'});
    }
  } catch (e) {
    return res.status(500).send({message: `Something wrong -> ${e}`});
  }
}

module.exports = {
  auth
}