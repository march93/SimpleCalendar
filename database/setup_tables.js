const User = require('../models/user');
const Event = require('../models/event');

// Associations
User.hasMany(Event);
Event.belongsTo(User);