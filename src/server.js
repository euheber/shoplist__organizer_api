import express from 'express'
import { json } from "express"
import routes from "./routes/routes.js"

const app = express()
const port = 3000

app.use(json())
app.use("/api/v1", routes)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))