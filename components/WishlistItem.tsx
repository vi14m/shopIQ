import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { useRouter } from "expo-router";
import { Trash2, BarChart2, ShoppingCart } from "lucide-react-native";
import { colors } from "../constants/colors";
import { typography } from "../constants/typography";
import { Product } from "../types/product";
import { useProductStore } from "../store/productStore";

interface WishlistItemProps {
  product: Product;
  style?: ViewStyle;
}

export const WishlistItem: React.FC<WishlistItemProps> = ({
  product,
  style,
}) => {
  const router = useRouter();
  const { toggleWishlist, toggleTracking } = useProductStore();

  const handlePress = () => {
    router.push(`/product/${product.id}`);
  };

  const handleRemove = () => {
    toggleWishlist(product.id);
  };

  const handleTrackingToggle = () => {
    toggleTracking(product.id);
  };

  const handleBuyNow = () => {
    // In a real app, this would navigate to checkout or external store
    console.log("Buy now:", product.name);
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          {product.originalPrice && (
            <Text style={styles.originalPrice}>${product.originalPrice.toFixed(2)}</Text>
          )}
        </View>
        <View style={styles.storeContainer}>
          {product.storeIcon && (
            <Image source={{ uri: product.storeIcon }} style={styles.storeIcon} />
          )}
          <Text style={styles.storeText}>{product.store}</Text>
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.trackButton]}
          onPress={handleTrackingToggle}
        >
          <BarChart2
            size={18}
            color={product.isTracked ? colors.primary : colors.text}
            strokeWidth={product.isTracked ? 2.5 : 2}
          />
          <Text
            style={[
              styles.actionText,
              product.isTracked ? styles.activeActionText : null,
            ]}
          >
            {product.isTracked ? "Tracking" : "Track"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.buyButton]}
          onPress={handleBuyNow}
        >
          <ShoppingCart size={18} color={colors.background} />
          <Text style={styles.buyText}>Buy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={handleRemove}
        >
          <Trash2 size={18} color={colors.error} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: colors.card,
  },
  content: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between",
  },
  name: {
    ...typography.body,
    fontWeight: "500",
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  price: {
    ...typography.body,
    fontWeight: "700",
    color: colors.text,
    marginRight: 6,
  },
  originalPrice: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    textDecorationLine: "line-through",
  },
  storeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  storeIcon: {
    width: 14,
    height: 14,
    marginRight: 4,
  },
  storeText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  actions: {
    width: 60,
    alignItems: "center",
    justifyContent: "space-between",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 6,
  },
  trackButton: {
    backgroundColor: colors.card,
  },
  buyButton: {
    backgroundColor: colors.primary,
  },
  removeButton: {
    padding: 6,
  },
  actionText: {
    ...typography.caption,
    marginLeft: 4,
    color: colors.text,
  },
  activeActionText: {
    color: colors.primary,
    fontWeight: "600",
  },
  buyText: {
    ...typography.caption,
    marginLeft: 4,
    color: colors.background,
    fontWeight: "600",
  },
});