import { Response } from "express";
export enum StatusCode 
{
    OK = 202,
    ServerError = 500,
    BadRequest = 400,
}

interface Request 
{
    statusCode: StatusCode
    message?: string,
    result?: string
}



export default function response(res: Response, {statusCode, message, result}: Request)
{
    res.status(statusCode).json({statusCode: statusCode, message: message, result: result })
}