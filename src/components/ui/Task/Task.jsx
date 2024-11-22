import cn from 'classnames'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

export default function Task({ todo, taskValue, tasks, setTasks, deleteTask }) {
	const startEditing = id => {
		setTasks(
			[...tasks].map(task =>
				task.id === id ? { ...task, isEditing: true } : task
			)
		)
	}
	const saveEditing = (id, newValue) => {
		setTasks(
			[...tasks].map(task =>
				task.id === id
					? { ...task, value: newValue, isEditing: false }
					: task
			)
		)
	}
	const toggleCompletion = id => {
		setTasks(
			tasks.map(task =>
				task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
			)
		)
	}

	return (
		<li
			className={cn({
				editing: todo.isEditing,
				completed: todo.isCompleted
			})}
		>
			<div className='view'>
				<input
					className='toggle'
					type='checkbox'
					readOnly
					onClick={() => toggleCompletion(todo.id)}
					checked={todo.isCompleted}
				/>
				<label>
					<span className='description'>{taskValue}</span>
					<span className='created'>
						{`created ${formatDistanceToNow(new Date(todo.createdAt), {
							addSuffix: true
						})}`}
					</span>
				</label>
				<button
					className='icon icon-edit'
					onClick={() => startEditing(todo.id)}
				></button>
				<button
					className='icon icon-destroy'
					onClick={() => deleteTask(todo.id)}
				></button>
			</div>
			<input
				type='text'
				className='edit'
				defaultValue={taskValue}
				onKeyUp={event =>
					event.key === 'Enter' && saveEditing(todo.id, event.target.value)
				}
				autoFocus
			/>
		</li>
	)
}

Task.propTypes = {
	todo: PropTypes.any.isRequired,
	taskValue: PropTypes.string.isRequired,
	tasks: PropTypes.array.isRequired,
	setTasks: PropTypes.func.isRequired,
	deleteTask: PropTypes.func.isRequired
}
