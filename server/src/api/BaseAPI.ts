import { Application } from 'express'
import SurveyResponse, { ISurveryResponse } from '../models/SurveyResponse'
import Email, { IEmailNotify } from '../models/Email'

export default function BaseAPI(app: Application, BASEURL: string) {

    // GET
    app.get(BASEURL + '/',  async (req, res) => {
        res.status(200).send('OK')
    })

    app.post(BASEURL + '/email',  async (req, res) => {
        try {
            const { email } = req.body

            const savedEmail: IEmailNotify = new Email({email})

            await savedEmail.save()
            
            res.status(201).send('Created')
        } catch (error) {
            console.log(error)
            res.status(500).send('An error occurred')
        }
    })

    app.post(BASEURL + '/submitResults',  async (req, res) => {
        try {
            const responsedata = req.body

            console.log(req)

            const surveryResponse: ISurveryResponse = new SurveyResponse({
                ...responsedata
            })

            await surveryResponse.save()

            res.status(201).send('Created')
        } catch (error) {
            console.log(error)
            res.status(500).send('An error occurred')
        }
    })
}