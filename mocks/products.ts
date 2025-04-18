import { Product, ProductDetail } from "../types/product";

export const trendingProducts: Product[] = [
  {
    id: "1",
    name: "Sony WH-1000XM5 Wireless Headphones",
    description: "Industry-leading noise cancellation with premium sound quality",
    price: 349.99,
    originalPrice: 399.99,
    discount: 12,
    rating: 4.8,
    reviewCount: 1245,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "Electronics",
    store: "Amazon",
    storeIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Amazon_icon.svg/2500px-Amazon_icon.svg.png",
    isTracked: true,
  },
  {
    id: "2",
    name: "Apple iPad Air (5th Generation)",
    description: "10.9-inch Liquid Retina display with M1 chip",
    price: 599.00,
    rating: 4.9,
    reviewCount: 3421,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "Electronics",
    store: "Apple",
    storeIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png",
  },
  {
    id: "3",
    name: "Dyson V12 Detect Slim",
    description: "Cordless vacuum with laser dust detection",
    price: 649.99,
    originalPrice: 749.99,
    discount: 13,
    rating: 4.7,
    reviewCount: 876,
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "Home",
    store: "Best Buy",
    storeIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Best_Buy_Logo.svg/1280px-Best_Buy_Logo.svg.png",
    isInWishlist: true,
  },
  {
    id: "4",
    name: "Samsung 55\" OLED 4K Smart TV",
    description: "Brilliant OLED display with smart features",
    price: 1299.99,
    originalPrice: 1799.99,
    discount: 28,
    rating: 4.6,
    reviewCount: 542,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "Electronics",
    store: "Samsung",
    storeIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/2560px-Samsung_Logo.svg.png",
  },
  {
    id: "5",
    name: "Ninja Foodi Smart XL Indoor Grill",
    description: "6-in-1 indoor grill with smart cooking system",
    price: 249.99,
    originalPrice: 329.99,
    discount: 24,
    rating: 4.7,
    reviewCount: 1876,
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "Kitchen",
    store: "Target",
    storeIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Target_Corporation_logo_%28vector%29.svg/1200px-Target_Corporation_logo_%28vector%29.svg.png",
    isTracked: true,
    isInWishlist: true,
  },
];

export const recommendedProducts: Product[] = [
  {
    id: "6",
    name: "Bose QuietComfort Earbuds II",
    description: "Wireless noise cancelling earbuds with high-fidelity audio",
    price: 279.99,
    originalPrice: 299.99,
    discount: 7,
    rating: 4.6,
    reviewCount: 892,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "Electronics",
    store: "Bose",
    storeIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Bose_logo.svg/2560px-Bose_logo.svg.png",
  },
  {
    id: "7",
    name: "Philips Hue Smart Lighting Starter Kit",
    description: "Color-changing smart bulbs with bridge",
    price: 179.99,
    rating: 4.5,
    reviewCount: 1243,
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "Smart Home",
    store: "Philips",
    storeIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Philips_logo_new.svg/2560px-Philips_logo_new.svg.png",
  },
  {
    id: "8",
    name: "KitchenAid Stand Mixer",
    description: "Professional 5-quart stand mixer",
    price: 399.99,
    originalPrice: 449.99,
    discount: 11,
    rating: 4.9,
    reviewCount: 3567,
    image: "https://images.unsplash.com/photo-1594222082000-24ea0013ae6a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "Kitchen",
    store: "Williams Sonoma",
    storeIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Williams-Sonoma_Logo.svg/2560px-Williams-Sonoma_Logo.svg.png",
  },
  {
    id: "9",
    name: "Fitbit Sense 2 Advanced Smartwatch",
    description: "Health and fitness tracking with ECG app",
    price: 249.95,
    originalPrice: 299.95,
    discount: 17,
    rating: 4.4,
    reviewCount: 1122,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "Wearables",
    store: "Fitbit",
    storeIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Fitbit_logo.svg/2560px-Fitbit_logo.svg.png",
  },
  {
    id: "10",
    name: "Nespresso Vertuo Next Coffee Machine",
    description: "Single-serve coffee and espresso maker",
    price: 159.99,
    originalPrice: 199.99,
    discount: 20,
    rating: 4.7,
    reviewCount: 2341,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "Kitchen",
    store: "Nespresso",
    storeIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Nespresso-logo.svg/2560px-Nespresso-logo.svg.png",
  },
];

