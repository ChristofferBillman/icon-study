import { Glyph } from "./Glyph"

interface Props {
	glyphnames: Array<[string, boolean] | [string]>
    onCorrectPress: () => void
    cols: number
    rows: number
}

export function GlyphGrid({glyphnames, onCorrectPress, rows, cols}: Props) {
	return (
		<div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            height: '100%',
            width: '100%',
        }}
        >
            {glyphnames.map((glyphname: [string, boolean] | [string]) => (
                <div
                    className='flex items-center justify-center'
                    onClick={() => {glyphname[1] && onCorrectPress()}}
                >
                    <Glyph name={glyphname[0]} size={64} weight={700}/>
                </div>
                ))}
        </div>
	)
}