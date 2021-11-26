const { parentPort } = require('worker_threads');
const crypto = require('crypto');
const fs = require('fs');
let key = 'MySuperSecretKey';
key = crypto.createHash('sha256').update(String(key)).digest('base64').substr(0, 32);
const algorithm = 'aes-256-ctr';

parentPort.on('message', msg => {
  try {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let ciph = cipher.update(msg.file.buffer.toString('base64'), 'base64', 'hex');
    ciph += cipher.final('hex');

    if (!fs.existsSync('public')){
      fs.mkdirSync('public');
    }

    fs.appendFile(`public/${msg.fileName}.txt`, ciph, function(err) {
      if(err) {
          return console.log(err);
      }
      return console.log('The file was saved!');
    });
  
  } catch (e) {
    console.log(e);
  }
});

