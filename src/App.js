import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskInput from './components/TaskInput';
import Signup from './components/Signup';
import Login from './components/Login';
import CalendarPage from './components/CalendarPage'; // Import the calendar page

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    axios.get('http://localhost:5001/tasks', {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    })
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, [token]);

  const addTask = (taskText, dueDate) => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    axios.post('http://localhost:5001/tasks', { text: taskText, completed: false, dueDate }, { headers })
      .then(response => setTasks([...tasks, response.data]))
      .catch(error => console.error('Error adding task:', error));
  };

  const toggleTask = (taskId) => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    axios.patch(`http://localhost:5001/tasks/${taskId}`, {}, { headers })
      .then(response => {
        const updatedTasks = tasks.map(task => task.id === taskId ? response.data : task);
        setTasks(updatedTasks);
      })
      .catch(error => console.error('Error toggling task:', error));
  };

  const deleteTask = (taskId) => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    axios.delete(`http://localhost:5001/tasks/${taskId}`, { headers })
      .then(() => setTasks(tasks.filter(task => task.id !== taskId)))
      .catch(error => console.error('Error deleting task:', error));
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    const dateA = a.dueDate ? new Date(a.dueDate) : new Date(0); 
    const dateB = b.dueDate ? new Date(b.dueDate) : new Date(0);
    
    if (a.completed === b.completed) {
      return dateA - dateB;
    }
    
    return a.completed ? 1 : -1;
  });

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
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/" element={<Navigate to="/todo" />} />
        <Route path="/todo" element={
          <div className="todo-container">
            <h1>To-Do List</h1>
            <TaskInput addTask={addTask} />
            <TaskList 
              tasks={sortedTasks} 
              toggleTask={toggleTask} 
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