const mongoose = require('mongoose');

const pitStopSchema = new mongoose.Schema({
    id: {
        required: true,
        type: String,
    },
    type: {
        required: true,
        type: String,
    },
    name: {
        required: true,
        type: String,
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
    AllDayAccess: {
        required: true,
        type: Boolean,
    },
    LGBTQfriendly: {
        required: true,
        type: Boolean
    },
    wheelChairFriendly: {
        required: true,
        type: Boolean,
    },
});

module.exports = mongoose.model('pit-stops', pitStopSchema);