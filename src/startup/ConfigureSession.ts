import Session from "express-session";
import { Express } from "express";
import SessionStore from "../security/SessionStore.js";
import { getRedis } from "../utils/databases.js";

export type User = {
    isLoggedIn: boolean;
    userId: string | null;
};

declare module "express-session" {
    interface SessionData {
      user: User
      lastSeen: Date | null;
      creationDate: Date;
    }
}

// TODO: set in production mode cookie secure
const sessionSettings: Session.SessionOptions = {
    secret: process.env.SESSION_SECRET || "password",
    resave: false,
    saveUninitialized: false,
    store: new SessionStore()
}

export default function ConfigureSession(app: Express)
{
    app.use(Session(sessionSettings))
}