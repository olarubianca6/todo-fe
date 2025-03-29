import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskInput from './components/TaskInput';
import Signup from './components/Signup';
import Login from './components/Login';
import CalendarPage from './components/CalendarPage';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isEditing, setIsEditing] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [newDescription, setNewDescription] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [username, setUsername] = useState(localStorage.getItem('username') || 'guest'); 
  const BACKEND_URL = 'https://us-central1-todo-454613.cloudfunctions.net/backendtodo';

  useEffect(() => {
    axios.get(`${BACKEND_URL}/get_all_tasks`, {
      params: { username }, 
    })
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, [username, BACKEND_URL]);

  const addTask = (taskText, description, dueDate) => {
    axios.post(`${BACKEND_URL}/insert_task`, 
      {
        username,
        task: taskText, 
        description: description, 
        duedate: dueDate
      })
      .then(response => {
        setTasks([...tasks, response.data]);
      })
      .catch(error => console.error('Error adding task:', error));
  };

  const toggleTask = (taskId) => {
    axios.put(`${BACKEND_URL}/update_task`, 
      { 
        username,
        task: taskId,
        completed: true
      })
      .then(response => {
        const updatedTasks = tasks.map(task => task.id === taskId ? response.data : task);
        setTasks(updatedTasks);
      })
      .catch(error => console.error('Error toggling task:', error));
  };

  const deleteTask = (taskId) => {
    axios.delete(`${BACKEND_URL}/delete_task`, 
      { 
        data: { username, task: taskId }
      })
      .then(() => setTasks(tasks.filter(task => task.id !== taskId)))
      .catch(error => console.error('Error deleting task:', error));
  };

  const startEditing = (task) => {
    setIsEditing(true);
    setEditTask(task);
    setNewDescription(task.description);
    setNewDueDate(task.dueDate);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditTask(null);
    setNewDescription('');
    setNewDueDate('');
  };

  const updateTask = () => {
    const updatedTask = {
      description: newDescription,
      duedate: newDueDate,
    };

    axios.put(`${BACKEND_URL}/update_task`, updatedTask)
      .then(response => {
        const updatedTasks = tasks.map(task => 
          task.id === response.data.id ? response.data : task
        );
        setTasks(updatedTasks);
        cancelEditing();
      })
      .catch(error => console.error('Error updating task:', error));
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setToken(null);
    setUsername('guest');
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
        <Route path="/signup" element={<Signup setToken={setToken} setUsername={setUsername} />} />
        <Route path="/login" element={<Login setToken={setToken} setUsername={setUsername}/>} />
        <Route path="/" element={<Navigate to="/todo" />} />
        <Route path="/todo" element={
          <div className="todo-container">
            <h1>To-Do List</h1>
            <TaskInput addTask={addTask} />
            <TaskList 
              tasks={sortedTasks} 
              toggleTask={toggleTask} 
              deleteTask={deleteTask} 
              startEditing={startEditing}
            />
            {isEditing && (
              <div className="edit-popup">
                <h2>Edit Task</h2>
                <input 
                  type="text" 
                  value={newDescription} 
                  onChange={(e) => setNewDescription(e.target.value)} 
                  placeholder="New Description"
                />
                <input 
                  type="date" 
                  value={newDueDate ? newDueDate.slice(0, 10) : ''} 
                  onChange={(e) => setNewDueDate(e.target.value)} 
                  placeholder="New Due Date"
                />
                <button onClick={updateTask}>Save Changes</button>
                <button onClick={cancelEditing}>Cancel</button>
              </div>
            )}
          </div>
        } />
        <Route path="/calendar" element={<CalendarPage tasks={tasks} />} />
      </Routes>
    </Router>
  );
};

export default App;