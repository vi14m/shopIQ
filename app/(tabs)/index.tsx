// import React, { useState, useMemo } from "react";
// import {
//   StyleSheet,
//   View,
//   Text,
//   ScrollView,
//   FlatList,
//   TouchableOpacity,
//   SafeAreaView,
//   RefreshControl,
// } from "react-native";
// import { useRouter } from "expo-router";
// import { Bell, Search, Zap } from "lucide-react-native";
// import { colors } from "../../constants/colors";
// import { typography } from "../../constants/typography";
// import { ProductCard } from "../../components/ProductCard";
// import { CategoryButton } from "../../components/CategoryButton";
// import { useProductStore } from "../../store/productStore";
// import { categories, trendingProducts, recommendedProducts, dealProducts } from "../../mocks/products";

// export default function DiscoverScreen() {
//   const router = useRouter();
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//   const [refreshing, setRefreshing] = useState(false);
  
//   // Get wishlist and tracked products from store
//   const wishlist = useProductStore(state => state.wishlist);
//   const trackedProducts = useProductStore(state => state.trackedProducts);
  
//   // Memoize products with wishlist and tracking status
//   const productsWithStatus = useMemo(() => {
//     // Helper function to add status to products
//     const addStatus = (products: any[]) => {
//       return products.map((product) => ({
//         ...product,
//         isInWishlist: wishlist.some(p => p.id === product.id),
//         isTracked: trackedProducts.some(p => p.id === product.id),
//       }));
//     };
    
//     return {
//       trending: addStatus(trendingProducts),
//       recommended: addStatus(recommendedProducts),
//       deals: addStatus(dealProducts)
//     };
//   }, [wishlist, trackedProducts]);
  
//   // Memoize filtered products if we have a selected category
//   const filteredProducts = useMemo(() => {
//     if (!selectedCategory) return productsWithStatus;
    
//     return {
//       trending: productsWithStatus.trending.filter((product: { category: string; }) => product.category === selectedCategory),
//       recommended: productsWithStatus.recommended.filter((product: { category: string; }) => product.category === selectedCategory),
//       deals: productsWithStatus.deals.filter((product: { category: string; }) => product.category === selectedCategory)
//     };
//   }, [productsWithStatus, selectedCategory]);

//   const handleCategoryPress = (categoryId: string) => {
//     if (selectedCategory === categoryId) {
//       setSelectedCategory(null);
//     } else {
//       setSelectedCategory(categoryId);
//     }
//   };

//   const handleSearch = () => {
//     router.push("/search");
//   };

//   const handleNotifications = () => {
//     // In a real app, this would navigate to notifications
//     console.log("Navigate to notifications");
//   };

//   const handleRefresh = () => {
//     setRefreshing(true);
//     // Simulate a refresh
//     setTimeout(() => {
//       setRefreshing(false);
//     }, 1500);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
//         }
//       >
//         {/* Header */}
//         <View style={styles.header}>
//           <View>
//             <Text style={styles.greeting}>Hello there 👋</Text>
//             <Text style={styles.subtitle}>Find the best deals today</Text>
//           </View>
//           <View style={styles.headerActions}>
//             <TouchableOpacity
//               style={styles.iconButton}
//               onPress={handleSearch}
//             >
//               <Search size={24} color={colors.text} />
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.iconButton}
//               onPress={handleNotifications}
//             >
//               <Bell size={24} color={colors.text} />
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Categories */}
//         <View style={styles.categoriesContainer}>
//           <Text style={styles.sectionTitle}>Categories</Text>
//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={styles.categoriesScrollContent}
//           >
//             {categories.map((category) => (
//               <CategoryButton
//                 key={category.id}
//                 name={category.name}
//                 icon={category.icon}
//                 isSelected={selectedCategory === category.id}
//                 onPress={() => handleCategoryPress(category.id)}
//               />
//             ))}
//           </ScrollView>
//         </View>

