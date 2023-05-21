import React, { useState } from 'react';
import '../styles/Calendar.css';
import TaskForm from './TaskForm';

function Calendar({ tasks }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);

  const openTaskForm = (date) => {
    setSelectedDate(date);
    setShowTaskForm(true);
  };
  
  const closeTaskForm = () => {
    setShowTaskForm(false);
  };

  // Create a map to store tasks by date
  const tasksByDate = new Map();

  // Group tasks by date
  tasks.forEach((task) => {
    const date = task.dateOfCreation.substring(0, 10); // Extract the date part
    const taskList = tasksByDate.get(date) || [];
    taskList.push(task.taskName);
    tasksByDate.set(date, taskList);
  });

  // Create a new Date object for the current month
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  // Get the number of days in the current month
  const numberOfDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Create an array of dates for the current month
  const datesOfMonth = Array.from({ length: numberOfDaysInMonth }, (_, index) => {
    const date = new Date(currentYear, currentMonth, index + 1);
    return date.toISOString().substring(0, 10);
  });

  return (
    <div className="calendar">
      <div className="calendar-header">
        <span className="calendar-month">{monthName}</span>
        <span className="calendar-year">{currentYear}</span>
      </div>
      <div className="calendar-weekdays">
        <div className="weekday">Sun</div>
        <div className="weekday">Mon</div>
        <div className="weekday">Tue</div>
        <div className="weekday">Wed</div>
        <div className="weekday">Thu</div>
        <div className="weekday">Fri</div>
        <div className="weekday">Sat</div>
      </div>
      <div className="calendar-grid">
        <div className="calendar-dates">
          {datesOfMonth.map((date) => (
            <div
              key={date}
              className={`calendar-date ${tasksByDate.has(date) ? 'has-tasks' : ''}`}
              onClick={() => openTaskForm(date)}
            >
              <div className="date">{date.slice(-2)}</div>
              <ul className="task-list">
                {tasksByDate.get(date)?.map((taskName, index) => (
                  <li key={index}>{taskName}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      {showTaskForm && (
        <TaskForm
          defaultDueDate={selectedDate}
          onCancel={closeTaskForm}
        />
      )}
    </div>
  );
}

export default Calendar;
