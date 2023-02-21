const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Es necesario introducir de PROYECTO'],
    },
    description: {
      type: String,
      required: [true, 'Es necesario introducir la descripción del PROYECTO'],
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
    },
    github: {
      type: String,
      default: 'https://github.com/',
    },
    status: {
      type: Number,
      enum: [0, 1, 2, 3],
      default: 0,
    },
    type: {
      type: String,
      enum: ['Web', 'UXUI', 'Data'],
    },
    tags: {
      type: [{ id: String, tag: String }],
    },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true],
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

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
