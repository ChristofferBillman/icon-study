import mongoose, { Schema, Document } from 'mongoose'

export interface IEmailNotify extends Document {
    email: string
}

const emailSchema: Schema<IEmailNotify> = new Schema({
    email: { type: String, required: true },
})

export default mongoose.model<IEmailNotify>('SurveyResponse', emailSchema)