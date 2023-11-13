import { SessionData, Store } from "express-session";
import { getMongoDB, getRedis } from "../utils/databases.js";
import { Session } from "inspector";
import { User } from "../startup/ConfigureSession.js";
import Logger from "../utils/logger.js";
const REDIS_SESSION_PREFIX = "session."
const REDIS_EXPIRE_TIME = 60*2 // In seconds
// Example: https://github.com/tj/connect-redis

export interface DbSession extends SessionData
{
    sessionId: string;
}

const noop = (_err?: unknown, _data?: any) => {}
async function setSessionDataInRedis(sid, data: DbSession)
{
    const redis = await getRedis();
    redis.setEx(REDIS_SESSION_PREFIX + sid, REDIS_EXPIRE_TIME, JSON.stringify(data));
}

const logger = new Logger("SessionStore")
export default class SmartStore extends Store
{
    constructor()
    {
        super();

    }
    async get(sid: string , cb = noop)
    {
        logger.debug("get session")
        const redis = await getRedis();
        
        const redisResRaw = await redis.get(REDIS_SESSION_PREFIX + sid)
        if (redisResRaw !== null) 
        {
            logger.debug("Loaded session from redis")
            cb(null, JSON.parse(redisResRaw))
            return
        }

        const mongodb = await getMongoDB()
        const sessions = mongodb.collection<DbSession>("sessions")
        const session = await sessions.findOne({"sessionId": sid}, {projection:{_id:0}})

        if (session !== null)
        {
            await setSessionDataInRedis(sid, session)
            logger.debug("Loaded session from db")
            cb(null, session)
            return
        }
        cb()
    }
    async set(sid: string, data: SessionData, cb = noop)
    {

        const dbSessionData: DbSession = {
            ...data,
            sessionId: sid
        }

        const mongodb = await getMongoDB()
        const sessions = mongodb.collection<DbSession>("sessions")

        const res = await sessions.findOneAndReplace( { sessionId: sid}, dbSessionData)
        if (res !== null)
        {
            return cb()
        }
        const saveResult = await sessions.insertOne(dbSessionData)
        if (!saveResult.acknowledged)
        {
            cb("Failed to save session!")
            return
        }
        await setSessionDataInRedis(sid, dbSessionData)
        cb()
        
    }
    async destroy(sid: string, cb = noop)
    {
        logger.debug("Delete session:", sid)
        const redis = await getRedis();
        const sessions = (await getMongoDB()).collection<DbSession>("sessions")
        
        await redis.del(REDIS_SESSION_PREFIX + sid)
        await sessions.deleteMany({"sessionId": sid})
    }
}