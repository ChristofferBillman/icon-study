export default interface TestResult {
    iconWeight: number
    recognitionTimes: number[]
    errors: TestResultError[]
}

export interface TestResultError {
    iconName: string
    numberOfErrors: number
}