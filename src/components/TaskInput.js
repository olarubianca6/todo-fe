import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 

const TaskInput = ({ addTask }) => {
  const [taskText, setTaskText] = useState("");
  const [dueDate, setDueDate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText) {
      addTask(taskText, dueDate);
      setTaskText("");
      setDueDate(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-input">
      <input
        type="text"
        placeholder="Add a new task"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
      />
      <DatePicker
        selected={dueDate}
        onChange={(date) => setDueDate(date)}
        customInput={
          <button type="button" className="date-picker-btn">
            {dueDate ? dueDate.toDateString() : "Select Due Date"}
          </button>
        }
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskInput;