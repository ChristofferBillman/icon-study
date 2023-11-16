interface Props {
	text?: string
    onClick?: () => void
}

export function Button({text, onClick}: Props) {
	return (
		<button onClick={onClick}>
            {text}
		</button>
	)
}