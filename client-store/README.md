# Client-Centered Online Store

A modern, client-centered online store with personalized pricing for each client. Built with Next.js, TypeScript, Prisma, and Tailwind CSS.

## Features

- **Client Authentication**: Secure login and registration system
- **Personalized Pricing**: Each client gets their own custom price list
- **Product Catalog**: Browse products with client-specific pricing
- **Shopping Cart**: Add, update, and remove items from cart
- **Order Management**: Track orders and delivery status
- **Admin Panel**: Manage clients, products, and price lists
- **Responsive Design**: Modern UI that works on all devices

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: JWT tokens
- **UI Components**: Headless UI, Heroicons

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd client-store
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your database URL and other configuration:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/client_store?schema=public"
   JWT_SECRET="your-super-secret-jwt-key-here"
   STRIPE_PUBLISHABLE_KEY="pk_test_..."
   STRIPE_SECRET_KEY="sk_test_..."
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-nextauth-secret-here"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   
   # Seed the database with sample data
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Demo Credentials

After seeding the database, you can use these demo credentials:

- **Email**: demo@client.com
- **Password**: demo123

## Project Structure

```
client-store/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── cart/          # Shopping cart endpoints
│   │   └── products/      # Product endpoints
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Client dashboard
│   ├── products/          # Product catalog
│   └── admin/             # Admin panel
├── components/            # Reusable components
├── lib/                   # Utility functions
├── prisma/               # Database schema
├── scripts/              # Database scripts
└── types/                # TypeScript type definitions
```

## Key Features Explained

### Personalized Pricing

Each client has their own price list with custom pricing for products. The system:

1. **Client Registration**: Clients register with their company information
2. **Price List Assignment**: Admins create custom price lists for each client
3. **Product Display**: Products show client-specific pricing instead of base prices
4. **Discount Tracking**: Shows savings compared to base prices

### Client Dashboard

- **Personalized Welcome**: Shows client name and company
- **Quick Stats**: Available products, cart items, total savings
- **Quick Actions**: Browse products, view orders, manage cart, account settings
- **Featured Products**: Shows products with client-specific pricing

### Admin Panel

- **Client Management**: View, add, edit, and manage clients
- **Product Management**: Manage product catalog
- **Price List Management**: Create and assign custom pricing to clients
- **Analytics**: View statistics and metrics

## Database Schema

The application uses the following main entities:

- **Client**: Customer information and account details
- **Product**: Product catalog with base pricing
- **PriceList**: Custom pricing lists for clients
- **PriceListItem**: Individual product pricing within a price list
- **CartItem**: Shopping cart items for each client
- **Order**: Order information and status tracking
- **OrderItem**: Individual items within an order

## API Endpoints

### Authentication
- `POST /api/auth/login` - Client login
- `POST /api/auth/register` - Client registration
- `GET /api/auth/me` - Get current user info

### Products
- `GET /api/products` - Get products with client-specific pricing

### Cart
- `GET /api/cart` - Get client's cart items
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/[id]` - Update cart item quantity
- `DELETE /api/cart/[id]` - Remove item from cart

## Development

### Database Commands

```bash
# Generate Prisma client
npm run db:generate

# Push schema changes
npm run db:push

# Seed database
npm run db:seed

# Open Prisma Studio
npm run db:studio
```

### Building for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For support and questions, please open an issue in the repository.