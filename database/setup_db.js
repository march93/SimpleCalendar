// Setup database
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

// Connect to database
const connect = async () => {
   try {
       await sequelize.authenticate();
       console.log('Connected');
   } catch (error) {
       console.error('Error:', error);
   }
}
connect();

module.exports = sequelize;