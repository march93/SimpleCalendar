const express = require('express');
const router = express.Router();

// Require controllers
var events_controller = require('../controllers/events_controller');

// GET a specific event by id
// PARAMS id: event_id
router.get('/:id', events_controller.get_event);

// POST Create an event for a specific user
// PARAMS id: user_id
router.post('/:id', events_controller.create_event);

module.exports = router;