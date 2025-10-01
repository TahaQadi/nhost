import Link from 'next/link'
import { ShoppingBagIcon, UserIcon, ChartBarIcon, CogIcon } from '@heroicons/react/24/outline'

export default function HomePage() {
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
            <div className="flex space-x-4">
              <Link href="/auth/login" className="btn-outline">
                Login
              </Link>
              <Link href="/auth/register" className="btn-primary">
                Register
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Personalized Pricing for Every Client
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
            Experience a client-centered online store where each customer gets their own personalized pricing and product catalog.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/auth/register" className="bg-white text-primary-600 hover:bg-gray-50 font-medium py-3 px-6 rounded-lg transition-colors duration-200">
              Get Started
            </Link>
            <Link href="/products" className="border border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-6 rounded-lg transition-colors duration-200">
              Browse Products
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Client Store?
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide personalized experiences that adapt to each client's needs and preferences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card text-center">
              <UserIcon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Personalized Pricing</h4>
              <p className="text-gray-600">
                Each client gets their own custom price list based on their relationship and volume.
              </p>
            </div>

            <div className="card text-center">
              <ShoppingBagIcon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Custom Catalogs</h4>
              <p className="text-gray-600">
                See only the products and prices relevant to your business needs.
              </p>
            </div>

            <div className="card text-center">
              <ChartBarIcon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Order Tracking</h4>
              <p className="text-gray-600">
                Monitor your orders and track delivery status in real-time.
              </p>
            </div>

            <div className="card text-center">
              <CogIcon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Easy Management</h4>
              <p className="text-gray-600">
                Manage your account, view order history, and update preferences easily.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of clients who trust us for their personalized shopping experience.
          </p>
          <Link href="/auth/register" className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200">
            Create Your Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 Client Store. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}