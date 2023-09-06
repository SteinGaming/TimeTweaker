const USERNAME_MAX_LENGTH = 15
const USERNAME_MIN_LENGTH = 5

const PASSWORD_MAX_LENGTH = 255

const FULLNAME_MAX_LENGTH = 150
const FULLNAME_MIN_LENGTH = 10
export function isUsername(username: string): string 
{
    let ex = new RegExp(/^[A-Za-zÄäÖöÜüß0-9]{5,15}$/)

    if (ex.test(username))
    {
        return ""
    }

    if (username.length > USERNAME_MAX_LENGTH)
    {
        return "Username too long!"
    }
    return "Username too short!"
}

export function isFullname(fullname: string): string
{
    if (fullname.length > FULLNAME_MAX_LENGTH)
    {
        return "Fullname too long!"
    }
    if (fullname.length < FULLNAME_MIN_LENGTH)
    {
        return "Fullname is too short!"
    }
    const fullNameRegex = /^[A-Za-zäüöÄÜÖß]+(?:\s[A-Za-zäüöÄÜÖß]+)*$/;
    if (fullNameRegex.test(fullname))
    {
        return ""
    }

    return "invalid Fullname!"
}

export function isEmailAddress(email: string): string 
{
    const regex = /^[A-Za-z0-9._%+-]{1,64}@(?:[A-Za-z0-9-]{1,63}\.){1,125}[A-Za-z]{2,63}$/

    if (regex.test(email))
    {
        return ""
    }
    return "Invalid Email-Address!"
}

export function isPassword(password: string): string
{
    const regex = /^[A-Za-zÄäÖöÜüß0-9!@#$%^&*()_+\[\]{}|;:'",.<>/?\\\-]{8,255}$/;
    console.log(password)
    if (regex.test(password))
    {
        return ""
    }

    if (password.length > PASSWORD_MAX_LENGTH)
    {
        return "Password too long!"
    }
    return "Password too short!"
}