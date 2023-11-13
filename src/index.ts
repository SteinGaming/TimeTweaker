import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import Registration from "./routers/registration.js";
import { getMongoDB } from "./utils/databases.js";
import Authentication from "./routers/authentication.js";
import ConfigureSession from "./startup/ConfigureSession.js";
import Logout from "./routers/logout.js";


dotenv.config()

const PORT = process.env.PORT || 80



const app = express()

// Security
app.disable("x-powered-by");


app.use(express.json())
app.use(cookieParser())
ConfigureSession(app)
async function main()
{
    const db = await getMongoDB()
    Registration(app, db)
    Authentication(app, db)
    Logout(app)
    app.listen(PORT, () => {
        console.log(`TimeTweaker-Backend started on port: ${PORT} (http://127.0.0.1:${PORT}).`)
    })
}

main()