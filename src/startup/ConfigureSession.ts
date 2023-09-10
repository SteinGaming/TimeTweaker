import Session from "express-session";
import { Express } from "express";

type User = {
    isLoggedIn: boolean;
    userId: string;
};

declare module "express-session" {
    interface SessionData {
      user: User
    }
}

// TODO: set in production mode cookie secure
const sessionSettings: Session.SessionOptions = {
    secret: process.env.SESSION_SECRET || "password",
    resave: false,
    saveUninitialized: false
}

export default function ConfigureSession(app: Express)
{
    app.use(Session(sessionSettings))
}