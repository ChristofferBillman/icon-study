interface Props {
	name: string
    size: number
    weight?: number
    color?: string
}

export function Glyph({name, size, weight, color = 'black'}: Props) {
	return (
		<span
            className='material-symbols-outlined'
            style={{
                color: color,
                fontSize: size,
                cursor: 'pointer',
                userSelect: 'none',
                fontVariationSettings: `'FILL' 0, 'wght' ${weight == undefined ? '100' : weight}`
            }}
        >
            {name}
        </span>
	)
}