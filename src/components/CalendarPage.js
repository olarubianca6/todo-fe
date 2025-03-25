import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarPage = ({ tasks }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const tasksForDate = tasks.filter(task =>
    task.dueDate ? new Date(task.dueDate).toDateString() === selectedDate.toDateString() : false
  );

  const formattedDate = selectedDate.toLocaleDateString();


  return (
    <div className="calendar-container">
      <h1>Your Calendar</h1>

      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        locale="en-US"
        className="calendar-style"
      />

      <div className="tasks-for-date">
        <h2>Tasks for {formattedDate}</h2>
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          {tasksForDate.length > 0 ? tasksForDate.map(task => (
            <li key={task.id} className={task.completed ? "completed" : ""} >
              {task.text}
            </li>
          )) : <p>No tasks for this date.</p>}
        </ul>
      </div>
    </div>
  );
};

export default CalendarPage;