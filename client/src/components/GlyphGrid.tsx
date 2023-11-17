import { useState } from "react"
import { Glyph } from "./Glyph"

interface Props {
	glyphnames: Array<[string, boolean] | [string]>
    onCorrectPress: () => void
    onWrongPress: () => void
    cols: number
    rows: number
    weight: number
}

export function GlyphGrid({glyphnames, onCorrectPress, onWrongPress, weight, rows, cols}: Props) {

    // This state is only used to change the background color when
    // the participant presses the wrong glyph.
    const [showError, setShowError] = useState(false)
    const onWrongPressInternal = () => {
        setShowError(true)
        onWrongPress()
        setTimeout(() => setShowError(false),300)        
    }

	return (
		<div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            height: '100%',
            width: '100%',
            transitionDuration: '300ms',
            background: showError ? 'rgba(255,0,0,0.5)' : 'none'
        }}
        >
            {glyphnames.map((glyphname: [string, boolean] | [string]) => (
                <div
                    className='flex items-center justify-center'
                    onClick={() => {glyphname[1] ? onCorrectPress() : onWrongPressInternal()}}
                >
                    <Glyph name={glyphname[0]} size={64} weight={weight}/>
                </div>
                ))}
        </div>
	)
}