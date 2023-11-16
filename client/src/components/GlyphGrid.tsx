interface Props {
	glyphs: JSX.Element[]
    cols: number
    rows: number
}

export function GlyphGrid({glyphs, rows, cols}: Props) {
	return (
		<div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            height: '100%',
            width: '100%',
        }}
        >
            {glyphs.map(glyph => (
                <div className='flex items-center justify-center '>
                    {glyph}
                </div>
                ))}
        </div>
	)
}