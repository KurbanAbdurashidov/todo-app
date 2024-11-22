import cn from 'classnames'
import PropTypes from 'prop-types'

export default function TasksFilter({ filter, setFilter }) {
	return (
		<ul className='filters'>
			<li>
				<button
					className={cn({
						selected: filter === 'all'
					})}
					onClick={() => setFilter('all')}
				>
					All
				</button>
			</li>
			<li>
				<button
					className={cn({
						selected: filter === 'active'
					})}
					onClick={() => setFilter('active')}
				>
					Active
				</button>
			</li>
			<li>
				<button
					className={cn({
						selected: filter === 'completed'
					})}
					onClick={() => setFilter('completed')}
				>
					Completed
				</button>
			</li>
		</ul>
	)
}

TasksFilter.propTypes = {
	filter: PropTypes.string.isRequired,
	setFilter: PropTypes.func.isRequired
}
