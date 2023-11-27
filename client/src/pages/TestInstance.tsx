import { GlyphGrid } from "../components/GlyphGrid"
import { useEffect, useState } from 'react'
import { Prompt } from '../components/Prompt'
import TestResult, { TestResultError } from "../types/TestResult"

interface Props {
  grids: Array<Array<[string, boolean] | [string]>>
  prompts: Array<string>
  weight: number
  onComplete: (results: TestResult) => void
}

let result: TestResult = {
  iconWeight: 0,
  recognitionTimes: [],
  errors: []
}

// Used for measuring the reaction time.
let timeAtGridShown: number
let timeAtCorrectPress: number

function TestInstance({grids, prompts, weight, onComplete}: Props) {

  const [currentStep, setCurrentStep] = useState(0)
  const [showPrompt, setShowPrompt] = useState(true)

  // First time is a special case, since the prompt is supposed to be shown,
  // but dissapear after 3s.
  useEffect(() => {
    setTimeout(() => {
      setShowPrompt(false)
      timeAtGridShown = performance.now()
    }, 3000)
  }, [])

  const handleWrongPress = () => {
    // Find index of the current icon.
    const index = result.errors.findIndex((err: TestResultError) => err.iconName == prompts[currentStep])
    // If it is -1, there is no entry for the current icon.
    if(index == -1) {
      result.errors.push({iconName: prompts[currentStep], numberOfErrors: 1})
      return
    }
    // Otherwise there is one, increment it.
    result.errors[index].numberOfErrors++
  }

  const handleCorrectPress = () => {
    timeAtCorrectPress = performance.now()

    result.recognitionTimes.push(Math.round(timeAtCorrectPress - timeAtGridShown))
    console.log(result.recognitionTimes)

    // Not strictly neccessary but doing it just to be safe xd.
    timeAtCorrectPress = 0
    timeAtGridShown = 0

    if(currentStep == grids.length-1) {
      result.iconWeight = weight
      // Pass results to parent via onComplete.
      onComplete(result)
      result = {
        iconWeight: 0,
        recognitionTimes: [],
        errors: []
      }
      return
    }
    setCurrentStep(currentStep => (currentStep + 1) % 10)
    setShowPrompt(true)
    setTimeout(() => {
      setShowPrompt(false)
      timeAtGridShown = performance.now()
    }, 3000)
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
