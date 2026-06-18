import dotenv from 'dotenv'
import connectDB from '../config/db.js'
import Product from '../models/Product.js'

dotenv.config()

const products = [
  {
    name: 'Canon Camera EOS 2000',
    category: 'Consumer electronics',
    price: 998,
    stock: 24,
    featured: true,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1495707902641-75cac588d2e9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1500634245200-e5245c7574ef?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Professional digital camera with sharp image quality, fast autofocus, and durable body for travel or studio work.',
  },
  {
    name: 'GoPro HERO6 4K Action Camera',
    category: 'Consumer electronics',
    price: 799,
    stock: 4,
    featured: true,
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519183071298-a2962be90b8e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Compact action camera for outdoor filming, waterproof trips, and high-resolution video capture.',
  },
  {
    name: 'Smart Watch Sport Band',
    category: 'Computer and tech',
    price: 399,
    stock: 42,
    featured: true,
    image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Smart wearable with activity tracking, notifications, health insights, and everyday style.',
  },
  {
    name: 'Modern Wireless Headphones',
    category: 'Consumer electronics',
    price: 129,
    stock: 0,
    featured: false,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Comfortable headphones with balanced sound, soft ear cushions, and long battery life.',
  },
  {
    name: 'Blue Cotton Casual Jacket',
    category: 'Clothes and wear',
    price: 49,
    stock: 90,
    featured: true,
    image: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Soft cotton jacket with practical pockets and a clean fit for daily casual wear.',
  },
  {
    name: 'Ergonomic Office Chair',
    category: 'Home interiors',
    price: 189,
    stock: 31,
    featured: false,
    image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Adjustable chair with breathable mesh, lumbar support, and smooth rolling base.',
  },
  {
    name: 'Kitchen Blender Steel Set',
    category: 'Home interiors',
    price: 75,
    stock: 46,
    featured: false,
    image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1601001815894-4bb6c81416d7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Durable kitchen blender for smoothies, sauces, and quick home meal preparation.',
  },
  {
    name: 'Cordless Drill Tool Kit',
    category: 'Tools, equipments',
    price: 145,
    stock: 28,
    featured: true,
    image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Powerful cordless drill kit with battery pack, bit set, and hard carry case.',
  },
  {
    name: 'Smartphone 128GB Large Display',
    category: 'Computer and tech',
    price: 299,
    stock: 53,
    featured: true,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Reliable smartphone with large display, fast processor, and generous storage for work and entertainment.',
  },
  {
    name: 'Waterproof Travel Backpack',
    category: 'Sports and outdoor',
    price: 39,
    stock: 120,
    featured: false,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Lightweight travel backpack with water-resistant fabric and organized storage compartments.',
  },
]

async function seedProducts() {
  await connectDB()
  await Product.deleteMany()
  await Product.insertMany(products)
  console.log(`${products.length} products inserted`)
  process.exit()
}

seedProducts().catch((error) => {
  console.error(error)
  process.exit(1)
})
