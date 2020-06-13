const Event = require('../models/event');
const EventSerializer = require('../serializers/event_serializer');

exports.RepeatMethod = Object.freeze({
    SINGLE: "single",
    WEEKLY: "weekly",
    MONTHLY: "monthly"
});

exports.process_events = async (body) => {
    let promiseArr = [];
    let dateCopy = new Date(body.eventDate);

    for (i = 0; i < 10; i++) {
        const promise = new Promise((resolve, reject) => {
            resolve(Event.create({
                UserId: body.userId,
                title: body.title,
                eventDate: dateCopy.toDateString(),
                startTime: body.startTime,
                endTime: body.endTime
            }));
        });

        if (body.occurrence === this.RepeatMethod.WEEKLY) {
            // Increment by a week
            dateCopy.setDate(dateCopy.getDate() + 7);
        } else {
            // Increment by a month
            dateCopy.setMonth(dateCopy.getMonth() + 1);
        }

        promiseArr.push(promise);
    }

    return Promise.all(promiseArr)
    .then(values => {
        const serialized = EventSerializer.serialize_event(values);
        const trimmed = EventSerializer.trim_data(serialized.data);
        return trimmed;
    });
}