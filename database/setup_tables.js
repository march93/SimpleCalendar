const sequelize = require('./setup_db');
const User = require('../models/user');
const Event = require('../models/event');

// Associations
User.hasMany(Event);
Event.belongsTo(User);

const create_tables = async () => {
    await sequelize.sync();
    console.log('All models synced');

    // Create initial user
    await User.create({
        firstName: 'Kobe',
        lastName: 'Bryant',
        email: 'black@mamba.com'
    });
}
create_tables();
