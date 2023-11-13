import {Express, Request, Response} from "express";
export default async function Logout(app: Express) // , db: Db
{
    app.get("/api/logout", (req, res) => {
        req.session.user.isLoggedIn = false
        req.session.save()
        res.send(200)
    })
}