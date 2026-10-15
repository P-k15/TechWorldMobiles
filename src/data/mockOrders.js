/**
 * Mock Orders placed through TechWorldMobiles Online Store
 * Spanning August, September, and October 2026
 */

export const MOCK_ORDERS = [
  {
    id: 'ORD-2026-8801',
    customer: {
      fullName: 'Rahul Deshmukh',
      phone: '+91 98200 11223',
      email: 'rahul.deshmukh@gmail.com',
      address: 'Flat 402, Sea Breeze Apts, Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050'
    },
    orderDate: '2026-08-05T11:20:00Z',
    items: [
      {
        productId: 'np-1',
        productName: 'Apple iPhone 16',
        sku: 'IPH16-128-ULT',
        type: 'new',
        brand: 'Apple',
        storage: '128GB',
        color: 'Ultramarine',
        unitPrice: 79900,
        costPrice: 68500,
        quantity: 1,
        total: 79900,
        image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80'
      }
    ],
    subtotal: 79900,
    deliveryCharge: 0,
    discount: 0,
    totalAmount: 79900,
    paymentMethod: 'UPI (Demo)',
    paymentStatus: 'Paid',
    fulfilmentStatus: 'Delivered',
    transactionId: 'TXN-S-001'
  },
  {
    id: 'ORD-2026-8802',
    customer: {
      fullName: 'Vikram Joshi',
      phone: '+91 98111 22334',
      email: 'vikram.j@outlook.com',
      address: 'House 14B, Sector 28',
      city: 'Gurugram',
      state: 'Haryana',
      pincode: '122002'
    },
    orderDate: '2026-08-15T15:45:00Z',
    items: [
      {
        productId: 'np-7',
        productName: 'OnePlus 13R',
        sku: 'OP-13R-256-AQU',
        type: 'new',
        brand: 'OnePlus',
        storage: '256GB',
        color: 'Cool Aqua',
        unitPrice: 42999,
        costPrice: 36800,
        quantity: 1,
        total: 42999,
        image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=600&q=80'
      }
    ],
    subtotal: 42999,
    deliveryCharge: 0,
    discount: 0,
    totalAmount: 42999,
    paymentMethod: 'Online Payment (Demo)',
    paymentStatus: 'Paid',
    fulfilmentStatus: 'Delivered',
    transactionId: 'TXN-S-002'
  },
  {
    id: 'ORD-2026-8803',
    customer: {
      fullName: 'Siddharth Rao',
      phone: '+91 99001 55667',
      email: 'siddharth.rao@gmail.com',
      address: '24, 7th Cross, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038'
    },
    orderDate: '2026-08-22T09:15:00Z',
    items: [
      {
        productId: 'up-2',
        productName: 'Apple iPhone 13 (Pre-Owned)',
        sku: 'USED-IPH13-128-MID',
        type: 'used',
        brand: 'Apple',
        storage: '128GB',
        color: 'Midnight',
        unitPrice: 36500,
        costPrice: 29500,
        quantity: 1,
        total: 36500,
        image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80'
      }
    ],
    subtotal: 36500,
    deliveryCharge: 0,
    discount: 0,
    totalAmount: 36500,
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Paid',
    fulfilmentStatus: 'Delivered',
    transactionId: 'TXN-S-003'
  },
  {
    id: 'ORD-2026-8804',
    customer: {
      fullName: 'Meera Nambiar',
      phone: '+91 98470 33219',
      email: 'meera.nambiar@gmail.com',
      address: '302, Palm Meadows, Kakkanad',
      city: 'Kochi',
      state: 'Kerala',
      pincode: '682030'
    },
    orderDate: '2026-08-29T17:10:00Z',
    items: [
      {
        productId: 'np-6',
        productName: 'Samsung Galaxy A56 5G',
        sku: 'SM-A56-128-LIL',
        type: 'new',
        brand: 'Samsung',
        storage: '128GB',
        color: 'Awesome Lilac',
        unitPrice: 34999,
        costPrice: 29500,
        quantity: 1,
        total: 34999,
        image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80'
      }
    ],
    subtotal: 34999,
    deliveryCharge: 0,
    discount: 0,
    totalAmount: 34999,
    paymentMethod: 'UPI (Demo)',
    paymentStatus: 'Paid',
    fulfilmentStatus: 'Delivered',
    transactionId: 'TXN-S-004'
  },
  {
    id: 'ORD-2026-8805',
    customer: {
      fullName: 'Tanvi Agarwal',
      phone: '+91 97200 44118',
      email: 'tanvi.agarwal@hotmail.com',
      address: 'A-45, Civil Lines',
      city: 'Jaipur',
      state: 'Rajasthan',
      pincode: '302006'
    },
    orderDate: '2026-09-03T14:30:00Z',
    items: [
      {
        productId: 'np-4',
        productName: 'Samsung Galaxy S25',
        sku: 'SM-S25-256-NVY',
        type: 'new',
        brand: 'Samsung',
        storage: '256GB',
        color: 'Navy Blue',
        unitPrice: 79999,
        costPrice: 67000,
        quantity: 1,
        total: 79999,
        image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=600&q=80'
      }
    ],
    subtotal: 79999,
    deliveryCharge: 0,
    discount: 0,
    totalAmount: 79999,
    paymentMethod: 'Online Payment (Demo)',
    paymentStatus: 'Paid',
    fulfilmentStatus: 'Delivered',
    transactionId: 'TXN-S-005'
  },
  {
    id: 'ORD-2026-8806',
    customer: {
      fullName: 'Aditya Sen',
      phone: '+91 98301 99882',
      email: 'aditya.sen@gmail.com',
      address: '77/2, Southern Avenue',
      city: 'Kolkata',
      state: 'West Bengal',
      pincode: '700029'
    },
    orderDate: '2026-09-12T16:00:00Z',
    items: [
      {
        productId: 'up-4',
        productName: 'OnePlus 11 5G (Pre-Owned)',
        sku: 'USED-OP11-128-TIT',
        type: 'used',
        brand: 'OnePlus',
        storage: '128GB',
        color: 'Titan Black',
        unitPrice: 29500,
        costPrice: 23500,
        quantity: 1,
        total: 29500,
        image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=600&q=80'
      }
    ],
    subtotal: 29500,
    deliveryCharge: 0,
    discount: 0,
    totalAmount: 29500,
    paymentMethod: 'UPI (Demo)',
    paymentStatus: 'Paid',
    fulfilmentStatus: 'Delivered',
    transactionId: 'TXN-S-006'
  },
  {
    id: 'ORD-2026-8807',
    customer: {
      fullName: 'Deepak Varma',
      phone: '+91 99104 22319',
      email: 'deepak.v@gmail.com',
      address: 'B-12, Green Park Main',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110016'
    },
    orderDate: '2026-09-21T18:25:00Z',
    items: [
      {
        productId: 'np-9',
        productName: 'Redmi Note 14 Pro+ 5G',
        sku: 'RED-N14PP-256-PUR',
        type: 'new',
        brand: 'Xiaomi',
        storage: '256GB',
        color: 'Mirage Purple',
        unitPrice: 28999,
        costPrice: 24200,
        quantity: 1,
        total: 28999,
        image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80'
      }
    ],
    subtotal: 28999,
    deliveryCharge: 0,
    discount: 0,
    totalAmount: 28999,
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Refunded',
    fulfilmentStatus: 'Cancelled', // Cancelled order - must NOT contribute to sales totals!
    transactionId: null
  },
  {
    id: 'ORD-2026-8808',
    customer: {
      fullName: 'Divya Nair',
      phone: '+91 94471 88201',
      email: 'divya.nair@outlook.com',
      address: 'Flat 5B, Skyline Imperial',
      city: 'Thiruvananthapuram',
      state: 'Kerala',
      pincode: '695001'
    },
    orderDate: '2026-09-28T12:40:00Z',
    items: [
      {
        productId: 'np-3',
        productName: 'Apple iPhone 15',
        sku: 'IPH15-128-BLU',
        type: 'new',
        brand: 'Apple',
        storage: '128GB',
        color: 'Blue',
        unitPrice: 59900,
        costPrice: 51200,
        quantity: 1,
        total: 59900,
        image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80'
      }
    ],
    subtotal: 59900,
    deliveryCharge: 0,
    discount: 0,
    totalAmount: 59900,
    paymentMethod: 'Online Payment (Demo)',
    paymentStatus: 'Paid',
    fulfilmentStatus: 'Delivered',
    transactionId: 'TXN-S-007'
  },
  {
    id: 'ORD-2026-8809',
    customer: {
      fullName: 'Gaurav Kulkarni',
      phone: '+91 98220 54312',
      email: 'gaurav.k@gmail.com',
      address: 'Plot 18, Kothrud',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411038'
    },
    orderDate: '2026-10-04T10:15:00Z',
    items: [
      {
        productId: 'up-1',
        productName: 'Apple iPhone 14 (Pre-Owned)',
        sku: 'USED-IPH14-128-BLU',
        type: 'used',
        brand: 'Apple',
        storage: '128GB',
        color: 'Blue',
        unitPrice: 42000,
        costPrice: 34000,
        quantity: 1,
        total: 42000,
        image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80'
      }
    ],
    subtotal: 42000,
    deliveryCharge: 0,
    discount: 0,
    totalAmount: 42000,
    paymentMethod: 'UPI (Demo)',
    paymentStatus: 'Paid',
    fulfilmentStatus: 'Delivered',
    transactionId: 'TXN-S-008'
  },
  {
    id: 'ORD-2026-8810',
    customer: {
      fullName: 'Shalini Reddy',
      phone: '+91 98490 66778',
      email: 'shalini.r@gmail.com',
      address: 'Villa 12, Jubilee Hills',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500033'
    },
    orderDate: '2026-10-11T13:50:00Z',
    items: [
      {
        productId: 'np-5',
        productName: 'Samsung Galaxy S25 Ultra',
        sku: 'SM-S25U-512-TI',
        type: 'new',
        brand: 'Samsung',
        storage: '512GB',
        color: 'Titanium Gray',
        unitPrice: 129999,
        costPrice: 112000,
        quantity: 1,
        total: 129999,
        image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80'
      }
    ],
    subtotal: 129999,
    deliveryCharge: 0,
    discount: 0,
    totalAmount: 129999,
    paymentMethod: 'Online Payment (Demo)',
    paymentStatus: 'Paid',
    fulfilmentStatus: 'Shipped', // Currently in transit
    transactionId: null // Not yet completed delivery
  }
];
