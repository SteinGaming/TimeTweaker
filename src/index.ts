import express from "express";
import dotenv from "dotenv"

dotenv.config()

const PORT = process.env.PORT || 80

const app = express()


app.listen(PORT, () => {
    console.log(`TimeTweaker-Backend started on port: ${PORT} (http://127.0.0.1:${PORT}).`)
})