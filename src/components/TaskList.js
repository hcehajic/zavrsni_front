import React, { useEffect, useState } from 'react';
import TaskListItem from './TaskListItem';

const API_BASE_URL = 'http://localhost:8080';

function TaskList(props) {
  const { tasks, onDeleteTask, onShowSubs } = props;
  const [subTasks, setSubTasks] = useState({});

  useEffect(() => {
    const fetchSubTasks = async () => {
      try {
        const promises = tasks.map((task) =>
          fetch(`${API_BASE_URL}/api/v1/task/sub/${task.id}`, { mode: 'cors' }).then((response) => response.json())
        );
        const subTasksData = await Promise.all(promises);
        const subTasksMap = subTasksData.reduce((acc, subTasks, index) => {
          const taskId = tasks[index].id;
          return { ...acc, [taskId]: subTasks };
        }, {});
        setSubTasks(subTasksMap);
      } catch (error) {
        console.error('Failed to fetch subtasks:', error);
      }
    };
  
    fetchSubTasks(); // Call the fetchSubTasks function
  }, [tasks]);  

  return (
    <ul>
      {tasks.map((task) => (
        <TaskListItem
          key={task.id}
          task={task}
          subTasks={subTasks[task.id] || []}
          onShowSubs={onShowSubs}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </ul>
  );
}

export default TaskList;
