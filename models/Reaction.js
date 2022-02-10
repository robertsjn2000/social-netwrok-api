const {Schema, model, Types} = require('mongoose');
const moment = require('moment');
const reactionSchema = new Schema({
    reactionId: {
        type: Types.ObjectId,
        default: new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280,
    },
    userName: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (val) => moment(val).format('MMM DD, YYYY [at] hh:mm a')
    }
},
{
    toJSON: {
        getters: true
    },
    id: false
});

module.exports = reactionSchema;