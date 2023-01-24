const mongoose = require('mongoose');

const CollaborationSchema = new mongoose.Schema(
  {
    collaboratorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: [true],
    },
    collaboratorProfile: {
      type: String,
      enum: ['Frontend', 'Backend', 'Fullstack', 'UX/UI', 'Data Analyst'],
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

const Collaboration = mongoose.model('Collaboration', CollaborationSchema);

module.exports = Collaboration;
