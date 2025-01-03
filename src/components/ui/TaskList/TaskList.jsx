import PropTypes from 'prop-types'
import Task from '../Task/Task'

export default function TaskList({ tasks, setTasks, filteredTasks }) {
	const deleteTask = id => {
		setTasks([...tasks].filter(todo => todo.id !== id))
	}

	return (
		<ul className='todo-list'>
			{filteredTasks.map(todo => (
				<Task
					key={todo.id}
					todo={todo}
					taskValue={todo.value}
					tasks={tasks}
					setTasks={setTasks}
					deleteTask={deleteTask}
				/>
			))}
		</ul>
	)
}

TaskList.propTypes = {
	tasks: PropTypes.array.isRequired,
	setTasks: PropTypes.func.isRequired,
	filteredTasks: PropTypes.array.isRequired
}