//         {/* Trending Products */}
//         {filteredProducts.trending.length > 0 && (
//           <View style={styles.productsSection}>
//             <View style={styles.sectionHeader}>
//               <Text style={styles.sectionTitle}>Trending Now</Text>
//               <TouchableOpacity>
//                 <Text style={styles.seeAllText}>See All</Text>
//               </TouchableOpacity>
//             </View>
//             <FlatList
//               data={filteredProducts.trending}
//               keyExtractor={(item) => item.id}
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               contentContainerStyle={styles.productsList}
//               renderItem={({ item }) => (
//                 <ProductCard product={item} style={styles.productCard} />
//               )}
//             />
//           </View>
//         )}

//         {/* Deal of the Day */}
//         {filteredProducts.deals.length > 0 && (
//           <View style={styles.dealSection}>
//             <View style={styles.sectionHeader}>
//               <Text style={styles.sectionTitle}>Deal of the Day</Text>
//               <Zap size={20} color={colors.warning} />
//             </View>
//             <ProductCard
//               product={filteredProducts.deals[0]}
//               size="large"
//               style={styles.dealCard}
//             />
//           </View>
//         )}

//         {/* Recommended Products */}
//         {filteredProducts.recommended.length > 0 && (
//           <View style={styles.productsSection}>
//             <View style={styles.sectionHeader}>
//               <Text style={styles.sectionTitle}>Recommended for You</Text>
//               <TouchableOpacity>
//                 <Text style={styles.seeAllText}>See All</Text>
//               </TouchableOpacity>
//             </View>
//             <FlatList
//               data={filteredProducts.recommended}
//               keyExtractor={(item) => item.id}
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               contentContainerStyle={styles.productsList}
//               renderItem={({ item }) => (
//                 <ProductCard product={item} style={styles.productCard} />
//               )}
//             />
//           </View>
//         )}

//         {/* Best Deals */}
//         {filteredProducts.deals.length > 0 && (
//           <View style={[styles.productsSection, { marginBottom: 24 }]}>
//             <View style={styles.sectionHeader}>
//               <Text style={styles.sectionTitle}>Best Deals</Text>
//               <TouchableOpacity>
//                 <Text style={styles.seeAllText}>See All</Text>
//               </TouchableOpacity>
//             </View>
//             <FlatList
//               data={filteredProducts.deals}
//               keyExtractor={(item) => item.id}
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               contentContainerStyle={styles.productsList}
//               renderItem={({ item }) => (
//                 <ProductCard product={item} style={styles.productCard} />
//               )}
//             />
//           </View>
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background,
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingTop: 16,
//     paddingBottom: 8,
//   },
//   greeting: {
//     ...typography.h2,
//     marginBottom: 4,
//   },
//   subtitle: {
//     ...typography.body,
//     color: colors.textSecondary,
//   },
//   headerActions: {
//     flexDirection: "row",
//   },
//   iconButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: colors.card,
//     justifyContent: "center",
//     alignItems: "center",
//     marginLeft: 8,
//   },
//   categoriesContainer: {
//     marginTop: 16,
//     paddingHorizontal: 16,
//   },
//   categoriesScrollContent: {
//     paddingVertical: 12,
//   },
//   sectionTitle: {
//     ...typography.h3,
//     marginBottom: 12,
//   },
//   productsSection: {
//     marginTop: 24,
//     paddingHorizontal: 16,
//   },
//   sectionHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 12,
//   },
//   seeAllText: {
//     ...typography.body,
//     color: colors.primary,
//     fontWeight: "600",
//   },
//   productsList: {
//     paddingBottom: 8,
//   },
//   productCard: {
//     marginRight: 12,
//   },
//   dealSection: {
//     marginTop: 24,
//     paddingHorizontal: 16,
//   },
//   dealCard: {
//     marginBottom: 8,
//   },});

