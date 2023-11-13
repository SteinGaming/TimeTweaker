import { Db } from "mongodb";
import {Express, Request, Response} from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv"
import response, { StatusCode } from "../utils/response.js";
import { isEmailAddress, isFullname, isPassword, isUsername } from "../security/CheckUserInput.js";
import { DbUser } from "../utils/types/DbUser.js";
import Logger from "../utils/logger.js";

const logger = new Logger("Registration")
dotenv.config()
const PEPPER = process.env.PASSWORD_PEPPER

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
        const fields = [
            "username", "fullname", "emailAddress", "password"
        ]
        for (const field of fields) {
            if (typeof body[field] === 'string') continue
            return response(res, {statusCode: StatusCode.BadRequest, message: `Missing Field: ${field}`})
        }

        // Check if variables are valid
        const list = [
            isEmailAddress(body.emailAddress), isUsername(body.username), isPassword(body.password), isFullname(body.fullname)
        ]

        for (const el of list) {
            if (el !== undefined)
                return response(res, {statusCode: StatusCode.BadRequest, message: el})
        }
        // WIP: check whitch is the same username or emailAddress etc.

        users.findOne({ $or: [{username: body.username}, {emailAddress: body.emailAddress}]}).then(result => {
            if (result !== null)
            {
                return response(res, {statusCode: StatusCode.BadRequest, message: "User already exists!"})
            }
            bcrypt.hash(PEPPER + body.password, 10, (err, hash) => {
                if (err) 
                {
                    return logger.error(err)
                }
                users.insertOne({
                    username: body.username,
                    emailAddress: body.emailAddress,
                    fullName: body.fullName,
                    password: hash,
                    registrationDate: new Date(),
                    isActive: true,
                    hasVerified: false,
                    has2FA: false,
                    lastSeen: null
                })

                logger.info(`Registrated User: ${body.username} (${body.fullname}) successfully!`)

                response(res, {statusCode: StatusCode.OK})
    
            })
        })
    })
}
