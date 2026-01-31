const mongoose = require('mongoose');
require('dotenv').config();

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true }
});

const Product = mongoose.model('Product', productSchema);

const products = [
  {
    title: "iPhone 15 Pro",
    price: 134900,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
    description: "Latest iPhone with titanium design and A17 Pro chip"
  },
  {
    title: "MacBook Air M2",
    price: 114900,
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400",
    description: "Lightweight laptop with M2 chip and all-day battery"
  },
  {
    title: "AirPods Pro",
    price: 24900,
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400",
    description: "Active noise cancellation wireless earbuds"
  },
  {
    title: "iPad Pro 12.9",
    price: 112900,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400",
    description: "Professional tablet with M2 chip and Liquid Retina display"
  },
  {
    title: "Apple Watch Series 9",
    price: 41900,
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400",
    description: "Advanced health and fitness tracking smartwatch"
  }
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Connected to MongoDB');
    
    await Product.deleteMany({});
    await Product.insertMany(products);
    
    console.log('Products seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts();