import React from 'react';
import TaskListItem from './TaskListItem';

function TaskList(props) {
  return (
    <ul>
      {props.tasks.map((task) => (
        <TaskListItem key={task.id} task={task} onDeleteTask={props.onDeleteTask} />
      ))}
    </ul>
  );
}

export default TaskList;
