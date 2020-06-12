const JSONAPISerializer = require('jsonapi-serializer').Serializer;

const EventSerializer = new JSONAPISerializer('events', {
    attributes: ['id', 'title', 'startDate', 'endDate', 'startTime', 'endTime'],
    keyForAttribute: 'camelCase'
});

exports.serialize_event = (event) => EventSerializer.serialize(event);

exports.trim_data = (events) => events.map((event) => event.attributes);