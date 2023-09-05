import { Db } from "mongodb";
import {Express, Request, Response} from "express";
import bcrypt from "bcrypt";
import response, { StatusCode } from "../utils/response.js";
import { isEmailAddress, isFullname, isPassword, isUsername } from "../security/CheckUserInput.js";
import { DbUser } from "../utils/types/DbUser.js";
export default function Registration(app: Express, db: Db) // , db: Db
{
    const users = db.collection<DbUser>("users")
    /*
        username
        fullName
        emailAddress
        password
    */
    app.post("/api/register", (req, res) => {
        const body = req.body
        

        // Check if varables are defined
        if (typeof body.username !== "string")
        {
            return response(res, {statusCode: StatusCode.BadRequest})

        }
        if (typeof body.fullname !== "string")
        {
            return response(res, {statusCode: StatusCode.BadRequest})

        }
        if (typeof body.emailAddress !== "string")
        {
            return response(res, {statusCode: StatusCode.BadRequest})

        }        
        if (typeof body.password !== "string")
        {
            return response(res, {statusCode: StatusCode.BadRequest})
        }

        // Check if variables are valid
        const emailRes = isEmailAddress(body.emailAddress)
        if (emailRes !== "")
        {
            return response(res, {statusCode: StatusCode.BadRequest, message: emailRes})
        }

        const usernameRes = isUsername(body.username)
        if (usernameRes !== "")
        {
            return response(res, {statusCode: StatusCode.BadRequest, message: usernameRes})
        }

        const passwordRes = isPassword(body.password)
        if (usernameRes !== "")
        {
            return response(res, {statusCode: StatusCode.BadRequest, message: passwordRes})
        }

        const fullnameRes = isFullname(body.fullname)
        if (fullnameRes !== "")
        {
            return response(res, {statusCode: StatusCode.BadRequest, message: fullnameRes})
        }

        // WIP: check whitch is the same username or emailAddress etc.

        users.findOne({username: body.username, emailAddress: body.emailAddress, password: body.password}).then(result => {
            if (result !== null)
            {
                return response(res, {statusCode: StatusCode.BadRequest, message: "User already exists."})
            }
            bcrypt.hash(body.password, 10, (err, hash) => {
                if (err) throw err
                users.insertOne({
                    username: body.username,
                    emailAddress: body.emailAddress,
                    fullName: body.fullName,
                    password: body.password,
                    registrationDate: new Date(),
                    isActive: true,
                    hasVerified: false,
                    has2FA: false,
                    lastSeen: null
                })
                response(res, {statusCode: StatusCode.OK})
    
            })
        })




        
    })
}

