import React, { useState } from 'react';
import { TaskProvider } from './context/TaskContext';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { FilterButtons } from './components/FilterButtons';
import { ThemeToggle } from './components/ThemeToggle';
import './styles/theme.css';
import './styles/animations.css';
import './styles/main.css';

function App() {
  const [filter, setFilter] = useState('all');

  return (
    <TaskProvider>
      <div className="app">
        <div className="header">
          <h1>Task Tracker</h1>
          <ThemeToggle />
        </div>
        <main className="container">
          <TaskForm />
          <div className="filter-tabs">
            <button 
              className={`tab ${filter === 'all' ? 'active' : ''}`} 
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={`tab ${filter === 'pending' ? 'active' : ''}`} 
              onClick={() => setFilter('pending')}
            >
              Active
            </button>
            <button 
              className={`tab ${filter === 'completed' ? 'active' : ''}`} 
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
          </div>
          <TaskList filter={filter} />
          <FilterButtons />
        </main>
      </div>
    </TaskProvider>
  );
}

export default App;