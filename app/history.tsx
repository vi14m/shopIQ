import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  RefreshControl,
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { ChevronLeft, Clock, Search, Trash2 } from "lucide-react-native";
import { colors } from "../constants/colors";
import { typography } from "../constants/typography";
import { useProductStore } from "../store/productStore";

export default function HistoryScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("viewed");
  
  const recentlyViewed = useProductStore((state) => state.recentlyViewed);
  const searchHistory = useProductStore((state) => state.searchHistory);
  const clearSearchHistory = useProductStore((state) => state.clearSearchHistory);

  const handleBack = () => {
    router.back();
  };

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate a refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleProductPress = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  const handleSearchPress = (query: string) => {
    router.push({
      pathname: "/search",
      params: { query }
    });
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    // Less than a day
    if (diff < 24 * 60 * 60 * 1000) {
      const hours = Math.floor(diff / (60 * 60 * 1000));
      if (hours < 1) {
        const minutes = Math.floor(diff / (60 * 1000));
        return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
      }
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    }
    
    // Less than a week
    if (diff < 7 * 24 * 60 * 60 * 1000) {
      const days = Math.floor(diff / (24 * 60 * 60 * 1000));
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    }
    
    // Format as date
    return date.toLocaleDateString();
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Browsing History",
          headerLeft: () => (
            <TouchableOpacity onPress={handleBack} style={styles.headerButton}>
              <ChevronLeft size={24} color={colors.text} />
            </TouchableOpacity>
          ),
        }}
      />
      <SafeAreaView style={styles.container}>
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === "viewed" ? styles.activeTab : null,
            ]}
            onPress={() => setActiveTab("viewed")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "viewed" ? styles.activeTabText : null,
              ]}
            >
              Recently Viewed
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === "search" ? styles.activeTab : null,
            ]}
            onPress={() => setActiveTab("search")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "search" ? styles.activeTabText : null,
              ]}
            >
              Search History
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          contentContainerStyle={styles.scrollContent}
        >
          {activeTab === "viewed" && (
            <>
              {recentlyViewed.length === 0 ? (
                <View style={styles.emptyContainer}>
                  <View style={styles.emptyIconContainer}>
                    <Clock size={48} color={colors.textSecondary} />
                  </View>
                  <Text style={styles.emptyTitle}>No recently viewed products</Text>
                  <Text style={styles.emptyText}>
                    Products you view will appear here
                  </Text>
                </View>
              ) : (
                <>
                  <Text style={styles.sectionTitle}>Recently Viewed Products</Text>
                  {recentlyViewed.map((product) => (
                    <TouchableOpacity
                      key={product.id}
                      style={styles.productItem}
                      onPress={() => handleProductPress(product.id)}
                    >
                      <Image
                        source={{ uri: product.image }}
                        style={styles.productImage}
                      />
                      <View style={styles.productInfo}>
                        <Text style={styles.productName} numberOfLines={2}>
                          {product.name}
                        </Text>
                        <Text style={styles.productPrice}>
                          ${product.price.toFixed(2)}
                        </Text>
                        <View style={styles.productMeta}>
                          <Text style={styles.productStore}>{product.store}</Text>
                          <Text style={styles.productTime}>
                            {formatDate(new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000))}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </>
              )}
            </>
          )}

          {activeTab === "search" && (
            <>
              {searchHistory.length === 0 ? (
                <View style={styles.emptyContainer}>
                  <View style={styles.emptyIconContainer}>
                    <Search size={48} color={colors.textSecondary} />
                  </View>
                  <Text style={styles.emptyTitle}>No search history</Text>
                  <Text style={styles.emptyText}>
                    Your search history will appear here
                  </Text>
                </View>
              ) : (
                <>
                  <View style={styles.searchHeaderContainer}>
                    <Text style={styles.sectionTitle}>Search History</Text>
                    <TouchableOpacity onPress={clearSearchHistory}>
                      <Text style={styles.clearText}>Clear All</Text>
                    </TouchableOpacity>
                  </View>
                  {searchHistory.map((query, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.searchItem}
                      onPress={() => handleSearchPress(query)}
                    >
                      <View style={styles.searchIconContainer}>
                        <Clock size={20} color={colors.textSecondary} />
                      </View>
                      <Text style={styles.searchQuery}>{query}</Text>
                      <Text style={styles.searchTime}>
                        {formatDate(new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000))}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </>
              )}
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.card,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  tabsContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: "600",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 64,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.card,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  emptyTitle: {
    ...typography.h3,
    marginBottom: 8,
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: "center",
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: 16,
  },
  searchHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  clearText: {
    ...typography.body,
    color: colors.primary,
  },
  productItem: {
    flexDirection: "row",
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
  },
  productImage: {
    width: 100,
    height: 100,
  },
  productInfo: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  productName: {
    ...typography.body,
    fontWeight: "500",
    marginBottom: 4,
  },
  productPrice: {
    ...typography.body,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: 4,
  },
  productMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productStore: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  productTime: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  searchItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.card,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  searchQuery: {
    ...typography.body,
    flex: 1,
  },
  searchTime: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});