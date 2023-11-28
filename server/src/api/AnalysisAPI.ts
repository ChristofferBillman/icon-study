import { Application } from 'express'
import SurveyResponse, { ISurveryResponse } from '../models/SurveyResponse'

export default function AnalysisAPI(app: Application, BASEURL: string) {
    app.get(BASEURL + '/all',  async (req, res) => {
        try {
            const surveryresponses = await SurveyResponse.find()
            res.status(200).json(surveryresponses)
        } catch (error) {
            console.log(error)
            res.status(500).send('An error occurred')
        }
    })
}