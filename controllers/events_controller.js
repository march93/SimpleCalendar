const Event = require('../models/event');

exports.get_event = async (req, res) => {
    const event = await Event.findAll({
        where: {
            id: req.params.id
        }
    });

    res.json(event);
}

exports.create_event = async (req, res) => {
    const body = req.body;

    const event = await Event.create({
        title: body.title,
        startTime: body.startTime,
        endTime: body.endTime,
        UserId: req.params.id
    });

    res.json(event);
}