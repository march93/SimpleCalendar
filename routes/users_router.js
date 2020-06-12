const express = require('express');
const router = express.Router();

// Require controllers
var users_controller = require('../controllers/users_controller');

// GET User
// PARAMS id: user_id
router.get('/:id', users_controller.get_user);

module.exports = router;