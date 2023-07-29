const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Please enter name for task'],
    trim: true,
    minLength: [3, 'Task name cannot be shorter than 3 characters'],
    maxLength: [20, 'Name task can not be more than 20 characters'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Task', taskSchema);
