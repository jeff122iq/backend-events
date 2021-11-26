const cron = require('node-cron');
const Event = require('../models/event');

cron.schedule('* * * * *', async function() {
  const time = new Date(Date.now() + 120 * 60 * 1000);
  await Event.updateMany({
    enddate: {
      $lte: time,
    }
  }, {
    closed: true
  });
});