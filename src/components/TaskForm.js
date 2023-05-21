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

  const handleCancel = () => {
    props.onCancel();
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
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4} // Adjust the number of rows as desired
      />
      <label htmlFor="creationDate">Due Date:</label>
      <input
        type="date"
        id="creationDate"
        value={creationDate || props.defaultDueDate}
        onChange={(e) => setCreationDate(e.target.value)}
      />
      <button type="submit">Add Task</button>
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
}

export default TaskForm;
