const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
          type: String,
          required: true,
          maxlength: 280,
          minlength: 1
        },
        createdAt: {
          type: Date,
          default: new Date().toString(),
        },
        username: {
            type: String,
            required: true
        }  ,
        reactions: [Reaction]     
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        }
    }
);

thoughtSchema.virtual('reactionCount')
.get(function () {
    return `Number of reaction: ${this.reactions.length}`;
})

// How to use a getter method to format the timestamp on query? What does getters: true actually do?

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;