import React, { useState } from 'react';
import '../styles/TaskForm.css';

function TaskForm(props) {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [creationDate, setCreationDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim() === '') {
      return;
    }
    props.onAddTask(taskName, description, creationDate, props.accountId);
    setTaskName('');
    setDescription('');
    setCreationDate('');
  };  

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label htmlFor="taskName">Task Name:</label>
      <input
        type="text"
        id="taskName"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <label htmlFor="description">Description:</label>
      <input
        type="text"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label htmlFor="creationDate">Due Date:</label>
      <input
        type="date"
        id="creationDate"
        value={creationDate}
        onChange={(e) => setCreationDate(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
