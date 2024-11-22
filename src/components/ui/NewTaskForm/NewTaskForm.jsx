import PropTypes from 'prop-types'
import styles from './NewTaskForm.module.scss'

export default function NewTaskForm({ taskValue, setTaskValue, setTasks }) {
	const createTask = () => {
		taskValue.trim() === ''
			? null
			: setTasks(prev => [
					{
						id: Date.now(),
						value: taskValue.trim(),
						createdAt: new Date(),
						isCompleted: false,
						isActive: true
					},
					...prev
				])
		setTaskValue('')
	}

	return (
		<input
			className={styles.new_todo}
			placeholder='What needs to be done?'
			value={taskValue}
			onChange={event => setTaskValue(event.target.value)}
			onKeyUp={event => event.key === 'Enter' && createTask()}
			autoFocus
		/>
	)
}

NewTaskForm.propTypes = {
	taskValue: PropTypes.string.isRequired,
	setTaskValue: PropTypes.func.isRequired,
	setTasks: PropTypes.func.isRequired
}
