import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRouter from './routes/userroutes.js'
const app = express()

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true
    })
)
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static('public')) // image can be stored in public
app.use(cookieParser())
// install cookieparser also
// Uploading files use multer
// routes
import healthcheckRouter from './routes/healthcheckroutes.js'
import { errorHandle } from './middlewares/errormiddleware.js'
// create routes
app.use('/api/v1/healthcheck', healthcheckRouter)
app.use('/api/v1/users', userRouter)
app.use(errorHandle)
export { app }

// connect with database using mongoose
//ytuserss