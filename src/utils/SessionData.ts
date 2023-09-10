type User = {
    isLoggedIn: boolean;
    userId: string;
};

declare module "express-session" {
    interface SessionData {
      user: User
    }
}