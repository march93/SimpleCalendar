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

// PATCH Update a user
// PARAMS id: user_id
// BODY { firstName, lastName, email, workingHours }
router.patch('/:id', users_controller.update_user);

module.exports = router;