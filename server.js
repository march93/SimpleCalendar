const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 5000;

// Events Router
const events_router = require('./routes/events_router');

// Redirect to router
app.use('/events', events_router);

// start the express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );