import {Express, Request, Response} from "express";
import Logger from "../utils/logger.js";
const logger = new Logger("Express")
export default function RequestLogging(app: Express)
{
    app.use((req, res, next) => {
        logger.info(req.method + ": " + req.url + " From Ip: " + req.ip)
        next()
    })
    
}