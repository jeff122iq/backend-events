const {Schema, model, Types} = require('mongoose');

const usersShema = new Schema({
  firstname: {
    type: String,
    require: true
  },
  lastname: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  dob: {
    type: Date,
    required: true
  },
  pictures: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
},
{
  versionKey: false
}
);

module.exports = model('Users', usersShema);