const {Schema, model, Types} = require('mongoose');

const eventsShema = new Schema({
  name: {
    type: String,
    require: true
  },
  location: {
    type: String,
    require: true
  },
  startdate: {
    type: Date,
    require: true
  },
  enddate: {
    type: Date,
    required: true
  },
  creator: {
    type: Types.ObjectId,
    require: true,
    ref: 'Users'
  },
  users: [{
    type: Types.ObjectId,
    ref: 'Users'
  }],
  closed: {
    type: Boolean,
    required: true
  }
},
{
  versionKey: false
}
);

module.exports = model('Events', eventsShema);