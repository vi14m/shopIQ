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
import { Heart, Plus, Settings } from "lucide-react-native";
import { colors } from "../../constants/colors";
import { typography } from "../../constants/typography";
import { WishlistItem } from "../../components/WishlistItem";
import { BudgetProgress } from "../../components/BudgetProgress";
import { Button } from "../../components/Button";
import { useProductStore } from "../../store/productStore";

export default function WishlistScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  
  const wishlistProducts = useProductStore((state) => state.wishlist);
  const budget = useProductStore((state) => state.budget);

  const handleAddProduct = () => {
    router.push("/search");
  };

  const handleSettings = () => {
    // In a real app, this would navigate to wishlist settings
    console.log("Navigate to wishlist settings");
  };

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate a refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const totalWishlistValue = wishlistProducts.reduce(
    (sum, product) => sum + product.price,
    0
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Wishlist</Text>
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
        {wishlistProducts.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconContainer}>
              <Heart size={48} color={colors.secondary} />
            </View>
            <Text style={styles.emptyTitle}>Your wishlist is empty</Text>
            <Text style={styles.emptyText}>
              Save items you like and want to buy later
            </Text>
            <Button
              title="Add to Wishlist"
              onPress={handleAddProduct}
              icon={<Plus size={18} color={colors.background} />}
              style={styles.addButton}
            />
          </View>
        ) : (
          <>
            <BudgetProgress budget={budget} />

            <View style={styles.summaryContainer}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>{wishlistProducts.length}</Text>
                <Text style={styles.summaryLabel}>Items</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>${totalWishlistValue.toFixed(2)}</Text>
                <Text style={styles.summaryLabel}>Total Value</Text>
              </View>
            </View>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>My Wishlist</Text>
              <TouchableOpacity onPress={handleAddProduct}>
                <Text style={styles.addText}>Add Item</Text>
              </TouchableOpacity>
            </View>

            {wishlistProducts.map((product) => (
              <WishlistItem
                key={product.id}
                product={product}
                style={styles.wishlistItem}
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
    backgroundColor: colors.secondaryLight,
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
    width: 180,
  },
  summaryContainer: {
    flexDirection: "row",
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  summaryItem: {
    flex: 1,
    alignItems: "center",
  },
  summaryValue: {
    ...typography.h3,
    marginBottom: 4,
  },
  summaryLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  summaryDivider: {
    width: 1,
    backgroundColor: colors.border,
    marginHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    ...typography.h3,
  },
  addText: {
    ...typography.body,
    color: colors.primary,
    fontWeight: "600",
  },
  wishlistItem: {
    marginBottom: 12,
  },
});