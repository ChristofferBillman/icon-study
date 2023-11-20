import GetDatabaseConnection from './Database'
import BaseAPI from './api/BaseAPI'

import express, { Request, Response, Application } from 'express'
import path from 'path'

GetDatabaseConnection()

const app: Application = express()
const port = process.env.PORT || 3000
const BASEURL = '/api'

app.use(express.static(path.join(__dirname, '..', '..', 'client', 'build')));
app.use(express.static("public"));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(port, () => console.log(`Icon study server is running on port ${port}`))

app.get(BASEURL + '/test', (req: Request, res: Response) => res.send('Hello: ' + req.query.name))

BaseAPI(app, BASEURL)

export default app;