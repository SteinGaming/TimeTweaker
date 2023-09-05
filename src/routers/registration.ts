import { Db } from "mongodb";
import {Express, Request, Response} from "express";
import response, { StatusCode } from "../utils/response.js";
export default function Registration(app: Express) // , db: Db
{
    /*
        loginName
        FullName
        emailAddress
        password
    */
    app.post("/api/register", (req, res) => {
        const body = req.body
        

        response(res, {statusCode: StatusCode.OK, message: "hallo"})
    })
}