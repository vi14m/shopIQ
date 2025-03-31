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
import { Heart, Trash2, Bell, BellOff } from "lucide-react-native";
import { colors } from "../constants/colors";
import { typography } from "../constants/typography";
import { Product } from "../types/product";
import { useProductStore } from "../store/productStore";

interface TrackedProductItemProps {
  product: Product;
  priceChange?: {
    amount: number;
    percentage: number;
    isIncrease: boolean;
  };
  style?: ViewStyle;
}

export const TrackedProductItem: React.FC<TrackedProductItemProps> = ({
  product,
  priceChange,
  style,
}) => {
  const router = useRouter();
  const { toggleTracking, toggleWishlist, toggleNotifications } = useProductStore();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  const handlePress = () => {
    router.push(`/product/${product.id}`);
  };

  const handleRemove = () => {
    toggleTracking(product.id);
  };

  const handleWishlistToggle = () => {
    toggleWishlist(product.id);
  };

  const handleNotificationsToggle = () => {
    toggleNotifications(product.id);
    setNotificationsEnabled(!notificationsEnabled);
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
          {priceChange && (
            <View
              style={[
                styles.priceChangeBadge,
                priceChange.isIncrease
                  ? styles.priceIncreaseBadge
                  : styles.priceDecreaseBadge,
              ]}
            >
              <Text style={styles.priceChangeText}>
                {priceChange.isIncrease ? "+" : "-"}${Math.abs(priceChange.amount).toFixed(2)} (
                {Math.abs(priceChange.percentage).toFixed(1)}%)
              </Text>
            </View>
          )}
        </View>
        <View style={styles.targetContainer}>
          <Text style={styles.targetLabel}>Target price:</Text>
          <Text style={styles.targetPrice}>
            ${(product.price * 0.9).toFixed(2)}
          </Text>
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleWishlistToggle}
        >
          <Heart
            size={20}
            color={product.isInWishlist ? colors.secondary : colors.text}
            fill={product.isInWishlist ? colors.secondary : "transparent"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleNotificationsToggle}
        >
          {notificationsEnabled ? (
            <Bell size={20} color={colors.primary} />
          ) : (
            <BellOff size={20} color={colors.textSecondary} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleRemove}
        >
          <Trash2 size={20} color={colors.error} />
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
  priceChangeBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  priceIncreaseBadge: {
    backgroundColor: colors.error + "20", // 20% opacity
  },
  priceDecreaseBadge: {
    backgroundColor: colors.success + "20", // 20% opacity
  },
  priceChangeText: {
    ...typography.caption,
    fontWeight: "600",
    color: colors.text,
  },
  targetContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  targetLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginRight: 4,
  },
  targetPrice: {
    ...typography.caption,
    fontWeight: "600",
    color: colors.primary,
  },
  actions: {
    width: 40,
    alignItems: "center",
    justifyContent: "space-between",
  },
  actionButton: {
    padding: 6,
  },
});