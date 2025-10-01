import jwt from 'jsonwebtoken'
import { AuthUser } from '@/types'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret'

export function generateToken(user: AuthUser): string {
  return jwt.sign(user, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): AuthUser | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthUser
  } catch {
    return null
  }
}

export function hashPassword(password: string): string {
  const bcrypt = require('bcryptjs')
  return bcrypt.hashSync(password, 10)
}

export function comparePassword(password: string, hash: string): boolean {
  const bcrypt = require('bcryptjs')
  return bcrypt.compareSync(password, hash)
}