import bcrypt from 'bcrypt'


const hashPassword = async (password : string)=>{
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

const checkPassword = async (enterPassword : string, hash : string) => {
    const result = await bcrypt.compare(enterPassword, hash)
    return result
}


export{ hashPassword, checkPassword}