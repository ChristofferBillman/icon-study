import { Application } from 'express'

export default function BaseAPI(app: Application, BASEURL: string) {

    // GET
    app.get(BASEURL + '/',  async (req, res) => {
        res.status(200).send('OK')
    })
}