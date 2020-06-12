const User = require('../models/user');

exports.get_user = async (req, res) => {
    const user = await User.findOne({
        where: {
            id: req.params.id
        }
    });

    return res.json(user);
}