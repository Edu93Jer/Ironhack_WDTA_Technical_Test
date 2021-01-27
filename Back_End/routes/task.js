const router = require('express').Router();

const { createTask, allTasks, updateTask, deleteTask } = require('../controllers/task');
const auth = require('../middlewares/auth');

router.post('/posting', auth(), createTask);
router.get('/posting', auth(), allTasks);
router.put('/posting:id', auth(), updateTask);
router.delete('/deletepost:id', auth(), deleteTask);

module.exports = router;
