const User = require('../models/user');
const Event = require('../models/event');
const EventSerializer = require('../serializers/event_serializer');

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
    const user = await User.findOne({
        where: {
            id: req.params.id
        }
    });

    return res.json(user);
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