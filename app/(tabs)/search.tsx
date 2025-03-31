import React, { useState, useMemo } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Platform,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { X, Clock, Zap } from "lucide-react-native";
import { colors } from "../../constants/colors";
import { typography } from "../../constants/typography";
import { SearchBar } from "../../components/SearchBar";
import { ProductCard } from "../../components/ProductCard";
import { CategoryButton } from "../../components/CategoryButton";
import { useProductStore } from "../../store/productStore";
import { categories, trendingProducts, dealProducts } from "../../mocks/products";


export default function SearchScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const initialQuery = params.query as string || "";
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [isSearching, setIsSearching] = useState(false);
  
  const searchHistory = useProductStore((state) => state.searchHistory);
  const addToSearchHistory = useProductStore((state) => state.addToSearchHistory);
  const clearSearchHistory = useProductStore((state) => state.clearSearchHistory);
  const wishlist = useProductStore((state) => state.wishlist);
  const trackedProducts = useProductStore((state) => state.trackedProducts);

  // Memoize the combined products with status
  const productsWithStatus = useMemo(() => {
    const allProducts = [...trendingProducts, ...dealProducts];
    return allProducts.map(product => ({
      ...product,
      isInWishlist: wishlist.some(p => p.id === product.id),
      isTracked: trackedProducts.some(p => p.id === product.id)
    }));
  }, [wishlist, trackedProducts]);

  // Memoize search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    return productsWithStatus.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );
  }, [searchQuery, productsWithStatus]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      // Simulate search delay
      setTimeout(() => {
        addToSearchHistory(searchQuery);
        setIsSearching(false);
      }, 500);
    }
  };

  const handleSearchHistoryItem = (query: string) => {
    setSearchQuery(query);
  };

  const handleVoiceSearch = () => {
    // In a real app, this would trigger voice search
    console.log("Voice search");
  };

  const handleImageSearch = () => {
    // In a real app, this would trigger image search
    console.log("Image search");
  };

  const renderSearchContent = () => {
    if (searchQuery.trim() === "") {
      return (
        <>
          {/* Search History */}
          {searchHistory.length > 0 && (
            <View style={styles.searchHistoryContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recent Searches</Text>
                <TouchableOpacity onPress={clearSearchHistory}>
                  <Text style={styles.clearText}>Clear All</Text>
                </TouchableOpacity>
              </View>
              {searchHistory.map((query, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.searchHistoryItem}
                  onPress={() => handleSearchHistoryItem(query)}
                >
                  <Clock size={16} color={colors.textSecondary} />
                  <Text style={styles.searchHistoryText}>{query}</Text>
                  <X size={16} color={colors.textSecondary} />
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Popular Categories */}
          <View style={styles.categoriesContainer}>
            <Text style={styles.sectionTitle}>Popular Categories</Text>
            <View style={styles.categoriesGrid}>
              {categories.map((category) => (
                <CategoryButton
                  key={category.id}
                  name={category.name}
                  icon={category.icon}
                  onPress={() => setSearchQuery(category.name)}
                  style={styles.categoryButton}
                />
              ))}
            </View>
          </View>

          {/* Trending Searches */}
          <View style={styles.trendingContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Trending Searches</Text>
              <Zap size={16} color={colors.warning} />
            </View>
            <View style={styles.trendingTags}>
              {["Headphones", "Smart TV", "Laptop", "Coffee Maker", "Robot Vacuum", "Smartwatch"].map((tag, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.trendingTag}
                  onPress={() => setSearchQuery(tag)}
                >
                  <Text style={styles.trendingTagText}>{tag}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </>
      );
    }

    if (isSearching) {
      return (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Searching...</Text>
        </View>
      );
    }

    if (searchResults.length === 0) {
      return (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>No results found for "{searchQuery}"</Text>
          <Text style={styles.noResultsSubtext}>Try different keywords or check for typos</Text>
        </View>
      );
    }

    return (
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>
          {searchResults.length} results for "{searchQuery}"
        </Text>
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              style={styles.resultCard}
              size="small"
            />
          )}
          contentContainerStyle={styles.resultsGrid}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmit={handleSearch}
        onVoiceSearch={handleVoiceSearch}
        onImageSearch={handleImageSearch}
        style={styles.searchBar}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderSearchContent()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchBar: {
    paddingTop: Platform.OS === "android" ? 8 : 0,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  searchHistoryContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    ...typography.h3,
  },
  clearText: {
    ...typography.body,
    color: colors.primary,
  },
  searchHistoryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchHistoryText: {
    ...typography.body,
    flex: 1,
    marginLeft: 12,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  categoryButton: {
    marginBottom: 12,
    marginRight: 12,
  },
  trendingContainer: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  trendingTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  trendingTag: {
    backgroundColor: colors.card,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  trendingTagText: {
    ...typography.bodySmall,
    color: colors.text,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  loadingText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
    paddingHorizontal: 32,
  },
  noResultsText: {
    ...typography.h3,
    textAlign: "center",
    marginBottom: 8,
  },
  noResultsSubtext: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: "center",
  },
  resultsContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  resultsText: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  resultsGrid: {
    paddingBottom: 16,
  },
  resultCard: {
    flex: 1,
    marginHorizontal: 6,
    marginBottom: 16,
    maxWidth: "47%",
  },
});