import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateToken, hashPassword } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, company, phone, address, city, state, zipCode, country } = await request.json()

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      )
    }

    // Check if client already exists
    const existingClient = await prisma.client.findUnique({
      where: { email }
    })

    if (existingClient) {
      return NextResponse.json(
        { error: 'Client with this email already exists' },
        { status: 409 }
      )
    }

    // Create new client
    const client = await prisma.client.create({
      data: {
        email,
        name,
        company,
        phone,
        address,
        city,
        state,
        zipCode,
        country
      }
    })

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
    }, { status: 201 })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}