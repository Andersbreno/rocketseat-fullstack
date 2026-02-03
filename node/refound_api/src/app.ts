import express from "express"
import "express-async-errors"
import cors from "cors"


import { routes } from "./routes"
import { errorHandling } from "./middlewares/error-handling"
import { AppError } from "./utils/AppError"
import { z } from "zod"

const app = express()
app.use(cors())
app.use(express.json())

app.use(routes)
app.use(errorHandling)

export { app }