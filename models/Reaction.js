const { Schema, Types } = require('mongoose');
const dayjs = require('dayjs')


const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
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
            default: dayjs(new Date()).format('MM-DD-YY')
            // default: () => dayjs(new Date()).format('MM-DD-YY)
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