const Event = require('../models/event');
const EventSerializer = require('../serializers/event_serializer');

exports.get_event = async (req, res) => {
    let event;

    try {
        event = await Event.findAll({
            where: {
                id: req.params.id
            }
        });
    } catch (error) {
        res.status(500).send({error: error.name});
    }

    if (event.length === 0) {
        // Return 404 Not Found
        res.status(404).send({error: 'Event not found'});
    }

    // Serialize and then map to a more reader friendly json object
    const serialized = EventSerializer.serialize_event(event);
    const parsed = EventSerializer.trim_data(serialized.data);

    res.json(parsed);
}

exports.create_event = async (req, res) => {
    const body = req.body;
    let event;

    try {
        event = await Event.create({
            title: body.title,
            startTime: body.startTime,
            endTime: body.endTime,
            UserId: req.params.id
        });
    } catch (error) {
        res.status(400).send({error: error.name});
    }

    // Serialize return data
    const serialized = EventSerializer.serialize_event(event);

    // 201 Created
    res.status(201);
    res.json(serialized.data.attributes);
}