const mongoose = require('mongoose');

const LinkSchema = new mongoose.Schema(
    {
        originalUrl: {
            type: String,
            required: [true, 'Please add original url']
        },
        shortUrl: {
            type: String,
            required: [true, 'Please add short url']
        },
        active: {
            type: Boolean,
            default: true,
        },
        clicks: {
            type: Number,
            required: true,
            default: 0,
        },
        deviceId: {
            type: Number,
            required: true,
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true]
        },
        duration: {
            type: Number
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Link', LinkSchema);
