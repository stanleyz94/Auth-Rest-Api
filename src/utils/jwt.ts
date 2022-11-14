import jwt from 'jsonwebtoken'

const keys = {
    accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY,
    refreshTokenPrivateKey: process.env.REFRESH_TOKEN_PRIVATE_KEY,
    accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY,
    refreshTokenPublicKey: process.env.REFRESH_TOKEN_PUBLIC_KEY,
}

export function signJwt(object: Object, keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey', options?: jwt.SignOptions) {

    const signingKey = Buffer.from(keys[keyName] as string, 'base64').toString('ascii')
    return jwt.sign(object, signingKey, {
        ...(options && options),
        algorithm: 'RS256'
    })
}



export function verifyJwt<T>(token: string, keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey'): T | null {
    const publicKey = Buffer.from(keys[keyName] as string, 'base64').toString('ascii')
    try {
        const decoded = jwt.verify(token, publicKey) as T
        return decoded
    } catch (e) {
        return null
    }
}