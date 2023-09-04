import express from "express";

const PORT = process.env.TIMETWEAKER_PORT == undefined ? 30000 : process.env.TIMETWEAKER_PORT
const app = express()

app.get("/", (req, res) => {
    res.send("Hello World!")
})
app.listen(PORT, () => {
    console.log("Started at " + PORT + "!")
})