export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    rating: number;
    reviewCount: number;
    image: string;
    category: string;
    store: string;
    storeIcon?: string;
    isTracked?: boolean;
    isInWishlist?: boolean;
  }
  
  export interface PriceHistory {
    date: string;
    price: number;
  }
  
  export interface ProductDetail extends Product {
    features: string[];
    priceHistory: PriceHistory[];
    similarProducts: Product[];
    specifications: Record<string, string>;
  }
  
  export interface Store {
    id: string;
    name: string;
    icon: string;
    rating: number;
    productCount: number;
  }
  
  export interface Category {
    id: string;
    name: string;
    icon: string;
  }
  
  export interface Budget {
    total: number;
    spent: number;
    remaining: number;
  }