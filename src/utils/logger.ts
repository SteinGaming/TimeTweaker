
import dotenv from "dotenv";
import colors from "colors"
dotenv.config()
let env = process.env

export default class Logger {
    private readonly name: string
    public readonly level: string

    constructor(name: string, level: string = env.LOGGER_LEVEL || "info") {
        this.name = name
        this.level = level

        this.initialize(level)
    }

    private initialize(level: string) {
        const i = {
            INFO: 1,
            WARN: 2,
            ERROR: 3,
            DEBUG: 4,
        }[level.toUpperCase().trim()] || -1

        if (i > 0) this.info = this._info
        if (i > 1) this.warn = this._warn
        if (i > 2) this.error = this._error
        if (i > 3) this.debug = this._debug
    }
    
    public log(level:string, colorToUse: any, message?: any, ...optionalParams: any[]) {
        console.log(colorToUse(`[${this.name}] ${level} ->`), message, ...optionalParams)
    }

    info = function(message?: any, ...optionalParams: any[]) {}
    private _info(message?: any, ...optionalParams: any[]) {
        this.log("INFO", colors.blue , message, ...optionalParams)
    }

    warn = function(message?: any, ...optionalParams: any[]) {}
    private _warn(message?: any, ...optionalParams: any[]) {
        this.log("WARN", colors.yellow , message, ...optionalParams)
    }

    error = function(message?: any, ...optionalParams: any[]) {}
    private _error(message?: any, ...optionalParams: any[]) {
        this.log("ERROR", colors.red , message, ...optionalParams)
    }

    debug = function(message?: any, ...optionalParams: any[]) {}
    private _debug(message?: any, ...optionalParams: any[]) {
        this.log("DEBUG", colors.yellow, message, ...optionalParams)
    }
}