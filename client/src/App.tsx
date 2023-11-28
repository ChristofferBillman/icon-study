import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './App.css'

import { ToastContextProvider } from './contexts/ToastContext'
import { DataCollectionContextProvider } from './contexts/DataCollectionContext'
import Analysis from './pages/Analysis'

function App() {

	return (
		<ToastContextProvider>
			<DataCollectionContextProvider>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<Analysis />}/>
					</Routes>
				</BrowserRouter>
			</DataCollectionContextProvider>
		</ToastContextProvider>
	)
}

export default App