export const dealProducts: Product[] = [
  {
    id: "11",
    name: "Instant Pot Duo Plus 9-in-1",
    description: "Multi-use programmable pressure cooker",
    price: 89.99,
    originalPrice: 149.99,
    discount: 40,
    rating: 4.8,
    reviewCount: 5678,
    image: "https://images.unsplash.com/photo-1593759608142-e976b59a9f49?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "Kitchen",
    store: "Amazon",
    storeIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Amazon_icon.svg/2500px-Amazon_icon.svg.png",
  },
  {
    id: "12",
    name: "Logitech MX Master 3S Mouse",
    description: "Advanced wireless mouse for productivity",
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    rating: 4.7,
    reviewCount: 1432,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "Electronics",
    store: "Logitech",
    storeIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Logitech_logo.svg/2560px-Logitech_logo.svg.png",
  },
  {
    id: "13",
    name: "Roomba i7+ Robot Vacuum",
    description: "Self-emptying robot vacuum with smart mapping",
    price: 599.99,
    originalPrice: 899.99,
    discount: 33,
    rating: 4.6,
    reviewCount: 2187,
    image: "https://images.unsplash.com/photo-1589454194905-79c3f3f39643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "Home",
    store: "iRobot",
    storeIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/IRobot_logo.svg/2560px-IRobot_logo.svg.png",
  },
];

