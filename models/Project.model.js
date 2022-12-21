const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Es necesario introducir un nombre de usuario'],
    },
    description: {
      type: String,
      required: [true, 'Es necesario introducir la descripción del Proyecto'],
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      // required: [true, 'Es necesario introducir una fecha de finalización del proyecto'],
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
