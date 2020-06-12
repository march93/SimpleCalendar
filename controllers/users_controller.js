const User = require('../models/user');
const Event = require('../models/event');
const EventSerializer = require('../serializers/event_serializer');
const UserSerializer = require('../serializers/user_serializer');

filter_dates = (events, date) => {
    return events.filter((event) => {
        let eventStartDate = new Date(event.startTime);
        let eventEndDate = new Date(event.endTime);
        let queryDate = new Date(date);

        return (
                eventStartDate.getMonth() == queryDate.getMonth() &&
                eventStartDate.getFullYear() == queryDate.getFullYear()
               ) ||
               (
                eventEndDate.getMonth() == queryDate.getMonth() &&
                eventEndDate.getFullYear() == queryDate.getFullYear()
               );
    });
}

exports.get_user = async (req, res) => {
    let user;

    try {
        user = await User.findOne({
            where: {
                id: req.params.id
            }
        });
    } catch (error) {
        return res.status(500).send({error: error.name});
    }

    // 404 User Not Found
    if (user === null) return res.status(404).send({error: 'User not found'});

    const serialized = UserSerializer.serialize_user(user);

    // 200 OK
    res.status(200);
    res.json(serialized.data.attributes);
}

exports.get_user_events = async (req, res) => {
    let events = [];

    try {
        events = await Event.findAll({
            where: {
                UserId: req.params.id
            }
        });
    } catch (error) {
        return res.status(500).send({error: error.name});
    }

    // If a date is provided, return only events from that date
    if (req.query.date) events = filter_dates(events, req.query.date);

    // Serialize and then map to a more reader friendly json object
    const serialized = EventSerializer.serialize_event(events);
    const parsed = EventSerializer.trim_data(serialized.data);

    // 200 OK
    res.status(200);
    res.json(parsed);
}

exports.update_user = async (req, res) => {
    const body = req.body;
    let user;

    try {
        user = await User.findOne({
            where: {
                id: req.params.id
            }
        });
    } catch (error) {
        return res.status(500).send({error: error.name});
    }

    if (user === null) {
        // Return 404 Not Found
        return res.status(404).send({error: 'User not found'});
    }

    // Update attributes if they exist
    if (body.firstName) user.firstName = body.firstName;
    if (body.lastName) user.lastName = body.lastName;
    if (body.email) user.email = body.email;
    if (body.workingHours !== undefined) user.workingHours = body.workingHours;

    // Save changes to database
    await user.save();

    // Serialize return data
    const serialized = UserSerializer.serialize_user(user);

    // 200 OK
    res.status(200);
    res.json(serialized.data.attributes);
}