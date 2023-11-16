interface Props {
	name: string
    size: number
}

export function Glyph({name, size}: Props) {
	return (
		<span
            className='material-symbols-outlined'
            style={{fontSize: size, cursor: 'pointer' , fontVariationSettings: "'FILL' 0, 'wght' 100"}}
        >
            {name}
        </span>
	)
}