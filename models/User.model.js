const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const EMAIL_PATTERN = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PASSWORD_PATTERN = /^.{8,}$/i;
const ROUNDS = 10;

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    username: {
      type: String,
      required: [true, 'Es necesario introducir un nombre de usuario'],
      minlength: 3,
      maxlength: 100,
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
      minlength: 6,
      maxlength: 25,
    },
    profile: {
      type: String,
      enum: ['Frontend', 'Backend', 'Fullstack', 'UX/UI', 'Data Analyst'],
    },
    description: {
      type: String,
    },
    skills: {
      type: [{ skillName: String, skillId: String }],
    },
    linkedinURL: {
      type: String,
    },
    githubURL: {
      type: String,
    },
    webURL: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.__v;
        delete ret._id;
        // delete ret.password;
        // delete ret.token;
        // delete ret.active;
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
