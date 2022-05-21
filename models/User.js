const { Schema, model } = require('mongoose');
import isEmail from 'validator/lib/isEmail';

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
        validate: [isEmail, 'invalid email']
    },
    thoughts: [
        {
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    }
],
    friends: [
        {
        type: Schema.Types.ObjectId,
        ref: 'User',
      }
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.virtual('friendCount')
.get(function () {
    return `Number of friends: ${this.friends.length}`;
})

const User = model('User', userSchema);

module.exports = User;
