const USERNAME_MAX_LENGTH = 15
const USERNAME_MIN_LENGTH = 5

const PASSWORD_MIN_LENGTH = 8
const PASSWORD_MAX_LENGTH = 255

const FULLNAME_MAX_LENGTH = 150
const FULLNAME_MIN_LENGTH = 10
export function isUsername(username: string): string | undefined
{
    let ex = new RegExp(/^[A-Za-zÄäÖöÜüß0-9]{5,15}$/)

    if (ex.test(username)) return undefined

    if (username.length > USERNAME_MAX_LENGTH)
        return "Username too long!"
    if (username.length < USERNAME_MIN_LENGTH)
        return "Username too short!"

    return "Invalid Username!"
}

export function isFullname(fullname: string): string | undefined
{
    const fullNameRegex = /^[A-Za-zäüöÄÜÖß]+(?:\s[A-Za-zäüöÄÜÖß]+)*$/;
    if (!fullNameRegex.test(fullname)) return "Invalid Fullname!"

    if (fullname.length > FULLNAME_MAX_LENGTH) return "Fullname too long!"
    if (fullname.length < FULLNAME_MIN_LENGTH) return "Fullname is too short!"

    return undefined

}

export function isEmailAddress(email: string): string | undefined
{
    const regex = /^[A-Za-z0-9._%+-]{1,64}@(?:[A-Za-z0-9-]{1,63}\.){1,125}[A-Za-z]{2,63}$/

    if (regex.test(email))
        return undefined
    return "Invalid Email-Address!"
}

export function isPassword(password: string): string | undefined
{
    const regex = /^[A-Za-zÄäÖöÜüß0-9!@#$%^&*()_+\[\]{}|;:'",.<>/?\\\-]{8,255}$/;
    console.log(password)
    if (regex.test(password))
        return undefined

    if (password.length > PASSWORD_MAX_LENGTH)
        return "Password too long!"
    if (password.length < PASSWORD_MIN_LENGTH)
        return "Password too short!"

    return "Invalid Password!"
}