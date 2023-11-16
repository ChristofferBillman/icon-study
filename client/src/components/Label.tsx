interface Props {
	children: React.ReactNode
    text: string
}

export function Label({text, children}: Props) {
	return (
		<label style={{display: 'flex', flexDirection: 'column'}}>
            {text}
            {children}
        </label>
	)
}

export default Label
