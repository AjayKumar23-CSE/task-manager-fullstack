import React from 'react';
import { useTasks } from '../context/TaskContext';

export function FilterButtons() {
  const { tasks, clearCompleted } = useTasks();
  const pendingCount = tasks.filter(task => !task.completed).length;

  return (
    <div className="filter-container">
      <span className="items-left">{pendingCount} {pendingCount === 1 ? 'item' : 'items'} left</span>
      <div className="filter-buttons">
        {/* <button className="filter-button active">All</button>
        <button className="filter-button">Active</button>
        <button className="filter-button">Completed</button> */}
      </div>
      <button onClick={clearCompleted} className="clear-completed">
        Clear Completed
      </button>
    </div>
  );
}