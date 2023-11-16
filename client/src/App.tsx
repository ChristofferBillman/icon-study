import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './App.css'
import Landing from './pages/Landing'
import BasicInfoPage from './pages/BasicInfoPage'
import { ToastContextProvider } from './contexts/ToastContext'
import BasicInfo, { initialBasicInfo } from './types/BasicInfo'
import { useState } from 'react'
import PerformanceTest from './pages/PerfomanceTest'
import Onboarding from './pages/Onboarding'
import Test from './pages/Test'

function App() {

	const [basicInfo, setBasicInfo] = useState<BasicInfo>(initialBasicInfo)
	const [email, setEmail] = useState('')

	return (
		<ToastContextProvider>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Landing />} />
					<Route path='/performanceTest' element={<PerformanceTest />} />
					<Route path='/onboarding' element={<Onboarding />} />
					<Route path='/test' element={<Test />} />
					<Route path='/collectBasicInfo' element={
						<BasicInfoPage
							basicInfo={basicInfo}
							setBasicInfo={setBasicInfo}
							email={email}
							setEmail={setEmail}
						/>}
					/>
				</Routes>
			</BrowserRouter>
		</ToastContextProvider>
		)
}

export default App
