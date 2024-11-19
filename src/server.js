import express from 'express'
import { json } from "express"
import routes from "./routes/routes.js"
import errorHandler from './middleware/errorHandler.js'

const app = express()
const port = 3000

app.use(json())
app.use("/api/v1", routes)
app.use(errorHandler)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))