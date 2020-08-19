const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index');

router.get('/', indexController.list_of_currency);
router.get('/conver', indexController.conver);
router.post('/converCal', indexController.conver);

module.exports = router;
