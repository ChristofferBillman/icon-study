import { useState, useContext, createContext } from 'react'
import BasicInfo, { initialBasicInfo } from '../types/BasicInfo'
import TestResult from '../types/TestResult'

// Create context
// eslint-disable-next-line 
// This stupid shit only to make tsc happy.
const dataCollectionContextProvider = createContext({
	result: [{
		iconWeight: 0,
		recognitionTimes: [0],
		errors: [{iconName: 'no', numberOfErrors: 0}]
	}],
	basicInfo: initialBasicInfo,
	email: 'not_provided'
})

// eslint-disable-next-line 
const dataCollectionContextSetter = createContext({setResult: (_newState: any) => {}, setBasicInfo: (_newState: any) => {}, setEmail: (_newState: any) => {}})

interface Props {
	children: JSX.Element[] | JSX.Element
}
// Setup and export provider
export function DataCollectionContextProvider({ children }: Props): JSX.Element {

	const [result, setResult] = useState<TestResult[]>([])
	const [basicInfo, setBasicInfo] = useState<BasicInfo>(initialBasicInfo)
    const [email, setEmail] = useState('not_provided')

	return (
		<dataCollectionContextProvider.Provider value={{result, basicInfo, email}}>
            <dataCollectionContextSetter.Provider value={{setResult, setBasicInfo, setEmail}}>
                {children}
            </dataCollectionContextSetter.Provider>
		</dataCollectionContextProvider.Provider>
	)
}

// Export custom hook for using this context.
export function useDataCollectionContext() {
	return useContext(dataCollectionContextProvider)
}

export function useDataCollectionSetter() {
	return useContext(dataCollectionContextSetter)
}