import React, { useState, useMemo } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import { useRouter } from "expo-router";
import { Bell, Search, Zap } from "lucide-react-native";
import { colors } from "../../constants/colors";
import { typography } from "../../constants/typography";
import { ProductCard } from "../../components/ProductCard";
import { CategoryButton } from "../../components/CategoryButton";
import { useProductStore } from "../../store/productStore";
import { categories, trendingProducts, recommendedProducts, dealProducts } from "../../mocks/products";
import { Product } from "../../types/product";

export default function DiscoverScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  
  // Get wishlist and tracked products from store
  const wishlist = useProductStore(state => state.wishlist);
  const trackedProducts = useProductStore(state => state.trackedProducts);
  
  // Memoize products with wishlist and tracking status
  const productsWithStatus = useMemo(() => {
    // Helper function to add status to products
    const addStatus = (products: Product[]) => {
      return products.map((product: Product) => ({
        ...product,
        isInWishlist: wishlist.some(p => p.id === product.id),
        isTracked: trackedProducts.some(p => p.id === product.id)
      }));
    };
    
    return {
      trending: addStatus(trendingProducts),
      recommended: addStatus(recommendedProducts),
      deals: addStatus(dealProducts)
    };
  }, [wishlist, trackedProducts]);
  
  // Memoize filtered products if we have a selected category
  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return productsWithStatus;
    
    return {
      trending: productsWithStatus.trending.filter((product: Product) => product.category === selectedCategory),
      recommended: productsWithStatus.recommended.filter((product: Product) => product.category === selectedCategory),
      deals: productsWithStatus.deals.filter((product: Product) => product.category === selectedCategory)
    };
  }, [productsWithStatus, selectedCategory]);

  const handleCategoryPress = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryId);
    }
  };

  const handleSearch = () => {
    router.push("/search");
  };

  const handleNotifications = () => {
    // In a real app, this would navigate to notifications
    console.log("Navigate to notifications");
  };

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate a refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello there 👋</Text>
            <Text style={styles.subtitle}>Find the best deals today</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={handleSearch}
            >
              <Search size={24} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={handleNotifications}
            >
              <Bell size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScrollContent}
          >
            {categories.map((category) => (
              <CategoryButton
                key={category.id}
                name={category.name}
                icon={category.icon}
                isSelected={selectedCategory === category.id}
                onPress={() => handleCategoryPress(category.id)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Trending Products */}
        {filteredProducts.trending.length > 0 && (
          <View style={styles.productsSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Trending Now</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={filteredProducts.trending}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.productsList}
              renderItem={({ item }) => (
                <ProductCard product={item} style={styles.productCard} />
              )}
            />
          </View>
        )}

        {/* Deal of the Day */}
        {filteredProducts.deals.length > 0 && (
          <View style={styles.dealSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Deal of the Day</Text>
              <Zap size={20} color={colors.warning} />
            </View>
            <ProductCard
              product={filteredProducts.deals[0]}
              size="large"
              style={styles.dealCard}
            />
          </View>
        )}

        {/* Recommended Products */}
        {filteredProducts.recommended.length > 0 && (
          <View style={styles.productsSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recommended for You</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={filteredProducts.recommended}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.productsList}
              renderItem={({ item }) => (
                <ProductCard product={item} style={styles.productCard} />
              )}
            />
          </View>
        )}

        {/* Best Deals */}
        {filteredProducts.deals.length > 0 && (
          <View style={[styles.productsSection, { marginBottom: 24 }]}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Best Deals</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={filteredProducts.deals}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.productsList}
              renderItem={({ item }) => (
                <ProductCard product={item} style={styles.productCard} />
              )}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  greeting: {
    ...typography.h2,
    marginBottom: 4,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
  },
  headerActions: {
    flexDirection: "row",
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.card,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  categoriesContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  categoriesScrollContent: {
    paddingVertical: 12,
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: 12,
  },
  productsSection: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  seeAllText: {
    ...typography.body,
    color: colors.primary,
    fontWeight: "600",
  },
  productsList: {
    paddingBottom: 8,
  },
  productCard: {
    marginRight: 12,
  },
  dealSection: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  dealCard: {
    marginBottom: 8,
  },
});