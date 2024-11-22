import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Home from './components/screens/Home/Home'

import './assets/styles/global.scss'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Home />
	</StrictMode>
)
