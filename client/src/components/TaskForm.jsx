import { useState, useRef, useEffect } from 'react';
import { useTasks } from '../context/TaskContext';

export function TaskForm() {
  const { addTask } = useTasks();
  const [taskText, setTaskText] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskText.trim()) {
      setError('Task cannot be empty');
      return;
    }
    addTask(taskText);
    setTaskText('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="input-container">
        <input
          ref={inputRef}
          type="text"
          value={taskText}
          onChange={(e) => {
            setTaskText(e.target.value);
            if (error) setError('');
          }}
          placeholder="Add a new task..."
          className={`task-input ${error ? 'error' : ''}`}
        />
        {error && <span className="error-message">{error}</span>}
      </div>
      <button type="submit" className="add-button">
        Add Task
      </button>
    </form>
  );
}