import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import { useRouter } from "expo-router";
import { Plus, BellOff, Settings } from "lucide-react-native";
import { colors } from "../../constants/colors";
import { typography } from "../../constants/typography";
import { TrackedProductItem } from "../../components/TrackedProductItem";
import { Button } from "../../components/Button";
import { useProductStore } from "../../store/productStore";

export default function TrackingScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  
  const trackedProducts = useProductStore((state) => state.trackedProducts);

  const handleAddProduct = () => {
    router.push("/search");
  };

  const handleSettings = () => {
    // In a real app, this would navigate to tracking settings
    console.log("Navigate to tracking settings");
  };

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate a refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  // Generate random price changes for demo purposes
  const getPriceChange = (productId: string) => {
    // Use product ID as seed for consistent random values
    const seed = parseInt(productId, 10) % 10;
    
    if (seed < 5) {
      // Price decrease
      return {
        amount: Math.round((seed + 1) * 5.99 * 100) / 100,
        percentage: Math.round((seed + 1) * 2.5 * 10) / 10,
        isIncrease: false,
      };
    } else {
      // Price increase
      return {
        amount: Math.round((seed - 4) * 3.99 * 100) / 100,
        percentage: Math.round((seed - 4) * 1.5 * 10) / 10,
        isIncrease: true,
      };
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Price Tracking</Text>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={handleSettings}
        >
          <Settings size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {trackedProducts.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconContainer}>
              <BellOff size={48} color={colors.textSecondary} />
            </View>
            <Text style={styles.emptyTitle}>No products tracked yet</Text>
            <Text style={styles.emptyText}>
              Start tracking products to get notified when prices drop
            </Text>
            <Button
              title="Add Product to Track"
              onPress={handleAddProduct}
              icon={<Plus size={18} color={colors.background} />}
              style={styles.addButton}
            />
          </View>
        ) : (
          <>
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{trackedProducts.length}</Text>
                <Text style={styles.statLabel}>Products Tracked</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>3</Text>
                <Text style={styles.statLabel}>Price Drops</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>$45.97</Text>
                <Text style={styles.statLabel}>Potential Savings</Text>
              </View>
            </View>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Price Drops</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>

            {trackedProducts
              .filter((_, index) => index < 2)
              .map((product) => (
                <TrackedProductItem
                  key={product.id}
                  product={product}
                  priceChange={getPriceChange(product.id)}
                  style={styles.productItem}
                />
              ))}

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>All Tracked Products</Text>
              <TouchableOpacity onPress={handleAddProduct}>
                <Text style={styles.seeAllText}>Add New</Text>
              </TouchableOpacity>
            </View>

            {trackedProducts.map((product) => (
              <TrackedProductItem
                key={product.id}
                product={product}
                style={styles.productItem}
              />
            ))}
          </>
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
    paddingVertical: 12,
  },
  title: {
    ...typography.h2,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.card,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
    paddingHorizontal: 32,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.card,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  emptyTitle: {
    ...typography.h3,
    marginBottom: 8,
    textAlign: "center",
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: 32,
  },
  addButton: {
    width: 220,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginHorizontal: 4,
  },
  statValue: {
    ...typography.h3,
    marginBottom: 4,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: "center",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    ...typography.h3,
  },
  seeAllText: {
    ...typography.body,
    color: colors.primary,
    fontWeight: "600",
  },
  productItem: {
    marginBottom: 12,
  },
});