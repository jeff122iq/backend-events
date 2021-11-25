const { 
  signUp, 
  signIn, 
  logOut,
  registerEvent,
  unregisterEvent,
} = require('../services/user');
const {
  createEvent,
  removeEvent,
  updateEvent,
  detailEvent,
} = require('../services/event');
const { fileFilter } = require('../helpers/file');
const { Router } = require('express');
const router = Router();
const multer = require('multer');
const { auth }= require('../middleware/passport');

const upload = multer({
  storage: multer.memoryStorage(), 
  inMemory: true, 
  fileFilter: fileFilter 
});

//USER_ROUT 

router.post('/signup', upload.single('avatar'), (req, res) => signUp(req, res));
router.post('/signin', upload.none(), (req, res, next) => signIn(req, res, next));
router.post('/logout', auth, (req, res) => logOut(req, res));
router.post('/user/event/register', auth, (req, res) => registerEvent(req, res));
router.post('/user/event/unregister', auth, (req, res) => unregisterEvent(req, res));

//END_USER_ROUT
//==================================================================
//EVENT_ROUT 

router.post('/event/create', upload.none(), auth, (req, res) => createEvent(req, res));
router.get('/event/:_id', auth, (req, res) => detailEvent(req, res));
router.put('/event/update/:_id', upload.none(), auth, (req, res) => updateEvent(req, res));
router.delete('/event/delete/:_id', upload.none(), auth, (req, res) => removeEvent(req, res));

//END_EVENT_ROUT

module.exports = router;