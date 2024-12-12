import PropTypes from 'prop-types'
import styles from './NewTaskForm.module.scss'

export default function NewTaskForm({
	taskValue,
	setTaskValue,
	setTasks,
	minutes,
	seconds,
	setMinutes,
	setSeconds
}) {
	const createTask = () => {
		const totalSeconds =
			(parseInt(minutes) || 0) * 60 + (parseInt(seconds) || 0)

		taskValue.trim() === ''
			? null
			: setTasks(prev => [
					{
						id: Date.now(),
						value: taskValue.trim(),
						createdAt: new Date(),
						isCompleted: false,
						isActive: true,
						timeSpent: totalSeconds,
						isTimerRunning: true
					},
					...prev
				])
		setTaskValue('')
		setMinutes('')
		setSeconds('')
	}

	const handleTimeChange = setter => event => {
		const value = event.target.value
		if (/^\d*$/.test(value)) setter(value)
	}

	return (
		<form
			className={styles.new_todo_form}
			onSubmit={event => {
				event.preventDefault()
				createTask()
			}}
		>
			<input
				className={styles.new_todo}
				placeholder='What needs to be done?'
				value={taskValue}
				onChange={event => setTaskValue(event.target.value)}
				autoFocus
			/>
			<input
				className={styles.new_todo_form__timer}
				placeholder='Min'
				type='number'
				value={minutes}
				onChange={handleTimeChange(setMinutes)}
			/>
			<input
				className={styles.new_todo_form__timer}
				placeholder='Sec'
				type='number'
				value={seconds}
				onChange={handleTimeChange(setSeconds)}
			/>
			<button
				type='submit'
				style={{ display: 'none' }}
			></button>
		</form>
	)
}

NewTaskForm.propTypes = {
	taskValue: PropTypes.string.isRequired,
	setTaskValue: PropTypes.func.isRequired,
	setTasks: PropTypes.func.isRequired,
	minutes: PropTypes.string.isRequired,
	seconds: PropTypes.string.isRequired,
	setMinutes: PropTypes.func.isRequired,
	setSeconds: PropTypes.func.isRequired
}
