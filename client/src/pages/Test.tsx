import { useNavigate } from 'react-router-dom'
import { GlyphGrid } from "../components/GlyphGrid"
import { Glyph } from "../components/Glyph"

const glyphs = [
    <Glyph name='star' size={64}/>, <Glyph name='done' size={64}/>, <Glyph name='close' size={64}/>,
    <Glyph name='star' size={64}/>, <Glyph name='done' size={64}/>, <Glyph name='close' size={64}/>,
    <Glyph name='star' size={64}/>, <Glyph name='done' size={64}/>, <Glyph name='close' size={64}/>
]
function Test() {

  const navigate = useNavigate()

  return (
    <div style={{
        width: '100vw',
        height: '100vh',
    }}>
        <GlyphGrid glyphs={glyphs} cols={3} rows={3}/>
    </div>
  )
}

export default Test
