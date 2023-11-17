import { GlyphGrid } from "../components/GlyphGrid"
import { useEffect, useState } from 'react'
import { Prompt } from '../components/Prompt'
import TestResult from "../types/TestResult"

interface Props {
  grids: Array<Array<[string, boolean] | [string]>>
  prompts: Array<string>
  weight: number
  onComplete: (results: TestResult) => void
}

function TestInstance({grids, prompts, weight, onComplete}: Props) {

  const [currentStep, setCurrentStep] = useState(0)
  const [showPrompt, setShowPrompt] = useState(true)

  // First time is a special case, since the prompt is supposed to be shown,
  // but dissapear after 3s.
  useEffect(() => {
    setTimeout(() => setShowPrompt(false), 3000)
  }, [])

  const handleWrongPress = () => {
    // Add this as an error to the test results.
  }

  const handleCorrectPress = () => {
    if(currentStep == grids.length-1) {
      // Pass results to parent via onComplete.
      onComplete({
        iconWeight: weight,
        recognitionTimes: [245,324,340],
        errors: [{iconName: 'test', numberOfErrors: 2}]
      })
      return
    }
    setCurrentStep(currentStep => (currentStep + 1) % 10)
    setShowPrompt(true)
    setTimeout(() => setShowPrompt(false), 1000)
  }

  return (
    <div style={{
        width: '100vw',
        height: '100vh',
    }}
    >
      {showPrompt ? <Prompt text={prompts[currentStep]}/> : undefined}
        <GlyphGrid
          glyphnames={grids[currentStep]}
          onCorrectPress={handleCorrectPress}
          onWrongPress={handleWrongPress}
          cols={5}
          rows={4}
          weight={weight}
        />
    </div>
  )
}

export default TestInstance
