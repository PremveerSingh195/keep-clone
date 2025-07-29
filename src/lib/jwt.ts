import jwt from 'jsonwebtoken'

const  JWT_SECRET = process.env.JWT_SECRET!

export function createJWT(payload : object) {
return jwt.sign(payload , JWT_SECRET , {expiresIn : '1d'})
}

export function verifyJWT(token: string) {
    return jwt.verify(token ,JWT_SECRET) as {id:string ; email : string}
}

