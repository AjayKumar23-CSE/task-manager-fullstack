import React, { useMemo } from 'react';
import { useTasks } from '../context/TaskContext';
import { DragDropWrapper } from './DragDropWrapper';
import { Task } from './Task';

export function TaskList({ filter }) {
  const { tasks, isLoading } = useTasks();

  const filteredTasks = useMemo(() => {
    if (isLoading) return [];
    
    switch (filter) {
      case 'completed':
        return tasks.filter(task => task.status === 'Done');
      case 'pending':
        return tasks.filter(task => task.status !== 'Done');
      default:
        return tasks;
    }
  }, [tasks, filter, isLoading]);

  if (isLoading) {
    return <div className="loading">Loading tasks...</div>;
  }

  return (
    <div className="task-list-container">
      <DragDropWrapper tasks={filteredTasks}>
        {filteredTasks.map(task => (
          <Task key={task.id} task={task} />
        ))}
      </DragDropWrapper>
    </div>
  );
}