export interface DbUser
{
    fullName: string,
    username: string,
    emailAddress: string,
    password: string,
    lastSeen: Date | null,
    registrationDate: Date,
    isActive: boolean,
    hasVerified: boolean
    has2FA: boolean,
}