const {Schema, model} = require('mongoose');
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: new Schema.Types.ObjectId()
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