import dotenv from "dotenv"
import {Db, MongoClient} from "mongodb";
import {createClient, RedisClientType, RedisFunctions, RedisModules, RedisScripts} from "redis";
import Logger from "./logger.js";

dotenv.config()

const mlog = new Logger("MongoDB")
const rlog = new Logger("Redis")

let mongoDB: Db | undefined = undefined;

async function initMongoDB() {
    const credentials = process.env.MONGODB_USER == undefined ? "" : process.env.MONGODB_USER + ":" + process.env.MONGODB_PASSWORD + "@"

    const url = 'mongodb://' + credentials + process.env.MONGODB_HOST;
    const dbName = process.env.MONGODB_DATABASE;

    const client = new MongoClient(url);
    await client.connect();

    mlog.debug('Connected successfully to MongoDb server!');

    return client.db(dbName);
}

export async function getMongoDB() {
    if (mongoDB == undefined)
        mongoDB = await initMongoDB()
    return mongoDB
}
export type RedisClient = RedisClientType<{  } & RedisModules, RedisFunctions, RedisScripts>
let redis: RedisClient | undefined = undefined
async function initRedis() {
    const credentials = process.env.REDIS_USER == undefined ? "" : process.env.REDIS_USER + ":" + process.env.REDIS_PASSWORD + "@"

    const url = "redis://" + credentials + process.env.REDIS_HOST

    const client = createClient({
        url: url
    })
    client.on('error', err => {
        console.error("Encountered error on redis init", err)
    })
    await client.connect()
    rlog.debug('Connected successfully to Redis server!');


    return client
}

export async function getRedis() {
    if (redis == undefined) {
        redis = await initRedis()
    }
    return redis
}