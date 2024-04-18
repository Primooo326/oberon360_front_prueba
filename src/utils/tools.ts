import { JWT_SECRET } from '@/config'
import * as jose from 'jose'
export const verifyJWT = async (token: string) => {
    try {
        const secret = new TextEncoder().encode(JWT_SECRET)
        const { payload } = await jose.jwtVerify(token, secret)
        return payload
    } catch (error) {
        return false
    }
}