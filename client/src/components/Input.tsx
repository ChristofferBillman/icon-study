import { CSSProperties } from 'react'

interface Props {
    placeholder?: string
    style?: CSSProperties
	value?: string
	setValue: (arg0: React.ChangeEvent<HTMLInputElement>) => void
	name: string
	type?: string
	onFocus?: () => void
	onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void
	min?: number
	max?: number
}

export function Input({placeholder, value, setValue, name, type, style, onFocus, onBlur, min, max}: Props) {
	const additionalStyles = {
		width: type == 'checkbox' ? 'fit-content' : ''
	}

	return (
		<input
			min={min}
			max={max}
			onFocus={onFocus}
			onBlur={onBlur}
			style={{...style, ...additionalStyles}}
			type={type}
			placeholder={placeholder}
			value={value}
			name={name}
			onChange={e => setValue(e)}
		/>
	)
}
