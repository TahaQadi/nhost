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

    const cartItems = await prisma.cartItem.findMany({
      where: { clientId: user.id },
      include: {
        product: {
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
        }
      }
    })

    // Transform cart items to include client-specific pricing
    const cartItemsWithPricing = cartItems.map(item => {
      const priceListItem = item.product.priceListItems[0]
      const clientPrice = priceListItem?.price || item.product.basePrice
      const discount = priceListItem?.discount || 0

      return {
        id: item.id,
        productId: item.productId,
        quantity: item.quantity,
        product: {
          id: item.product.id,
          name: item.product.name,
          description: item.product.description,
          sku: item.product.sku,
          basePrice: item.product.basePrice,
          price: clientPrice,
          discount: discount,
          imageUrl: item.product.imageUrl
        },
        createdAt: item.createdAt,
        updatedAt: item.updatedAt
      }
    })

    return NextResponse.json({ cartItems: cartItemsWithPricing })
  } catch (error) {
    console.error('Cart API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
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

    const { productId, quantity = 1 } = await request.json()

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    // Check if product exists and is active
    const product = await prisma.product.findUnique({
      where: { id: productId, isActive: true }
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Check if item already exists in cart
    const existingItem = await prisma.cartItem.findUnique({
      where: {
        clientId_productId: {
          clientId: user.id,
          productId: productId
        }
      }
    })

    if (existingItem) {
      // Update quantity
      const updatedItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity }
      })

      return NextResponse.json({ 
        message: 'Cart updated successfully',
        cartItem: updatedItem
      })
    } else {
      // Create new cart item
      const newItem = await prisma.cartItem.create({
        data: {
          clientId: user.id,
          productId: productId,
          quantity: quantity
        }
      })

      return NextResponse.json({ 
        message: 'Item added to cart successfully',
        cartItem: newItem
      }, { status: 201 })
    }
  } catch (error) {
    console.error('Add to cart error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}