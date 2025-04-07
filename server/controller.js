const fs = require('fs')
const path = require('path');

const DATA_FILE = path.join(__dirname, 'tasks.json');
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, '[]');
}
function readTasksFile() {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf-8') || '[]';
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading tasks file:', error.message);
        return [];
    }
}

const getTasks =  (req, res) => {
    try {
        const tasks = readTasksFile();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Failed to load tasks' });
    }
}

const addTasks = (req, res) => {
    try {
        const { text } = req.body;
        if (!text || typeof text !== 'string') {
            return res.status(400).json({ error: 'Task text is required and must be a string' });
        }

        const tasks = readTasksFile();
        const newTask = {
            id: Date.now(),
            text,
            status: 'To Do',
            createdAt: new Date().toISOString()
        };

        tasks.push(newTask);
        fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create task' });
    }
}

const updateTasks = (req, res) => {
    try {
        const { status } = req.body;
        const taskId = Number(req.params.id);

        if (!status || typeof status !== 'string') {
            return res.status(400).json({ error: 'Status is required and must be a string' });
        }

        const tasks = readTasksFile();
        let taskFound = false;
        const updatedTasks = tasks.map(task =>
            task.id === taskId
                ? (taskFound = true, { ...task, status })
                : task
        );

        if (!taskFound) {
            return res.status(404).json({ error: 'Task not found' });
        }

        fs.writeFileSync(DATA_FILE, JSON.stringify(updatedTasks, null, 2));
        res.json({ message: 'Task updated successfully', tasks: updatedTasks });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update task' });
    }
}

const deleteTasks = (req, res) => {
    try {
        const taskId = Number(req.params.id);
        const tasks = readTasksFile();
        const filteredTasks = tasks.filter(task => task.id !== taskId);

        if (tasks.length === filteredTasks.length) {
            return res.status(404).json({ error: 'Task not found' });
        }

        fs.writeFileSync(DATA_FILE, JSON.stringify(filteredTasks, null, 2));
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete task' });
    }
}

const deleteCompletedTasks = (req, res) => {
    try {
        const tasks = readTasksFile();
        const remainingTasks = tasks.filter(task => task.status !== 'Done');

        if (remainingTasks.length === tasks.length) {
            return res.status(404).json({ message: 'No completed tasks to delete' });
        }

        fs.writeFileSync(DATA_FILE, JSON.stringify(remainingTasks, null, 2));
        res.status(200).json({
            message: 'All completed tasks deleted successfully',
            remainingTasks
        });
    } catch (err) {
        console.error('Error deleting completed tasks:', err.message);
        res.status(500).json({ error: 'Failed to delete completed tasks' });
    }
}

module.exports = {getTasks,addTasks,updateTasks,deleteTasks,deleteCompletedTasks}