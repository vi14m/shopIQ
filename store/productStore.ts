import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Product, Budget } from "../types/product";
import { trendingProducts, recommendedProducts, dealProducts } from "../mocks/products";

interface ProductState {
  wishlist: Product[];
  trackedProducts: Product[];
  recentlyViewed: Product[];
  searchHistory: string[];
  budget: Budget;
  
  // Actions
  toggleWishlist: (productId: string) => void;
  toggleTracking: (productId: string) => void;
  toggleNotifications: (productId: string) => void;
  addToRecentlyViewed: (product: Product) => void;
  addToSearchHistory: (query: string) => void;
  clearSearchHistory: () => void;
  updateBudget: (budget: Partial<Budget>) => void;
}

// Helper function to find a product by ID across all product lists
const findProductById = (productId: string): Product | undefined => {
  const allProducts = [...trendingProducts, ...recommendedProducts, ...dealProducts];
  return allProducts.find(product => product.id === productId);
};

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      wishlist: [],
      trackedProducts: [],
      recentlyViewed: [],
      searchHistory: [],
      budget: {
        total: 1000,
        spent: 350,
        remaining: 650,
      },
      
      toggleWishlist: (productId: string) => {
        const { wishlist } = get();
        const isInWishlist = wishlist.some((product) => product.id === productId);
        
        if (isInWishlist) {
          set({
            wishlist: wishlist.filter((product) => product.id !== productId),
          });
        } else {
          const product = findProductById(productId);
          if (product) {
            set({
              wishlist: [...wishlist, { ...product, isInWishlist: true }],
            });
          }
        }
      },
      
      toggleTracking: (productId: string) => {
        const { trackedProducts } = get();
        const isTracked = trackedProducts.some((product) => product.id === productId);
        
        if (isTracked) {
          set({
            trackedProducts: trackedProducts.filter((product) => product.id !== productId),
          });
        } else {
          const product = findProductById(productId);
          if (product) {
            set({
              trackedProducts: [...trackedProducts, { ...product, isTracked: true }],
            });
          }
        }
      },
      
      toggleNotifications: (productId: string) => {
        // In a real app, this would toggle notification settings for a product
        console.log("Toggle notifications for product:", productId);
      },
      
      addToRecentlyViewed: (product: Product) => {
        const { recentlyViewed } = get();
        const isAlreadyViewed = recentlyViewed.some((p) => p.id === product.id);
        
        if (isAlreadyViewed) {
          set({
            recentlyViewed: [
              product,
              ...recentlyViewed.filter((p) => p.id !== product.id),
            ].slice(0, 10), // Keep only the 10 most recent
          });
        } else {
          set({
            recentlyViewed: [product, ...recentlyViewed].slice(0, 10),
          });
        }
      },
      
      addToSearchHistory: (query: string) => {
        const { searchHistory } = get();
        const normalizedQuery = query.trim().toLowerCase();
        
        if (normalizedQuery && !searchHistory.includes(normalizedQuery)) {
          set({
            searchHistory: [normalizedQuery, ...searchHistory].slice(0, 10),
          });
        }
      },
      
      clearSearchHistory: () => {
        set({ searchHistory: [] });
      },
      
      updateBudget: (budget: Partial<Budget>) => {
        const currentBudget = get().budget;
        const newBudget = { ...currentBudget, ...budget };
        
        // Recalculate remaining
        if (budget.total !== undefined || budget.spent !== undefined) {
          newBudget.remaining = newBudget.total - newBudget.spent;
        }
        
        set({ budget: newBudget });
      },
    }),
    {
      name: "shopiq-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);