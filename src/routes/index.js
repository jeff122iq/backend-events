const { Router } = require('express');
const router = Router();

router.post('/', (req, res) => console.log('todo'));

module.exports = router;