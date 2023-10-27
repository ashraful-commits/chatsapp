import bcryptjs from "bcryptjs"

export const hashPassword = (password)=>{
    const getSalt = bcryptjs.genSaltSync(10)
    const hashPass = bcryptjs.hashSync(password,getSalt)
    return hashPass
}