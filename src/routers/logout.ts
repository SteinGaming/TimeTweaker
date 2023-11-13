import {Express, Request, Response} from "express";
export default function Logout(app: Express) // , db: Db
{
    app.get("/api/logout", (req, res) => {
        if (req.session.user?.isLoggedIn)
        {
            req.session.user.isLoggedIn = false
            req.session.save()
        }
        res.send(200)
    })
}