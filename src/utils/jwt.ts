import jwt from 'jsonwebtoken'

export function signJwt(object: Object, keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey', options?: jwt.SignOptions) {
    const signingKey = Buffer.from('', 'base64').toString('ascii')
    return jwt.sign(object, signingKey, {
        ...(options && options),
        algorithm: 'RS256'
    })
}



export function verifyJwt<T>(token: string, keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey'): T | null {
    const publicKey = Buffer.from('', 'base64').toString('ascii')
    try {
        const decoded = jwt.verify(token, publicKey) as T
        return decoded
    } catch (e) {
        return null
    }
}