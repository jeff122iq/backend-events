const { register } = require('../services/user')
const { Router } = require('express');
const router = Router();

//USER_ROUT 

router.post('/register', (req, res) => register(req, res));

//END_USER_ROUT
//EVENT_ROUT

//END_EVENT_ROUT

module.exports = router;