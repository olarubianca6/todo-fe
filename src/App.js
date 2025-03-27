import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskInput from './components/TaskInput';
import Signup from './components/Signup';
import Login from './components/Login';
import CalendarPage from './components/CalendarPage'; 

const TASKS_API_BASE = 'https://us-central1-todo-454613.cloudfunctions.net/backendtodo';
const USERS_API_BASE = 'https://todousers-71023456585.us-central1.run.app';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    axios.get(`${TASKS_API_BASE}/get_all_tasks`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    })
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, [token]);

  const addTask = (taskText, dueDate) => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    axios.post(`${TASKS_API_BASE}/insert_task`,
      new URLSearchParams({ task: taskText, description: dueDate }),
      { headers })
      .then(response => setTasks([...tasks, response.data]))
      .catch(error => console.error('Error adding task:', error));
  };

  const deleteTask = (taskId) => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    axios.delete(`${TASKS_API_BASE}/delete_task`,
      { data: new URLSearchParams({ task: taskId }), headers })
      .then(() => setTasks(tasks.filter(task => task.id !== taskId)))
      .catch(error => console.error('Error deleting task:', error));
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <Router>
      <nav>
        <Link to="/todo">To-Do List</Link> | <Link to="/calendar">Calendar</Link>
        <div className="auth-buttons-container">
          {!token ? (
            <>
              <Link to="/signup"><button className="auth-btn">Sign Up</button></Link>
              <Link to="/login"><button className="auth-btn">Log In</button></Link>
            </>
          ) : (
            <button className="auth-btn" onClick={logout}>Log Out</button>
          )}
        </div>
      </nav>
      <Routes>
        <Route path="/signup" element={<Signup USERS_API_BASE={USERS_API_BASE} />} />
        <Route path="/login" element={<Login USERS_API_BASE={USERS_API_BASE} setToken={setToken} />} />
        <Route path="/" element={<Navigate to="/todo" />} />
        <Route path="/todo" element={
          <div className="todo-container">
            <h1>To-Do List</h1>
            <TaskInput addTask={addTask} />
            <TaskList 
              tasks={tasks} 
              deleteTask={deleteTask} 
            />
          </div>
        } />
        <Route path="/calendar" element={<CalendarPage tasks={tasks} />} />
      </Routes>
    </Router>
  );
};

export default App;
