import { app } from './app.js'
import dotenv from 'dotenv'
import connectDB from './db/index.js'
dotenv.config({
    path: "./.env"
})
const port = process.env.PORT || 8000;
connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        })
    })
    .catch((err) => {
        console.log('Mongodb connection error', err)
    })

// go to atlas platform mongodb
// check network access it is free to use 
// check database access
// go to clusters and connect it use compass tool and 
// copy the connection string and paste it into .env and 
// remove the slace at the end of url.