export const productDetails: Record<string, ProductDetail> = {
  "1": {
    id: "1",
    name: "Sony WH-1000XM5 Wireless Headphones",
    description: "Industry-leading noise cancellation with premium sound quality. The WH-1000XM5 headphones feature two processors controlling eight microphones for unprecedented noise cancellation, especially for high-frequency noise. With the specially designed 30mm driver unit, these headphones deliver authentic sound with enhanced clarity.",
    price: 349.99,
    originalPrice: 399.99,
    discount: 12,
    rating: 4.8,
    reviewCount: 1245,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "Electronics",
    store: "Amazon",
    storeIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Amazon_icon.svg/2500px-Amazon_icon.svg.png",
    isTracked: true,
    features: [
      "Industry-leading noise cancellation",
      "30-hour battery life with quick charging",
      "Crystal clear hands-free calling",
      "Multipoint connection for simultaneous pairing",
      "Adaptive Sound Control adjusts to your environment",
      "Touch controls for easy operation"
    ],
    priceHistory: [
      { date: "2023-01-01", price: 399.99 },
      { date: "2023-02-01", price: 399.99 },
      { date: "2023-03-01", price: 379.99 },
      { date: "2023-04-01", price: 379.99 },
      { date: "2023-05-01", price: 349.99 },
      { date: "2023-06-01", price: 349.99 }
    ],
    similarProducts: [
      {
        id: "6",
        name: "Bose QuietComfort Earbuds II",
        description: "Wireless noise cancelling earbuds with high-fidelity audio",
        price: 279.99,
        originalPrice: 299.99,
        discount: 7,
        rating: 4.6,
        reviewCount: 892,
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        category: "Electronics",
        store: "Bose",
        storeIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Bose_logo.svg/2560px-Bose_logo.svg.png",
      },
      {
        id: "14",
        name: "Apple AirPods Pro (2nd Generation)",
        description: "Active noise cancellation with transparency mode",
        price: 249.00,
        rating: 4.7,
        reviewCount: 3421,
        image: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        category: "Electronics",
        store: "Apple",
        storeIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png",
      }
    ],
    specifications: {
      "Brand": "Sony",
      "Model": "WH-1000XM5",
      "Color": "Black",
      "Battery Life": "30 hours",
      "Charging Time": "3.5 hours",
      "Quick Charge": "3 hours playback with 3 minutes charge",
      "Bluetooth Version": "5.2",
      "Weight": "250g",
      "Frequency Response": "4Hz-40,000Hz",
      "Driver Size": "30mm"
    }
  },
  "2": {
    id: "2",
    name: "Apple iPad Air (5th Generation)",
    description: "The Apple iPad Air (5th Generation) features a stunning 10.9-inch Liquid Retina display with True Tone and P3 wide color. Powered by the breakthrough M1 chip, it delivers incredible performance for demanding tasks like editing 4K videos, designing detailed illustrations, and playing immersive games. The device includes a 12MP Ultra Wide front camera with Center Stage for more engaging video calls.",
    price: 599.00,
    rating: 4.9,
    reviewCount: 3421,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "Electronics",
    store: "Apple",
    storeIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png",
    features: [
      "10.9-inch Liquid Retina display with True Tone",
      "Apple M1 chip for next-level performance",
      "12MP Ultra Wide front camera with Center Stage",
      "USB-C connector for faster transfers",
      "Touch ID for secure authentication",
      "All-day battery life"
    ],
    priceHistory: [
      { date: "2023-01-01", price: 599.00 },
      { date: "2023-02-01", price: 599.00 },
      { date: "2023-03-01", price: 599.00 },
      { date: "2023-04-01", price: 579.00 },
      { date: "2023-05-01", price: 599.00 },
      { date: "2023-06-01", price: 599.00 }
    ],
    similarProducts: [
      {
        id: "15",
        name: "Samsung Galaxy Tab S8",
        description: "Premium Android tablet with S Pen included",
        price: 699.99,
        rating: 4.7,
        reviewCount: 1876,
        image: "https://images.unsplash.com/photo-1589739900243-4b52cd9dd8df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        category: "Electronics",
        store: "Samsung",
        storeIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/2560px-Samsung_Logo.svg.png",
      }
    ],
    specifications: {
      "Brand": "Apple",
      "Model": "iPad Air (5th Generation)",
      "Display": "10.9-inch Liquid Retina",
      "Processor": "Apple M1 chip",
      "Storage": "64GB/256GB",
      "Camera": "12MP Wide rear, 12MP Ultra Wide front",
      "Battery Life": "Up to 10 hours",
      "Connectivity": "Wi-Fi 6, Optional 5G",
      "Dimensions": "9.74 x 7.02 x 0.24 inches",
      "Weight": "1.02 pounds"
    }
  },
  "3": {
    id: "3",
    name: "Dyson V12 Detect Slim",
    description: "The Dyson V12 Detect Slim cordless vacuum features a precisely-angled laser that makes invisible dust visible on hard floors, an LCD screen that displays scientific proof of a deep clean, and intelligent power optimization that senses and adapts to different floor types.",
    price: 649.99,
    originalPrice: 749.99,
    discount: 13,
    rating: 4.7,
    reviewCount: 876,
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "Home",
    store: "Best Buy",
    storeIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Best_Buy_Logo.svg/1280px-Best_Buy_Logo.svg.png",
    isInWishlist: true,
    features: [
      "Laser dust detection reveals invisible dust on hard floors",
      "Piezo sensor counts and sizes dust particles for scientific proof of a deep clean",
      "Intelligent power optimization adapts to floor type",
      "Up to 60 minutes of fade-free power",
      "Whole-machine HEPA filtration traps 99.99% of particles",
      "Converts to handheld for cleaning cars, stairs, and furniture"
    ],
    priceHistory: [
      { date: "2023-01-01", price: 749.99 },
      { date: "2023-02-01", price: 749.99 },
      { date: "2023-03-01", price: 699.99 },
      { date: "2023-04-01", price: 699.99 },
      { date: "2023-05-01", price: 649.99 },
      { date: "2023-06-01", price: 649.99 }
    ],
    similarProducts: [
      {
        id: "13",
        name: "Roomba i7+ Robot Vacuum",
        description: "Self-emptying robot vacuum with smart mapping",
        price: 599.99,
        originalPrice: 899.99,
        discount: 33,
        rating: 4.6,
        reviewCount: 2187,
        image: "https://images.unsplash.com/photo-1589454194905-79c3f3f39643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        category: "Home",
        store: "iRobot",
        storeIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/IRobot_logo.svg/2560px-IRobot_logo.svg.png",
      },
      {
        id: "15",
        name: "Shark Vertex Pro Lightweight Cordless Vacuum",
        description: "Powerful suction with self-cleaning brushroll",
        price: 399.99,
        originalPrice: 449.99,
        discount: 11,
        rating: 4.5,
        reviewCount: 1243,
        image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        category: "Home",
        store: "Shark",
        storeIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Shark_logo.svg/2560px-Shark_logo.svg.png",
      }
    ],
    specifications: {
      "Brand": "Dyson",
      "Model": "V12 Detect Slim",
      "Color": "Yellow/Nickel",
      "Battery Life": "60 minutes",
      "Charging Time": "4.5 hours",
      "Bin Volume": "0.35L",
      "Weight": "5.2 lbs",
      "Dimensions": "49.6 x 9.8 x 10.3 inches",
      "Filter Type": "HEPA",
      "Warranty": "2 years"
    }
  },
  "4": {
    id: "4",
    name: "Samsung 55\" OLED 4K Smart TV",
    description: "Experience breathtaking picture quality with the Samsung 55\" OLED 4K Smart TV. This premium television delivers perfect blacks, vibrant colors, and incredible contrast thanks to its self-illuminating OLED pixels. The Neural Quantum Processor 4K uses AI to upscale content to 4K resolution, while the Dolby Atmos sound system provides immersive audio from all directions.",
    price: 1299.99,
    originalPrice: 1799.99,
    discount: 28,
    rating: 4.6,
    reviewCount: 542,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "Electronics",
    store: "Samsung",
    storeIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/2560px-Samsung_Logo.svg.png",
    features: [
      "OLED display with self-illuminating pixels for perfect blacks",
      "Neural Quantum Processor 4K for intelligent upscaling",
      "Dolby Atmos and Object Tracking Sound for immersive audio",
      "Gaming Hub with cloud gaming services built-in",
      "Ultra-thin design with minimal bezels",
      "SmartThings integration for smart home control"
    ],
    priceHistory: [
      { date: "2023-01-01", price: 1799.99 },
      { date: "2023-02-01", price: 1699.99 },
      { date: "2023-03-01", price: 1599.99 },
      { date: "2023-04-01", price: 1499.99 },
      { date: "2023-05-01", price: 1399.99 },
      { date: "2023-06-01", price: 1299.99 }
    ],
    similarProducts: [
      {
        id: "16",
        name: "LG C2 55\" OLED evo 4K TV",
        description: "Award-winning OLED TV with perfect blacks",
        price: 1296.99,
        originalPrice: 1799.99,
        discount: 28,
        rating: 4.8,
        reviewCount: 1243,
        image: "https://images.unsplash.com/photo-1509281373149-e957c6296406?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        category: "Electronics",
        store: "LG",
        storeIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/LG_symbol.svg/2048px-LG_symbol.svg.png",
      }
    ],
    specifications: {
      "Brand": "Samsung",
      "Model": "S95B",
      "Display": "55\" OLED 4K",
      "Resolution": "3840 x 2160",
      "HDR": "HDR10+, HLG",
      "Refresh Rate": "120Hz",
      "Smart Platform": "Tizen",
      "Voice Assistants": "Bixby, Alexa, Google Assistant",
      "HDMI Ports": "4 (HDMI 2.1)",
      "Audio": "2.2.2 channel, 60W"
    }
  },
  "5": {
    id: "5",
    name: "Ninja Foodi Smart XL Indoor Grill",
    description: "The Ninja Foodi Smart XL Indoor Grill combines 6 cooking functions in one powerful appliance. It grills, air fries, roasts, bakes, broils, and dehydrates, giving you incredible versatility in your kitchen. The Smart Cook System with Foodi Smart Thermometer lets you achieve perfect doneness from rare to well with the touch of a button, while the XL capacity fits up to 6 steaks or 24 hot dogs.",
    price: 249.99,
    originalPrice: 329.99,
    discount: 24,
    rating: 4.7,
    reviewCount: 1876,
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "Kitchen",
    store: "Target",
    storeIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Target_Corporation_logo_%28vector%29.svg/1200px-Target_Corporation_logo_%28vector%29.svg.png",
    isTracked: true,
    isInWishlist: true,
    features: [
      "6-in-1 indoor grill: grill, air fry, roast, bake, broil, dehydrate",
      "Smart Cook System with Foodi Smart Thermometer",
      "XL capacity fits up to 6 steaks or 24 hot dogs",
      "Cyclonic Grilling Technology for perfect char-grilled results",
      "500°F cyclonic air and 500°F grill plate",
      "Easy to clean with dishwasher-safe parts"
    ],
    priceHistory: [
      { date: "2023-01-01", price: 329.99 },
      { date: "2023-02-01", price: 329.99 },
      { date: "2023-03-01", price: 299.99 },
      { date: "2023-04-01", price: 279.99 },
      { date: "2023-05-01", price: 249.99 },
      { date: "2023-06-01", price: 249.99 }
    ],
    similarProducts: [
      {
        id: "11",
        name: "Instant Pot Duo Plus 9-in-1",
        description: "Multi-use programmable pressure cooker",
        price: 89.99,
        originalPrice: 149.99,
        discount: 40,
        rating: 4.8,
        reviewCount: 5678,
        image: "https://images.unsplash.com/photo-1593759608142-e976b59a9f49?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        category: "Kitchen",
        store: "Amazon",
        storeIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Amazon_icon.svg/2500px-Amazon_icon.svg.png",
      }
    ],
    specifications: {
      "Brand": "Ninja",
      "Model": "FG551",
      "Color": "Black/Silver",
      "Capacity": "XL (up to 6 steaks)",
      "Power": "1760 watts",
      "Temperature Range": "105°F–500°F",
      "Dimensions": "15.75 x 16.54 x 11.1 inches",
      "Weight": "22.44 pounds",
      "Warranty": "1 year limited",
      "Dishwasher Safe Parts": "Yes"
    }
  },
  "6": {
    id: "6",
    name: "Bose QuietComfort Earbuds II",
    description: "Bose QuietComfort Earbuds II are the world's best noise cancelling earbuds. They intelligently personalize the noise cancellation and sound performance to your ears, giving you a listening experience unlike any other. These wireless earbuds feature CustomTune technology that calibrates both noise cancellation and sound to the unique shape of your ears.",
    price: 279.99,
    originalPrice: 299.99,
    discount: 7,
    rating: 4.6,
    reviewCount: 892,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "Electronics",
    store: "Bose",
    storeIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Bose_logo.svg/2560px-Bose_logo.svg.png",
    features: [
      "World's best noise cancellation with CustomTune technology",
      "Personalized sound that's tuned to your ears",
      "Up to 6 hours of battery life, 24 hours with charging case",
      "Comfortable and secure fit with stability bands",
      "Simple touch controls for music and calls",
      "IPX4 water resistance for protection against sweat and weather"
    ],
    priceHistory: [
      { date: "2023-01-01", price: 299.99 },
      { date: "2023-02-01", price: 299.99 },
      { date: "2023-03-01", price: 299.99 },
      { date: "2023-04-01", price: 279.99 },
      { date: "2023-05-01", price: 279.99 },
      { date: "2023-06-01", price: 279.99 }
    ],
    similarProducts: [
      {
        id: "1",
        name: "Sony WH-1000XM5 Wireless Headphones",
        description: "Industry-leading noise cancellation with premium sound quality",
        price: 349.99,
        originalPrice: 399.99,
        discount: 12,
        rating: 4.8,
        reviewCount: 1245,
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        category: "Electronics",
        store: "Amazon",
        storeIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Amazon_icon.svg/2500px-Amazon_icon.svg.png",
      },
      {
        id: "14",
        name: "Apple AirPods Pro (2nd Generation)",
        description: "Active noise cancellation with transparency mode",
        price: 249.00,
        rating: 4.7,
        reviewCount: 3421,
        image: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        category: "Electronics",
        store: "Apple",
        storeIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png",
      }
    ],
    specifications: {
      "Brand": "Bose",
      "Model": "QuietComfort Earbuds II",
      "Color": "Triple Black",
      "Battery Life": "6 hours (24 with case)",
      "Charging Time": "1 hour for earbuds, 3 hours for case",
      "Quick Charge": "2 hours playback with 20 minutes charge",
      "Bluetooth Version": "5.3",
      "Water Resistance": "IPX4",
      "Ear Tip Sizes": "S, M, L",
      "Weight": "6.2g per earbud"
    }
  },
  "11": {
    id: "11",
    name: "Instant Pot Duo Plus 9-in-1",
    description: "The Instant Pot Duo Plus is a 9-in-1 programmable pressure cooker that replaces multiple kitchen appliances. It functions as a pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker, warmer, sterilizer, and cake maker. With 15 customizable programs, you can prepare your favorite dishes with the press of a button, while the advanced microprocessor monitors pressure, temperature, and time for consistent results.",
    price: 89.99,
    originalPrice: 149.99,
    discount: 40,
    rating: 4.8,
    reviewCount: 5678,
    image: "https://images.unsplash.com/photo-1593759608142-e976b59a9f49?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "Kitchen",
    store: "Amazon",
    storeIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Amazon_icon.svg/2500px-Amazon_icon.svg.png",
    features: [
      "9-in-1 functionality: pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker, warmer, sterilizer, and cake maker",
      "15 customizable smart programs for easy one-touch cooking",
      "Up to 70% faster cooking than traditional methods",
      "Easy-seal lid automatically seals for pressure cooking",
      "10+ built-in safety features including overheat protection",
      "Stainless steel inner pot with tri-ply bottom for even cooking"
    ],
    priceHistory: [
      { date: "2023-01-01", price: 149.99 },
      { date: "2023-02-01", price: 129.99 },
      { date: "2023-03-01", price: 119.99 },
      { date: "2023-04-01", price: 99.99 },
      { date: "2023-05-01", price: 89.99 },
      { date: "2023-06-01", price: 89.99 }
    ],
    similarProducts: [
      {
        id: "5",
        name: "Ninja Foodi Smart XL Indoor Grill",
        description: "6-in-1 indoor grill with smart cooking system",
        price: 249.99,
        originalPrice: 329.99,
        discount: 24,
        rating: 4.7,
        reviewCount: 1876,
        image: "https://images.unsplash.com/photo-1585515320310-259814833e62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        category: "Kitchen",
        store: "Target",
        storeIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Target_Corporation_logo_%28vector%29.svg/1200px-Target_Corporation_logo_%28vector%29.svg.png",
      }
    ],
    specifications: {
      "Brand": "Instant Pot",
      "Model": "Duo Plus 9-in-1",
      "Capacity": "6 Quart",
      "Power": "1000 watts",
      "Dimensions": "13.39 x 12.21 x 12.48 inches",
      "Weight": "11.5 pounds",
      "Material": "Stainless Steel",
      "Display": "Blue LCD",
      "Programs": "15 smart programs",
      "Warranty": "1 year limited"
    }
  }
};

export const categories: { id: string; name: string; icon: string }[] = [
  { id: "1", name: "Electronics", icon: "Tv" },
  { id: "2", name: "Home", icon: "Home" },
  { id: "3", name: "Kitchen", icon: "Utensils" },
  { id: "4", name: "Smart Home", icon: "Lightbulb" },
  { id: "5", name: "Wearables", icon: "Watch" },
  { id: "6", name: "Computers", icon: "Laptop" },
  { id: "7", name: "Audio", icon: "Headphones" },
  { id: "8", name: "Gaming", icon: "Gamepad2" },
];

export const stores: { id: string; name: string; icon: string }[] = [
  { id: "1", name: "Amazon", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Amazon_icon.svg/2500px-Amazon_icon.svg.png" },
  { id: "2", name: "Best Buy", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Best_Buy_Logo.svg/1280px-Best_Buy_Logo.svg.png" },
  { id: "3", name: "Walmart", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Walmart_logo.svg/2560px-Walmart_logo.svg.png" },
  { id: "4", name: "Target", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Target_Corporation_logo_%28vector%29.svg/1200px-Target_Corporation_logo_%28vector%29.svg.png" },
  { id: "5", name: "Apple", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png" },
];