const express = require('express');
const router = express.Router();

// Require controllers
var users_controller = require('../controllers/users_controller');

// GET User
// PARAMS id: user_id
router.get('/:id', users_controller.get_user);

// GET User events
// PARAMS id: user_id
// QUERY date
router.get('/:id/events', users_controller.get_user_events);

module.exports = router;