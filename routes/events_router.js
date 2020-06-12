const express = require('express');
const router = express.Router();

// Require controllers
var events_controller = require('../controllers/events_controller');

// GET a specific event by id
// PARAMS id: event_id
router.get('/:id', events_controller.get_event);

module.exports = router;