import { useState, useContext, createContext } from 'react'
import Toast from '../components/Toast'

export type ToastType = 'success' | 'error' | 'warn' | 'info'
// Create context
// eslint-disable-next-line 
const toastContext = createContext((_message: string, _type: ToastType) => { })

interface Props {
	children: JSX.Element[] | JSX.Element
}
// Setup and export provider
export function ToastContextProvider({ children }: Props): JSX.Element {

	const [opacity, setOpacity] = useState(0)
	const [message, setMessage] = useState('')
	const [type, setType] = useState<ToastType>('info')
	const [isMounted, setIsMounted] = useState(false)

	const setToast = (message: string, type: ToastType) => {
		setIsMounted(true)
		setType(type)
		setMessage(message)

		setTimeout(() => {
			setOpacity(1)
		},200)

		setTimeout(() => setOpacity(0), 4000)
		setTimeout(() => setIsMounted(false), 4200)
	}

	return (
		<toastContext.Provider value={setToast}>
			{isMounted && 
				<Toast
					message={message}
					type={type}
					opacity={opacity}
				/>
			}
			{children}
		</toastContext.Provider>
	)
}

// Export custom hook for using this context.
export default function useToast() {
	return useContext(toastContext)
}

