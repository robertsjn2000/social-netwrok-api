const {Schema, model} = require('mongoose');
const moment = require('moment');
const reactionSchema = require('./Reaction')
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (val) => moment(val).format('MMM DD, YYYY [at] hh:mm a')
    },
    users: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Users',
        },
    ], 
    reactions: [reactionSchema] 
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

const Thoughts = model('Thoughts', thoughtSchema);
module.exports = Thoughts; 