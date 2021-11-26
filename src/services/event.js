const Event = require('../models/event');
const { validationResult } = require('express-validator');

async function createEvent(req, res) {
  try {
    const { body, session } = req;
    const { name, location, startdate, enddate } = body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const event = new Event({
      name,
      location,
      startdate: new Date(Date.parse(startdate) + 120 * 60 * 1000),
      enddate: new Date(Date.parse(enddate) + 120 * 60 * 1000),
      creator: session.passport.user,
      users: session.passport.user,
      closed: false
    });
    await event.save();
    res.status(201).send({event, message: 'add event'});
  } catch (e) {
    res.status(500).send({message: `Something wrong --> ${e.message}`});
  }
}

async function detailEvent(req, res) {
  try {
    const { params } = req;
    const result = await Event.findOne({_id: params._id});
    res.status(201).send(result);
  } catch (e) {
    res.status(500).send({message: `Something wrong --> ${e.message}`});
  }
}

async function updateEvent(req, res) {
  try {
    const { body, params } = req;
    const update = await Event.updateOne({_id: params._id}, {...body});
    
    if (!update.matchedCount)
      return res.status(404).send({message: 'haven\'t this item'});
    
    if (!update.modifiedCount)
      return res.status(404).send({message: 'item have this value'});
    
    res.status(201).send({message: 'item update'});
  } catch (e) {
    res.status(500).send({message: `Something wrong --> ${e.message}`});
  }
}

async function removeEvent(req, res) {
  try {
    const { params } = req;
    const remove = await Event.deleteOne({_id: params._id});
    
    if (!remove.deletedCount)
      return res.status(404).send({message: 'haven\'t this item'});

    res.status(201).send({message: 'item delete'});
  } catch (e) {
    res.status(500).send({message: `Something wrong --> ${e.message}`});
  }
}

module.exports = { 
  createEvent,
  removeEvent,
  updateEvent,
  detailEvent,
}