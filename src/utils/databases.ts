import dotenv from "dotenv"
import { MongoClient} from "mongodb";

dotenv.config()

export default async function getMongoDb()
{
    const url = 'mongodb://' + process.env.MONGODB_HOST;
    const dbName = process.env.MONGODB_DATABASE;

    const client = new MongoClient(url);
    await client.connect();

    console.log('Connected successfully to MongoDb server!');

    const db = client.db(dbName);
    return db;
}