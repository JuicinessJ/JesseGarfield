const { Schema, Types } = require('mongoose');
const dayjs = require('dayjs')


const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: ObjectId
        },
        reactionBody: {
            type: String,
            required: true,
            max: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // Create a function inside the utils folder to format the timestamp
            // A getter method to format timestamp on query, assuming need to use toJSON and put a getter inside.
        }
    },
    {
        toJSON: {
            getters: true,
        },
        id: false
    }
);


module.exports = reactionSchema;