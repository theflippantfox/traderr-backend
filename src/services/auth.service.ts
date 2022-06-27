import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const secret = process.env.JWT_SECRET_KEY || "supersecret"

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hashSync(password, 10)
}

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compareSync(password, hashedPassword)
}

export const getSignedToken = (payload: any): String => {
  return jwt.sign(payload, secret, { expiresIn: '3d' })
}

export const verifyToken = (token: string): any => {
  return jwt.verify(token, secret)
}