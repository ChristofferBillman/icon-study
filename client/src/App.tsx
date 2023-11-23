import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './App.css'
import Landing from './pages/Landing'
import BasicInfoPage from './pages/BasicInfoPage'
import { ToastContextProvider } from './contexts/ToastContext'
import PerformanceTest from './pages/PerfomanceTest'
import Onboarding from './pages/Onboarding'
import TestManager from './pages/TestManager'
import Debrief from './pages/Debrief'
import { DataCollectionContextProvider } from './contexts/DataCollectionContext'
import Thanks from './pages/Thanks'

function App() {

	return (
		<ToastContextProvider>
			<DataCollectionContextProvider>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<Landing />} />
						<Route path='/performanceTest' element={<PerformanceTest />} />
						<Route path='/onboarding' element={<Onboarding />} />
						<Route path='/test' element={<TestManager />} />
						<Route path='/debrief' element={<Debrief />} />
						<Route path='/done' element={<Thanks />} />
						<Route path='/collectBasicInfo' element={<BasicInfoPage />}/>
					</Routes>
				</BrowserRouter>
			</DataCollectionContextProvider>
		</ToastContextProvider>
	)
}

export default App
