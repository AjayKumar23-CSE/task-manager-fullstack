import React from 'react';
import { useTasks } from '../context/TaskContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTasks();

  return (
    <button 
      onClick={toggleTheme} 
      className="theme-toggle"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <span role="img" aria-label="Dark mode">🌙</span>
      ) : (
        <span role="img" aria-label="Light mode">☀️</span>
      )}
    </button>
  );
}