import React, { useState } from 'react';
import '../styles/Calendar.css';

import TaskForm from './TaskForm';

function Calendar({ tasks }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showTaskFormPopup, setShowTaskFormPopup] = useState(false);

  const openTaskForm = (date) => {
    setSelectedDate(date);
    setShowTaskFormPopup(true);
  };
  
  const closeTaskForm = () => {
    setShowTaskFormPopup(false);
  };

  const tasksByDate = new Map();

  tasks.forEach((task) => {
    const date = task.dueDate.substring(0, 10);
    const taskList = tasksByDate.get(date) || [];
    taskList.push(task.taskName);
    tasksByDate.set(date, taskList);
  });

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  const numberOfDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

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
        <div className="weekday">Ned</div>
        <div className="weekday">Pon</div>
        <div className="weekday">Uto</div>
        <div className="weekday">Sri</div>
        <div className="weekday">Čet</div>
        <div className="weekday">Pet</div>
        <div className="weekday">Sub</div>
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
      {showTaskFormPopup && (
      <div className="popup-overlay">
        <div className="popup-content">
          <TaskForm defaultDueDate={selectedDate} onCancel={closeTaskForm} />
        </div>
      </div>
    )}
    </div>
  );
}

export default Calendar;
