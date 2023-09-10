
import dotenv from "dotenv";
import colors from "colors"
dotenv.config()
let env = process.env

export default class Logger {
    private name:string
    constructor(name: string) {
        this.name = name;
    }
    
    
    public log(level:string, colorToUse: any, message?: any, ...optionalParams: any[]) {
        console.log(colorToUse(`[${this.name}] ${level} ->`), message, ...optionalParams);
    }

    public info(message?: any, ...optionalParams: any[]) {
        this.log("INFO", colors.blue , message, ...optionalParams)
    }

    public warn(message?: any, ...optionalParams: any[]) {
        this.log("WARN", colors.yellow , message, ...optionalParams)
    }

    public error(message?: any, ...optionalParams: any[]) {
        this.log("ERROR", colors.red , message, ...optionalParams)
    }

    public debug(message?: any, ...optionalParams: any[]) {
        this.log("DEBUG", colors.yellow, message, ...optionalParams)
    }
}