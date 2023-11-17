interface Props {
	name: string
    size: number
    weight?: number
}

export function Glyph({name, size, weight}: Props) {
	return (
		<span
            className='material-symbols-outlined'
            style={{
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