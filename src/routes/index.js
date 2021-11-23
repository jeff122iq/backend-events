const { 
  signUp, 
  signIn, 
  logOut,
  registerEvent,
  unregisterEvent
} = require('../services/user'); 
const { fileFilter } = require('../helpers/file');
const { Router } = require('express');
const router = Router();
const multer = require('multer');
const upload = multer({ dest: 'public/',  inMemory: true, fileFilter: fileFilter });

//USER_ROUT 

router.post('/signup', upload.single('avatar'), (req, res) => signUp(req, res));
router.post('/signin', (req, res) => signIn(req, res));
router.post('/logout', (req, res) => logOut(req, res));
router.post('/register/event', (req, res) => registerEvent(req, res));
router.post('/unregister/event', (req, res) => unregisterEvent(req, res));

//END_USER_ROUT
//==================================================================
//EVENT_ROUT



//END_EVENT_ROUT

module.exports = router;