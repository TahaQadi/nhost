import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization header required' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)
    const user = verifyToken(token)

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    // Get client's price list
    const priceList = await prisma.priceList.findFirst({
      where: {
        clientId: user.id,
        isActive: true
      },
      include: {
        priceListItems: {
          include: {
            product: true
          }
        }
      }
    })

    // Get all products with client-specific pricing
    const products = await prisma.product.findMany({
      where: { isActive: true },
      include: {
        priceListItems: {
          where: {
            priceList: {
              clientId: user.id,
              isActive: true
            }
          }
        }
      }
    })

    // Transform products to include client-specific pricing
    const productsWithPricing = products.map(product => {
      const priceListItem = product.priceListItems[0]
      const clientPrice = priceListItem?.price || product.basePrice
      const discount = priceListItem?.discount || 0

      return {
        id: product.id,
        name: product.name,
        description: product.description,
        sku: product.sku,
        category: product.category,
        basePrice: product.basePrice,
        price: clientPrice,
        discount: discount,
        imageUrl: product.imageUrl,
        isActive: product.isActive,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
      }
    })

    return NextResponse.json({ products: productsWithPricing })
  } catch (error) {
    console.error('Products API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}