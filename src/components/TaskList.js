import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const TaskList = ({ tasks, toggleTask, deleteTask, startEditing }) => {
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
            <div className="task-content">
              <span className={task.completed ? "completed" : ""}>
                {task.text}
              </span>
              {task.description && (
                <p className={`task-description ${task.completed ? "completed" : ""}`}>
                  {task.description}
                </p>
              )}
            </div>
            {task.dueDate && (
              <div className="due-date">
                📅 Due: {new Date(task.dueDate).toLocaleDateString()}
              </div>
            )}
            <div className="task-actions">
              <button onClick={() => startEditing(task)}>
                <FaEdit /> Edit
              </button>
              <button onClick={() => deleteTask(task.id)}>
                <FaTrash /> Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
