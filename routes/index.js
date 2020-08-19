const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index');

router.get('/', indexController.list_of_currency);

module.exports = router;
