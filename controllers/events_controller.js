const Event = require('../models/event');
const EventSerializer = require('../serializers/event_serializer');
const EventService = require('../services/event_service');

exports.get_event = async (req, res) => {
    let event;

    try {
        event = await Event.findOne({
            where: {
                id: req.params.id
            }
        });
    } catch (error) {
        return res.status(500).send({error: error.name});
    }

    if (event === null) {
        // Return 404 Not Found
        return res.status(404).send({error: 'Event not found'});
    }

    // Serialize and then map to a more reader friendly json object
    const serialized = EventSerializer.serialize_event(event);

    // 200 OK
    res.status(200);
    res.json(serialized.data.attributes);
}

exports.create_event = async (req, res) => {
    const body = req.body;
    let event;
    let serialized;

    if (body.startTime >= body.endTime) {
        // Start time and date cannot be after end time and date
        return res.status(400).send({error: 'Invalid event times'});
    }

    if (body.occurrence === EventService.RepeatMethod.SINGLE) {
        try {
            event = await Event.create({
                UserId: body.userId,
                title: body.title,
                eventDate: body.eventDate,
                startTime: body.startTime,
                endTime: body.endTime
            });

            // Serialize return data
            serialized = EventSerializer.serialize_event(event);

            // 201 Created
            res.status(201);
            res.json([serialized.data.attributes]);
        } catch (error) {
            return res.status(400).send({error: error.name});
        }
    } else {
        serialized = await EventService.process_events(body);

        // 201 Created
        res.status(201);
        res.json(serialized);
    }
}

exports.update_event = async (req, res) => {
    const body = req.body;
    let event;

    try {
        event = await Event.findOne({
            where: {
                id: req.params.id
            }
        });
    } catch (error) {
        return res.status(500).send({error: error.name});
    }

    if (event === null) {
        // Return 404 Not Found
        return res.status(404).send({error: 'Event not found'});
    }

    // Update attributes if they exist
    if (body.title) event.title = body.title;
    if (body.startTime) event.startTime = body.startTime;
    if (body.eventDate) event.eventDate = body.eventDate;

    // Throw error if end time exists and is before start time
    if (body.endTime && (body.startTime >= body.endTime)) {
        return res.status(400).send({error: 'Invalid end time'});
    } else {
        event.endTime = body.endTime;
    }

    // Save changes to database
    await event.save();

    // Serialize return data
    const serialized = EventSerializer.serialize_event(event);

    // 200 OK
    res.status(200);
    res.json(serialized.data.attributes);
}

exports.delete_event = async (req, res) => {
    try {
        await Event.destroy({
            where: {
                id: req.params.id
            }
        });
    } catch (error) {
        return res.status(500).send({error: error.name});
    }

    // 204 Deleted No Content
    res.status(204);
    res.send();
}