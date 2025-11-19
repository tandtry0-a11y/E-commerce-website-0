import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Elysium Noise-Cancelling Headphones',
    price: 299.99,
    category: 'Electronics',
    image: 'https://picsum.photos/id/1/400/400',
    description: 'Immerse yourself in pure audio bliss with industry-leading noise cancellation.',
    rating: 4.8,
    reviews: 128
  },
  {
    id: '2',
    name: 'Analog Classic Watch',
    price: 149.50,
    category: 'Accessories',
    image: 'https://picsum.photos/id/175/400/400',
    description: 'Timeless design meets modern durability. Genuine leather strap.',
    rating: 4.5,
    reviews: 85
  },
  {
    id: '3',
    name: 'Canvas Weekender Bag',
    price: 89.00,
    category: 'Travel',
    image: 'https://picsum.photos/id/20/400/400',
    description: 'The perfect companion for your short getaways. Water-resistant canvas.',
    rating: 4.7,
    reviews: 210
  },
  {
    id: '4',
    name: 'Minimalist Desk Lamp',
    price: 45.00,
    category: 'Home',
    image: 'https://picsum.photos/id/36/400/400',
    description: 'Adjustable brightness and color temperature for the perfect workspace.',
    rating: 4.3,
    reviews: 56
  },
  {
    id: '5',
    name: 'Artisan Coffee Maker',
    price: 120.00,
    category: 'Kitchen',
    image: 'https://picsum.photos/id/42/400/400',
    description: 'Brew cafe-quality coffee at home with precise temperature control.',
    rating: 4.9,
    reviews: 342
  },
  {
    id: '6',
    name: 'Ceramic Plant Pot Set',
    price: 35.00,
    category: 'Home',
    image: 'https://picsum.photos/id/58/400/400',
    description: 'Hand-glazed ceramic pots to elevate your indoor garden.',
    rating: 4.6,
    reviews: 92
  },
  {
    id: '7',
    name: 'Wireless Mechanical Keyboard',
    price: 110.00,
    category: 'Electronics',
    image: 'https://picsum.photos/id/60/400/400',
    description: 'Tactile switches and RGB lighting in a compact wireless form factor.',
    rating: 4.8,
    reviews: 156
  },
  {
    id: '8',
    name: 'Vintage Film Camera',
    price: 450.00,
    category: 'Photography',
    image: 'https://picsum.photos/id/96/400/400',
    description: 'Restored vintage camera for authentic film photography enthusiasts.',
    rating: 5.0,
    reviews: 12
  }
];

export const SALES_DATA = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 2000 },
  { name: 'Apr', sales: 2780 },
  { name: 'May', sales: 1890 },
  { name: 'Jun', sales: 2390 },
  { name: 'Jul', sales: 3490 },
];