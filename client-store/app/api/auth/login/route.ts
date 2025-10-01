import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateToken, comparePassword } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find client by email
    const client = await prisma.client.findUnique({
      where: { email }
    })

    if (!client || !client.isActive) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // For demo purposes, we'll use a simple password check
    // In production, you should hash passwords and compare hashes
    if (password !== 'demo123') {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const token = generateToken({
      id: client.id,
      email: client.email,
      name: client.name,
      company: client.company || undefined
    })

    return NextResponse.json({
      token,
      user: {
        id: client.id,
        email: client.email,
        name: client.name,
        company: client.company
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}