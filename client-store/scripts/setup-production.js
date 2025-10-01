const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function setupProduction() {
  console.log('🚀 Setting up production database...')
  
  try {
    // Create sample clients
    const client1 = await prisma.client.upsert({
      where: { email: 'demo@client.com' },
      update: {},
      create: {
        email: 'demo@client.com',
        name: 'Demo Client',
        company: 'Demo Company Inc.',
        phone: '+1-555-0123',
        address: '123 Business St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA',
        isActive: true
      }
    })

    const client2 = await prisma.client.upsert({
      where: { email: 'john@example.com' },
      update: {},
      create: {
        email: 'john@example.com',
        name: 'John Smith',
        company: 'Smith Corporation',
        phone: '+1-555-0456',
        address: '456 Corporate Ave',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90210',
        country: 'USA',
        isActive: true
      }
    })

    console.log('✅ Created clients')

    // Create sample products
    const products = await Promise.all([
      prisma.product.upsert({
        where: { sku: 'PW-001' },
        update: {},
        create: {
          name: 'Premium Widget',
          description: 'High-quality premium widget with advanced features',
          sku: 'PW-001',
          category: 'Widgets',
          basePrice: 99.99,
          imageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400',
          isActive: true
        }
      }),
      prisma.product.upsert({
        where: { sku: 'SW-002' },
        update: {},
        create: {
          name: 'Standard Widget',
          description: 'Standard quality widget for everyday use',
          sku: 'SW-002',
          category: 'Widgets',
          basePrice: 49.99,
          imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400',
          isActive: true
        }
      }),
      prisma.product.upsert({
        where: { sku: 'BW-003' },
        update: {},
        create: {
          name: 'Basic Widget',
          description: 'Basic widget for simple applications',
          sku: 'BW-003',
          category: 'Widgets',
          basePrice: 29.99,
          imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
          isActive: true
        }
      }),
      prisma.product.upsert({
        where: { sku: 'GT-004' },
        update: {},
        create: {
          name: 'Gadget Pro',
          description: 'Professional-grade gadget for business use',
          sku: 'GT-004',
          category: 'Gadgets',
          basePrice: 199.99,
          imageUrl: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400',
          isActive: true
        }
      }),
      prisma.product.upsert({
        where: { sku: 'GT-005' },
        update: {},
        create: {
          name: 'Gadget Lite',
          description: 'Lightweight gadget for personal use',
          sku: 'GT-005',
          category: 'Gadgets',
          basePrice: 79.99,
          imageUrl: 'https://images.unsplash.com/photo-1518717757756-8d0cbb5c0b25?w=400',
          isActive: true
        }
      })
    ])

    console.log('✅ Created products')

    // Create price lists for clients
    const priceList1 = await prisma.priceList.upsert({
      where: { id: 'pl-1' },
      update: {},
      create: {
        id: 'pl-1',
        name: 'Demo Client Premium Pricing',
        description: 'Premium pricing tier for Demo Client',
        clientId: client1.id,
        isActive: true
      }
    })

    const priceList2 = await prisma.priceList.upsert({
      where: { id: 'pl-2' },
      update: {},
      create: {
        id: 'pl-2',
        name: 'John Smith Standard Pricing',
        description: 'Standard pricing tier for John Smith',
        clientId: client2.id,
        isActive: true
      }
    })

    console.log('✅ Created price lists')

    // Create price list items with client-specific pricing
    await Promise.all([
      // Demo Client gets 20% discount on all products
      ...products.map(product => 
        prisma.priceListItem.upsert({
          where: { 
            priceListId_productId: { 
              priceListId: priceList1.id, 
              productId: product.id 
            }
          },
          update: {},
          create: {
            priceListId: priceList1.id,
            productId: product.id,
            price: product.basePrice * 0.8, // 20% off
            discount: 20.00
          }
        })
      ),
      // John Smith gets 10% discount on all products
      ...products.map(product => 
        prisma.priceListItem.upsert({
          where: { 
            priceListId_productId: { 
              priceListId: priceList2.id, 
              productId: product.id 
            }
          },
          update: {},
          create: {
            priceListId: priceList2.id,
            productId: product.id,
            price: product.basePrice * 0.9, // 10% off
            discount: 10.00
          }
        })
      )
    ])

    console.log('✅ Created price list items')
    console.log('🎉 Production database setup complete!')
    console.log('\nDemo credentials:')
    console.log('Email: demo@client.com')
    console.log('Password: demo123')
    
  } catch (error) {
    console.error('❌ Error setting up production database:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

setupProduction()