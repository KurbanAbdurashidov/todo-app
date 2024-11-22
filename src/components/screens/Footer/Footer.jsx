import PropTypes from 'prop-types'
import TasksFilter from '../../ui/TasksFilter/TasksFilter'
import styles from './Footer.module.scss'

export default function Footer({ tasks, setTasks, filter, setFilter }) {
	return (
		<footer className={styles.footer}>
			<span className={styles.todo_count}>
				{tasks.length ? `${tasks.length} items left` : 'No items'}
			</span>
			<TasksFilter
				tasks={tasks}
				setTasks={setTasks}
				filter={filter}
				setFilter={setFilter}
			/>
			<button
				className={styles.clear_completed}
				onClick={() => setTasks(tasks.filter(task => !task.isCompleted))}
			>
				Clear completed
			</button>
		</footer>
	)
}

Footer.propTypes = {
	tasks: PropTypes.array.isRequired,
	setTasks: PropTypes.func.isRequired,
	filter: PropTypes.string.isRequired,
	setFilter: PropTypes.func.isRequired
}
