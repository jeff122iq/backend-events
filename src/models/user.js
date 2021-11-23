const {Schema, model, Types} = require('mongoose');

const usersShema = new Schema({
  
},
{
  versionKey: false
}
);

module.exports = model('Users', usersShema);