const Task = require('./../models/taskModels');
const catchAsync = require('./../middleware/async');
const { createError } = require('./../errors/AppError');

// Get All Tasks
exports.getAllTasks = catchAsync(async (req, res) => {
  const tasks = await Task.find();

  res.status(200).json({
    status: 'success',
    quantity: tasks.length,
    tasks,
  });
});

exports.getTask = catchAsync(async (req, res, next) => {
  const task = await Task.findOne({ _id: req.params.id });

  if (!task) {
    return next(createError(`No task with id ${req.params.id}`, 404));
  }

  res.status(200).json({
    status: 'success',
    task,
  });
});

exports.createTask = catchAsync(async (req, res) => {
  const task = await Task.create(req.body);

  res.status(201).json({
    status: 'success',
    task,
  });
});

exports.updateTask = catchAsync(async (req, res, next) => {
  const task = await Task.findOneIdAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(createError(`No task with id ${req.params.id}`, 404));
  }

  res.status(201).json({
    status: 'success',
    task,
  });
});

exports.deleteTask = catchAsync(async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);

  res.status(201).json({
    status: 'success',
  });
});
