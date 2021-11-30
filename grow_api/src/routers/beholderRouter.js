const express = require('express');
const router = express.Router();
const beholderController = require('../controllers/beholderController');

router.get('/memory/indexes', beholderController.getMemoryIndexes);

router.get('/memory', beholderController.getMemory);

router.get('/brain/indexes', beholderController.getBrainIndexes);

router.get('/brain', beholderController.getBrain);

module.exports = router;