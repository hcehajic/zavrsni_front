import React, { useState } from 'react';
import '../styles/TaskListItem.css';

const API_BASE_URL = 'http://localhost:8080';

function TaskListItem(props) {
  const { task, onDeleteTask, subTasks } = props;
  const [newSubTask, setNewSubTask] = useState('');

  const handleDeleteClick = () => {
    onDeleteTask(task.id);
  };

  const handleAddSubTask = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/task/sub`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: newSubTask, accountId: task.accountId, taskId: task.id }),
      });
  
      if (response.ok) {
        setNewSubTask('');
        // Update the subtasks in the parent component
        props.onShowSubs(task.id);
      } else {
        console.error('Failed to add subtask:', response.status);
      }
    } catch (error) {
      console.error('Error adding subtask:', error);
    }
  };  

  const handleDeleteSubTask = async (subTaskId) => {
    try {
      await fetch(`${API_BASE_URL}/api/v1/task/sub/${subTaskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Update the subtasks in the parent component
      props.onShowSubs(task.id);
    } catch (error) {
      console.error('Error deleting subtask:', error);
    }
  };

  return (
    <li className="task-list-item">
      <div className="task-list-item-header">
        <h3 className="task-list-item-title">Task name: {task.taskName}</h3>
        <button className="delete-button" onClick={handleDeleteClick}>
          Delete Task
        </button>
      </div>
      <p className="task-list-item-description">Task Description: {task.description}</p>
      <div className="task-list-item-footer">
        <p className="task-list-item-date">Date of creation: {task.dateOfCreation}</p>
        <p className="task-list-item-account">Account ID: {task.accountId}</p>
      </div>

      <div className="sub-tasks-container">
        <h4>Subtasks:</h4>
        {subTasks.map((subTask) => (
          <div key={subTask.id} className="sub-task-item">
            <p>{subTask.description}</p>
            <button className="delete-subtask-button" onClick={() => handleDeleteSubTask(subTask.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      <form onSubmit={handleAddSubTask}>
        <input
          type="text"
          name="subTaskName"
          placeholder="Add subtask"
          value={newSubTask}
          onChange={(e) => setNewSubTask(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </li>
  );
}

export default TaskListItem;
