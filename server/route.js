const  { addTasks, deleteTasks, getTasks, updateTasks, deleteCompletedTasks } = require('./controller.js');
const express = require('express');
const router = express.Router();

router.get('/',getTasks);
router.post('/',addTasks);
router.put('/:id',updateTasks);
router.delete('/:id',deleteTasks);
router.delete('/',deleteCompletedTasks);
module.exports = router;