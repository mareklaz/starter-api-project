const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const EMAIL_PATTERN = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PASSWORD_PATTERN = /^.{8,}$/i;
const ROUNDS = 10;

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Es necesario introducir un nombre de usuario'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Es necesario introducir un e-mail'],
      match: [EMAIL_PATTERN, 'Es necesario introducir un e-mail válido'],
    },
    password: {
      type: String,
      required: [true, 'Es necesario introducir un password'],
      match: [PASSWORD_PATTERN, 'Es necesario introducir un password válido'],
      minlength: 3,
    },
    profile: {
      type: String,
      enum: ['Frontend', 'Backend', 'Fullstack', 'UX/UI', 'Data Analyst'],
      default: 'Frontend',
    },
    about: {
      type: String,
    },
    githubLink: {
      type: String,
    },
    linkedinLink: {
      type: String,
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80',
    },
    token: {
      type: String,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.__v;
        delete ret._id;
        return ret;
      },
    },
  }
);

UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    bcrypt.hash(this.password, ROUNDS).then((hash) => {
      this.password = hash;
      next();
    });
  } else {
    next();
  }
});

UserSchema.methods.checkPassword = function (passwordToCompare) {
  return bcrypt.compare(passwordToCompare, this.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
