import GetDatabaseConnection from './Database'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import express, { Request, Response, Application } from 'express'
import BaseAPI from './api/BaseAPI'

GetDatabaseConnection()

const app: Application = express()
const port = process.env.PORT || 3000
const BASEURL = '/api'

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// Kolla upp detta
app.use(cors({
    origin: [
        'http://study.christofferbillman.se',
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000"
    ]
}))

app.listen(port, () => console.log(`Icon study server is running on port ${port}`))

app.get(BASEURL + '/test', (req: Request, res: Response) => res.send('Hello: ' + req.query.name))

app.use(cookieParser())

BaseAPI(app, BASEURL + '/page')

export default app

