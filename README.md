# Task Manager Pro (Fullstack)

A fullstack task management application with React (Vite) frontend and Node.js backend.

## Features

🚀 **Core Functionality**
- Add/edit/delete tasks
- Track status (To Do/In Progress/Done)
- Filter tasks by status
- Persistent storage with JSON database

🎨 **UI/UX**
- Dark/Light mode toggle
- Drag-and-drop reordering
- Status color coding
- Responsive design

⚡ **Tech Stack**
- Frontend: React + Vite + CSS Modules
- Backend: Node.js + Express
- Data: JSON file storage

## Setup Instructions

### 1. Clone Repository
git clone https://github.com/AjayKumar23-CSE/task-manager-fullstack.git
cd task-manager-fullstack

2. Install Dependencies
# Frontend dependencies
cd client
npm install

# Backend dependencies
cd ../server
npm install

3. Run Development Servers
Open two terminal windows:

Terminal 1 (Frontend):
cd client
npm run dev

Terminal 2 (Backend):
cd server
node server.js

Frontend will run at: http://localhost:3000
Backend API will run at: http://localhost:3001