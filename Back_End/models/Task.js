const { Schema, model } = require('mongoose');

const taskSchema = new Schema(
  {
    title: { type: String, max: 80 },
    description: { type: String, max: 250 },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    isItCompleted: { type: Boolean, default: false },
    completedBy: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

module.exports = model('Task', taskSchema);
