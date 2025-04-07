import { createContext, useContext, useMemo, useCallback, useEffect, useState } from 'react';
import { fetchTasks, addTask as apiAddTask, updateTaskStatus as apiUpdateTaskStatus,deleteTask as apiDeleteTask,deleteCompletedTask as apiDeleteCompletedTask } from '../components/TaskService';
import { useLocalStorage } from '../hooks/useLocalStorage';

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasks = await fetchTasks();
        setTasks(tasks);
      } catch (error) {
        console.error('Failed to load tasks:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadTasks();
  }, []);

  const addTask = useCallback(async (taskText) => {
    if (!taskText.trim()) return;
    
    try {
      const newTask = await apiAddTask(taskText);
      setTasks(prevTasks => [...prevTasks, newTask]);
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  }, []);

  const toggleTask = useCallback(async (taskId) => {
    try {
      const task = tasks.find(t => t.id === taskId);
      if (!task) return;
      
      const newStatus = task.status === 'Done' ? 'To Do' : 'Done';
      await apiUpdateTaskStatus(taskId, newStatus);
      
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  }, [tasks]);

  const deleteTask = useCallback(async(taskId) => {
    await apiDeleteTask(taskId)
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  }, []);

  const clearCompleted = useCallback(async() => {
    await apiDeleteCompletedTask()
    setTasks(prevTasks => prevTasks.filter(task => task.status !== 'Done'));
  }, []);

  const reorderTasks = useCallback((startIndex, endIndex) => {
    setTasks(prevTasks => {
      const result = Array.from(prevTasks);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
   
  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  }, [setTheme]);

  const value = useMemo(() => ({
    tasks,
    theme,
    isLoading,
    addTask,
    toggleTask,
    deleteTask,
    clearCompleted,
    reorderTasks,
    toggleTheme,
  }), [tasks, theme, isLoading, addTask, toggleTask, deleteTask, clearCompleted, reorderTasks, toggleTheme]);

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  return useContext(TaskContext);
}