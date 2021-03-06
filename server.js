const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express();

require('./database/setup_db');
require('./database/setup_tables');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 5000;

// Users Router
const users_router = require('./routes/users_router');

// Events Router
const events_router = require('./routes/events_router');

// Redirect to users router
app.use('/users', users_router);

// Redirect to events router
app.use('/events', events_router);

// start the express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );