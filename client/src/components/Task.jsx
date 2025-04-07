import React from 'react';
import { useTasks } from '../context/TaskContext';

export const Task = React.memo(({ task }) => {
  const { toggleTask, deleteTask } = useTasks();
  const [isHovered, setIsHovered] = React.useState(false);

  const statusColors = {
    'To Do': 'status-todo',
    'In Progress': 'status-in-progress',
    'Done': 'status-done'
  };

  return (
    <div
      className={`task ${statusColors[task.status] || ''} ${task.completed ? 'completed' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.status === 'Done'}
          onChange={() => toggleTask(task.id)}
          className="task-checkbox"
        />
        <span className="task-text">{task.text}</span>
      </div>
      {isHovered && (
        <button
          onClick={() => deleteTask(task.id)}
          className="delete-button"
          aria-label="Delete task"
        >
          ×
        </button>
      )}
    </div>
  );
});