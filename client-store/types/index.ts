export interface Client {
  id: string
  email: string
  name: string
  company?: string
  phone?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
  country?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Product {
  id: string
  name: string
  description?: string
  sku: string
  category?: string
  basePrice: number
  imageUrl?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface PriceList {
  id: string
  name: string
  description?: string
  clientId: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface PriceListItem {
  id: string
  priceListId: string
  productId: string
  price: number
  discount?: number
  createdAt: Date
  updatedAt: Date
  product?: Product
}

export interface CartItem {
  id: string
  clientId: string
  productId: string
  quantity: number
  createdAt: Date
  updatedAt: Date
  product?: Product
}

export interface Order {
  id: string
  clientId: string
  orderNumber: string
  status: OrderStatus
  totalAmount: number
  notes?: string
  createdAt: Date
  updatedAt: Date
  orderItems?: OrderItem[]
}

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  quantity: number
  price: number
  createdAt: Date
  product?: Product
}

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export interface AuthUser {
  id: string
  email: string
  name: string
  company?: string
}