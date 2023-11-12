import dotenv from "dotenv"
import { Db } from "mongodb";
import bcrypt from "bcrypt";
import {Express, Request, Response} from "express";
import response, { StatusCode } from "../utils/response.js";
import { isEmailAddress, isUsername } from "../security/CheckUserInput.js";
import { DbUser } from "../utils/types/DbUser.js";

const INVALID_LOGIN_INFORMATION_MESSAGE = "Invalid username/E-Mail-Address or password"

dotenv.config()

const PEPPER = process.env.PASSWORD_PEPPER

/*
    Example Request body:
    {
        "usernameOrMailAddress": "example@example.com",
        "password": "password"
    }
*/
export default function Authentication(app: Express, db: Db)
{
    const users = db.collection<DbUser>("users")

    // returns if its a username or mail address and if its valid or not
    function checkIfIsUsernameOrMailAddress(usernameOrMailAddress: string)
    {
        const response = {
            valid: true,
            username: false
        }

        if ( isEmailAddress(usernameOrMailAddress) === "") return response

        if ( isUsername(usernameOrMailAddress) === "")
        {
            response.username = true
            return response
        }

        response.valid = false
        return response
    }

     app.post("/api/authenticate", async (req, res) => {

        function sendInvailidLoginInformation()
        {
            return response(res, { statusCode: StatusCode.BadRequest, message: INVALID_LOGIN_INFORMATION_MESSAGE})
        }

        const body = req.body

        // Checks if the user is already logged in
        if (typeof req.session.user === "boolean" && req.session.user )
        {
            return response(res, { statusCode: StatusCode.BadRequest, message: "You are already logged in!"})
        }
  
        if ((typeof body.loginName !== "string") || (typeof body.password !== "string")) 
        {
            console.debug("[Autentication] Error: loginName or Password must be a string")
            return sendInvailidLoginInformation()
        }

        const loginName = body.loginName
        const password = body.password

        const loginNameResult = checkIfIsUsernameOrMailAddress(loginName)

        if (!loginNameResult.valid)
        {
            console.debug("[Autentication] Error: Login Information is not valid!")
            return sendInvailidLoginInformation()
        }

        let dbQuery = {}

        if (loginNameResult.username)
        {
            dbQuery = { username: { $eq: loginName}}
        } else {
            dbQuery = { emailAddress: { $eq: loginName}}
        }

        users.findOne(dbQuery).then(user => {
            if (user === null) return sendInvailidLoginInformation()



            bcrypt.compare(PEPPER + password, user.password, async (err, isSame ) => {
                if (err) {
                    console.debug(`[Autentication] Error: Somebody tried to login to the User acc ${user.username} with wrong password!`)
                    return sendInvailidLoginInformation()
                    throw err
                }
                if (!isSame) return sendInvailidLoginInformation()

                if ( !user.isActive )
                {
                    return response(res, {statusCode: StatusCode.Unauthorized, message: "Your Account has been deactivated. Please contact the Support for more information."})
                }

                if ( !user.hasVerified )
                {
                    return response(res, {statusCode: StatusCode.Unauthorized, message: "Your Account has not been Verified yet. Please view in your Mailbox to verify your account."})
                }

                console.debug(`[Autentication] Success! User: ${user.username} is authenticated!`)
                req.session.user = {
                    isLoggedIn: true,
                    userId: user._id.toString()
                }

                await req.session.save()
                return response(res, {statusCode: StatusCode.Accepted})
            })
        })
        
    })
}