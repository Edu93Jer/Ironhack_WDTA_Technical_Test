const Task = require('../models/Task');
const CustomError = require('../errors/customError');

exports.createTask = async (req, res) => {
  try {
    data = req.body;
    data.createdBy = req.user

    const task = await Task.create({ ...data });
    res.status(201).json({ task });
  } catch (e) {
    const code = e.errorCode || 500;
    console.log(e);
    return res.status(code).json({ errors: [{ msg: e.message }] });
  }
};

exports.allTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 })
    .populate({ path: 'createdBy', select: 'name' })
    .populate({ path: 'completedBy', select: 'name' })

    res.status(200).json({ tasks });
  } catch (e) {
    const code = e.errorCode || 500;
    console.log(e);
    return res.status(code).json({ errors: [{ msg: e.message }] });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params
    const task = await Task.findById( id )
    const idUser = req.user

    if ( task.isItCompleted == false ){
      task.isItCompleted = true
      task.completedBy = idUser
    } else {
      task.isItCompleted = false
      task.completedBy = undefined
    }
    

    const taskModified = await Task.findByIdAndUpdate(id, { $set: { ...task } }, {new: true, useFindAndModify: false})
    .populate({ path: 'createdBy', select: 'name' })
    .populate({ path: 'completedBy', select: 'name' })
    res.status(200).json({ taskModified });
  } catch (e) {
    const code = e.errorCode || 500;
    console.log(e);
    return res.status(code).json({ errors: [{ msg: e.message }] });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById( id )
    const idUser = req.user

    if (task.createdBy != idUser) {
      throw new CustomError(401, 'Only the person that created the task can delete it');
    }
    
    const taskDeleted = await Task.findByIdAndDelete(id);
    return res.status(200).json({ taskDeleted });
  } catch (e) {
    const code = e.errorCode || 500;
    console.log(e);
    return res.status(code).json({ errors: [{ msg: e.message }] });
  }
};
