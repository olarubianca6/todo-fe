import React from 'react';
import { Link } from 'react-router-dom';

const TaskList = ({ tasks, toggleTask, deleteTask}) => {
  return (
    <div className="task-container">
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input 
              type="checkbox" 
              checked={task.completed} 
              onChange={() => toggleTask(task.id)} 
            />
            <span className={task.completed ? "completed" : ""}>{task.text}</span>
            {task.dueDate && (
              <span className="due-date">
                📅 Due: {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;