import TaskListItem from './TaskListItem';

function TaskList(props) {
  const { tasks, onDeleteTask } = props;

  return (
    <ul>
      {tasks.map((task) => (
        <TaskListItem key={task.id} task={task} onDeleteTask={onDeleteTask} />
      ))}
    </ul>
  );
}

export default TaskList;
