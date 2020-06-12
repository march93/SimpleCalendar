const JSONAPISerializer = require('jsonapi-serializer').Serializer;

const UserSerializer = new JSONAPISerializer('user', {
    attributes: [
        'id',
        'firstName',
        'lastName',
        'email',
        'workingHours'
    ],
    keyForAttribute: 'camelCase'
});

exports.serialize_user = (user) => UserSerializer.serialize(user);

exports.trim_data = (user) => user.map((u) => u.attributes);