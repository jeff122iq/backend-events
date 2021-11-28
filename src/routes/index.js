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
const { isStartEndDate } = require('../helpers/validation');
const { Router } = require('express');
const router = Router();
const multer = require('multer');
const { auth }= require('../middleware/passport');
const { body } = require('express-validator');
const { isString } = require('class-validator');
const upload = multer({
  storage: multer.memoryStorage(), 
  inMemory: true, 
  fileFilter: fileFilter 
});

//USER_ROUT 

router.post('/signup', 
  upload.single('avatar'), 
  body('email').isEmail(),
  body('password').isStrongPassword(),
  body('firstname').isAlpha(),
  body('lastname').isAlpha(),
  body('dob').isDate({format: 'YYYY-MM-DD'}),
  (req, res) => signUp(req, res)
);
router.post('/signin', upload.none(), (req, res, next) => signIn(req, res, next));
router.post('/logout', auth, (req, res) => logOut(req, res));
router.post('/user/event/register/:_id', auth, (req, res) => registerEvent(req, res));
router.post('/user/event/unregister/:_id', auth, (req, res) => unregisterEvent(req, res));

//END_USER_ROUT
//==================================================================
//EVENT_ROUT 

router.post('/event/create', 
  upload.none(), 
  auth,
  body('name').isString(),
  body('location').isString(),
  body('startdate').isISO8601('yyyy-mm-dd hh:mm').isAfter(new Date(Date.now()).toISOString()),
  body('enddate').isISO8601('yyyy-mm-dd hh:mm').custom((val, meta) => isStartEndDate(val, meta)),//+2 hours
  (req, res) => createEvent(req, res)
);
router.get('/event/:_id', auth, (req, res) => detailEvent(req, res));
router.put('/event/update/:_id', 
  upload.none(), 
  auth,
  body('name').optional({ checkFalsy: true }).isString(),
  body('location').optional({ checkFalsy: true }).isString(),
  body('startdate').optional({ checkFalsy: true })
    .isISO8601('yyyy-mm-dd hh:mm')
    .isAfter(new Date(Date.now()).toISOString()),
  body('enddate').optional({ checkFalsy: true })
    .isISO8601('yyyy-mm-dd hh:mm')
    .custom((val, meta) => isStartEndDate(val, meta)),
  (req, res) => updateEvent(req, res));
router.delete('/event/delete/:_id', upload.none(), auth, (req, res) => removeEvent(req, res));

//END_EVENT_ROUT

module.exports = router;