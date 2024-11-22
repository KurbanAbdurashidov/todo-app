import { useState } from 'react'
import NewTaskForm from '../../ui/NewTaskForm/NewTaskForm'
import TaskList from '../../ui/TaskList/TaskList'
import Footer from '../Footer/Footer'
import styles from './Home.module.scss'

export default function Home() {
	const [taskValue, setTaskValue] = useState('')
	const [tasks, setTasks] = useState([])
	const [filter, setFilter] = useState('all')

	const getFilteredTasks = () => {
		if (filter === 'active') return tasks.filter(task => !task.isCompleted)
		if (filter === 'completed') return tasks.filter(task => task.isCompleted)
		return tasks
	}

	const filteredTasks = getFilteredTasks()

	return (
		<section className={styles.todoapp}>
			<header className={styles.header}>
				<h1 className={styles.header_title}>Todos</h1>
				<NewTaskForm
					taskValue={taskValue}
					setTaskValue={setTaskValue}
					tasks={tasks}
					setTasks={setTasks}
				/>
			</header>
			<section className={styles.main}>
				<TaskList
					taskValue={taskValue}
					setTaskValue={setTaskValue}
					tasks={tasks}
					setTasks={setTasks}
					filteredTasks={filteredTasks}
				/>
			</section>
			<Footer
				tasks={tasks}
				setTasks={setTasks}
				filter={filter}
				setFilter={setFilter}
			/>
		</section>
	)
}
