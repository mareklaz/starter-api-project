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
      // required: [true, 'Es necesario introducir una fecha de finalización del PROYECTO'],
    },
    github: {
      type: String,
      default: 'https://github.com/',
    },
    status: {
      type: String,
      enum: ['Iniciado', 'En progreso', 'Pendiente', 'Finalizado'],
      default: 'Iniciado',
    },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true],
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1555680510-34daedadbdb1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
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
