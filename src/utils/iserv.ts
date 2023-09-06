import fetch from "node-fetch";

const TIMETABLES_DATA_PATH = "/iserv/timetable/jsonttdata"


export async function getTimetablesData(host: string, authentification: HeadersInit): Promise<object> {
    let res = await fetch(host + TIMETABLES_DATA_PATH, {
        headers: authentification
    })
    return (<object>(await res.json()))
}