import CSSstyle from './Toast.module.css'
import { ToastType } from '../../contexts/ToastContext'
import { Cross } from '../../icons/Cross'
import { Check } from '../../icons/Check'
import { Info } from '../../icons/Info'

interface Props {
	message: string
	type: ToastType
	opacity: number
}

export function Toast({ message, type = 'info', opacity }: Props) {
	return (
		<div className={`${getStyle(type)} ${CSSstyle.toast}`} style={{opacity}}>
			{getIcon(type)}
			<p style={{margin: 0}}>{message}</p>
		</div>
	)
}

function getStyle(type: ToastType): string {
	switch(type) {
	case 'info': return CSSstyle.info
	case 'error': return CSSstyle.error
	case 'success': return CSSstyle.success
	case 'warn': return CSSstyle.warn
	}
}

function getIcon(type: ToastType): JSX.Element {
	switch(type) {
	case 'info': return <Info color='var(--primary)'/>
	case 'error': return <Cross color='#ff4242'/>
	case 'success': return <Check color='#2e8a22'/>
	case 'warn': return <Info color='#ffc34c'/>
	}
}