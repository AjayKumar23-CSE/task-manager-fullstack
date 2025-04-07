export const fetchTasks = async () => {
    const res = await fetch('/api/tasks');
    return res.json();
  };
  
  export const addTask = async (text) => {
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    return res.json();
  };
  
  export const updateTaskStatus = async (id, status) => {
    const res = await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    return res.json();
  };

  export const deleteTask = async (id) => {
    const res = await fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    return res.json();
  };

  export const deleteCompletedTask = async () => {
    const res = await fetch(`/api/tasks`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    return res.json();
  };