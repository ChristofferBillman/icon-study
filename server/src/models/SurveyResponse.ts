import mongoose, { Schema, Document } from 'mongoose'

export interface TestResult {
    measurements: Map<string, number>
}

export interface ISurveryResponse extends Document {
    screenResolution: {h: 0, w: 0},
    age: number
    sex: string
    testResult: TestResult
}

const surveryResponseSchema: Schema<ISurveryResponse> = new Schema({
    screenResolution: { type: Object, required: true },
    age: { type: Number, required: true },
    sex: { type: String, required: true },
    testResult: [{ type: Object, required: true }]
});

export default mongoose.model<ISurveryResponse>('SurveyResponse', surveryResponseSchema)