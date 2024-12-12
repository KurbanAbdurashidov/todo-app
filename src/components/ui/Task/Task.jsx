import cn from 'classnames'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

export default function Task({ todo, taskValue, tasks, setTasks, deleteTask }) {
	const [timeLeft, setTimeLeft] = useState(todo.timeSpent)
	const [isTimerRunning, setIsTimerRunning] = useState(todo.isTimerRunning)

	useEffect(() => {
		let timer
		if (isTimerRunning) {
			timer = setInterval(() => {
				setTimeLeft(prevTime => {
					if (prevTime <= 0) {
						clearInterval(timer)
						return 0
					}
					return prevTime - 1
				})
			}, 1000)
		} else {
			clearInterval(timer)
		}

		return () => clearInterval(timer)
	}, [isTimerRunning])

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

	const handleStartTimer = () => setIsTimerRunning(true)
	const handlePauseTimer = () => setIsTimerRunning(false)

	const formatTime = time => {
		const minutes = Math.floor(time / 60)
		const seconds = time % 60
		return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
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
					<span className='title'>{taskValue}</span>
					<span className='description'>
						<button
							className='icon icon-play'
							onClick={handleStartTimer}
							disabled={isTimerRunning}
						></button>
						<button
							className='icon icon-pause'
							onClick={handlePauseTimer}
							disabled={!isTimerRunning}
						></button>
						{formatTime(timeLeft)}
					</span>
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
