import React from 'react';
import '../styles/TaskListItem.css';

function TaskListItem(props) {
  const handleDeleteClick = () => {
    props.onDeleteTask(props.task.id);
  };

  return (
    <li className="task-list-item">
      <div className="task-list-item-header">
        <h3 className="task-list-item-title">Task name: {props.task.taskName}</h3>
        <button className="delete-button" onClick={handleDeleteClick}>Delete</button>
      </div>
      <p className="task-list-item-description">Task Description: {props.task.description}</p>
      <div className="task-list-item-footer">
        <p className="task-list-item-date">Date of creation: {props.task.dateOfCreation}</p>
        <p className="task-list-item-account">Account ID: {props.task.accountId}</p>
      </div>
    </li>
  );
}

export default TaskListItem;
