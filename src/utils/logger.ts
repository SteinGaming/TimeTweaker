
import dotenv from "dotenv";

dotenv.config()
let env = process.env

const COLOR_INFO = env.LOGGER_INFO_COLOR || "\u001B[38;5;118m"
const COLOR_WARNING = env.LOGGER_WARNING_COLOR || "\u001B[38;5;226m"
const COLOR_ERROR = env.LOGGER_ERROR_COLOR || "\u001B[38;5;196m"
const COLOR_DEBUG = env.LOGGER_DEBUG_COLOR || "\u001B[38;5;45m"
const COLOR_RESET = env.LOGGER_RESET_COLOR || "\u001B[0m"


const LOGGER_LEVEL = env.LOGGER_LEVEL?.toLowerCase() || "info"

const TIMESTAMP_REGION = env.TIMESTAMP_REGION || "en-US"

const levelToInt = {
    "info": 0,
    "warn": 1,
    "error": 2,
    "debug": 3
}

export let info = function(...data: any[]) {}
export let warn = function(...data: any[]) {}
export let err = function(...data: any[]) {}
export let debug = function(...data: any[]) {}

export function initLogger() {
    const level = levelToInt[LOGGER_LEVEL]

    if (level >= 0) info = _info
    if (level >= 1) warn = _warn
    if (level >= 2) err = _err
    if (level >= 3) debug = _debug
}

function timeStamp(): string {
    const date = new Date()

    return `[${date.toLocaleDateString(TIMESTAMP_REGION)} ${date.toLocaleTimeString(TIMESTAMP_REGION)}] `
}


async function _info(...data: any[]) {
    data[0] = COLOR_INFO    + timeStamp() + data[0]
    console.log(...data, COLOR_RESET)
}

async function _warn(...data: any[]) {
    data[0] = COLOR_WARNING + timeStamp() + data[0]
    console.warn(...data, COLOR_RESET)
}

async function _err(...data: any[]) {
    data[0] = COLOR_ERROR   + timeStamp() + data[0]
    console.error(...data, COLOR_RESET)
}

async function _debug(...data: any[]) {
    data[0] = COLOR_DEBUG   + timeStamp() + data[0]
    console.debug(...data, COLOR_RESET)
}
