'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  ShoppingCartIcon, 
  ArrowLeftIcon,
  TrashIcon,
  PlusIcon,
  MinusIcon
} from '@heroicons/react/24/outline'

interface CartItem {
  id: string
  productId: string
  quantity: number
  product: {
    id: string
    name: string
    description?: string
    sku: string
    basePrice: number
    price: number
    discount?: number
    imageUrl?: string
  }
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updating, setUpdating] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/auth/login')
      return
    }

    fetchCartItems(token)
  }, [router])

  const fetchCartItems = async (token: string) => {
    try {
      const response = await fetch('/api/cart', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setCartItems(data.cartItems || [])
      } else {
        setError('Failed to load cart items')
      }
    } catch (err) {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return

    setUpdating(itemId)
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      const response = await fetch(`/api/cart/${itemId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quantity: newQuantity })
      })

      if (response.ok) {
        setCartItems(prev => 
          prev.map(item => 
            item.id === itemId 
              ? { ...item, quantity: newQuantity }
              : item
          )
        )
      } else {
        setError('Failed to update quantity')
      }
    } catch (err) {
      setError('Network error')
    } finally {
      setUpdating(null)
    }
  }

  const removeItem = async (itemId: string) => {
    setUpdating(itemId)
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      const response = await fetch(`/api/cart/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        setCartItems(prev => prev.filter(item => item.id !== itemId))
      } else {
        setError('Failed to remove item')
      }
    } catch (err) {
      setError('Network error')
    } finally {
      setUpdating(null)
    }
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity)
    }, 0)
  }

  const calculateSavings = () => {
    return cartItems.reduce((total, item) => {
      const baseTotal = item.product.basePrice * item.quantity
      const clientTotal = item.product.price * item.quantity
      return total + (baseTotal - clientTotal)
    }, 0)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading cart...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-gray-900 mr-4">
                <ArrowLeftIcon className="h-5 w-5 mr-1" />
                Back to Dashboard
              </Link>
              <ShoppingCartIcon className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">Shopping Cart</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCartIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-600 mb-4">Add some products to get started</p>
            <Link href="/products" className="btn-primary">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Cart Items ({cartItems.length})
                  </h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {item.product.imageUrl ? (
                            <img 
                              src={item.product.imageUrl} 
                              alt={item.product.name}
                              className="h-20 w-20 object-cover rounded-lg"
                            />
                          ) : (
                            <div className="h-20 w-20 bg-gray-200 rounded-lg flex items-center justify-center">
                              <ShoppingCartIcon className="h-8 w-8 text-gray-400" />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-medium text-gray-900">
                            {item.product.name}
                          </h3>
                          <p className="text-sm text-gray-600">{item.product.description}</p>
                          <p className="text-xs text-gray-500">SKU: {item.product.sku}</p>
                        </div>

                        <div className="flex items-center space-x-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={updating === item.id || item.quantity <= 1}
                              className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50"
                            >
                              <MinusIcon className="h-4 w-4" />
                            </button>
                            <span className="w-8 text-center font-medium">
                              {updating === item.id ? '...' : item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={updating === item.id}
                              className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50"
                            >
                              <PlusIcon className="h-4 w-4" />
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <div className="text-lg font-semibold text-gray-900">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </div>
                            <div className="text-sm text-gray-600">
                              ${item.product.price.toFixed(2)} each
                            </div>
                            {item.product.discount && item.product.discount > 0 && (
                              <div className="text-xs text-green-600">
                                {item.product.discount}% off
                              </div>
                            )}
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeItem(item.id)}
                            disabled={updating === item.id}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-full disabled:opacity-50"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${calculateTotal().toFixed(2)}</span>
                  </div>
                  
                  {calculateSavings() > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Your Savings</span>
                      <span className="font-medium">-${calculateSavings().toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">Free</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">$0.00</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button className="w-full btn-primary mb-4">
                  Proceed to Checkout
                </button>
                
                <Link 
                  href="/products" 
                  className="w-full btn-outline text-center block"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}