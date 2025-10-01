'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  ShoppingBagIcon, 
  UserIcon, 
  ChartBarIcon, 
  CogIcon,
  ArrowRightOnRectangleIcon,
  ShoppingCartIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline'

interface User {
  id: string
  email: string
  name: string
  company?: string
}

interface Product {
  id: string
  name: string
  description?: string
  sku: string
  basePrice: number
  imageUrl?: string
  price?: number
  discount?: number
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')

    if (!token || !userData) {
      router.push('/auth/login')
      return
    }

    setUser(JSON.parse(userData))
    fetchProducts(token)
  }, [router])

  const fetchProducts = async (token: string) => {
    try {
      const response = await fetch('/api/products', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setProducts(data.products || [])
      } else {
        setError('Failed to load products')
      }
    } catch (err) {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
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
              <ShoppingBagIcon className="h-8 w-8 text-primary-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">Client Store</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.name}</span>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}!
          </h2>
          <p className="text-lg text-gray-600">
            {user?.company && `Your personalized catalog for ${user.company}`}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <ShoppingBagIcon className="h-8 w-8 text-primary-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Available Products</p>
                <p className="text-2xl font-bold text-gray-900">{products.length}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <ShoppingCartIcon className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Cart Items</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <CurrencyDollarIcon className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Savings</p>
                <p className="text-2xl font-bold text-gray-900">$0.00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link href="/products" className="card hover:shadow-md transition-shadow duration-200">
            <div className="text-center">
              <ShoppingBagIcon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Browse Products</h3>
              <p className="text-gray-600">View your personalized product catalog</p>
            </div>
          </Link>

          <Link href="/dashboard/orders" className="card hover:shadow-md transition-shadow duration-200">
            <div className="text-center">
              <ChartBarIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Order History</h3>
              <p className="text-gray-600">Track your orders and delivery status</p>
            </div>
          </Link>

          <Link href="/dashboard/cart" className="card hover:shadow-md transition-shadow duration-200">
            <div className="text-center">
              <ShoppingCartIcon className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Shopping Cart</h3>
              <p className="text-gray-600">Review items and proceed to checkout</p>
            </div>
          </Link>

          <Link href="/dashboard/profile" className="card hover:shadow-md transition-shadow duration-200">
            <div className="text-center">
              <CogIcon className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Account Settings</h3>
              <p className="text-gray-600">Manage your profile and preferences</p>
            </div>
          </Link>
        </div>

        {/* Featured Products */}
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Featured Products</h3>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}
          
          {products.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingBagIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No products available at the moment.</p>
              <Link href="/products" className="btn-primary mt-4 inline-block">
                Browse All Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.slice(0, 6).map((product) => (
                <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg mb-4">
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-lg" />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                        <ShoppingBagIcon className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h4>
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-primary-600">
                        ${product.price ? product.price.toFixed(2) : product.basePrice.toFixed(2)}
                      </span>
                      {product.discount && product.discount > 0 && (
                        <span className="ml-2 text-sm text-green-600">
                          {product.discount}% off
                        </span>
                      )}
                    </div>
                    <Link 
                      href={`/products/${product.id}`}
                      className="btn-primary text-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}