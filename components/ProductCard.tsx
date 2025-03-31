import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ViewStyle,
} from "react-native";
import { useRouter } from "expo-router";
import { Heart, BarChart2 } from "lucide-react-native";
import { colors } from "../constants/colors";
import { typography } from "../constants/typography";
import { Product } from "../types/product";
import { useProductStore } from "../store/productStore";

interface ProductCardProps {
  product: Product;
  style?: ViewStyle;
  size?: "small" | "medium" | "large";
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  style,
  size = "medium",
}) => {
  const router = useRouter();
  const { toggleWishlist, toggleTracking } = useProductStore();

  const handlePress = () => {
    router.push(`/product/${product.id}`);
  };

  const handleWishlistToggle = (e: any) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleTrackingToggle = (e: any) => {
    e.stopPropagation();
    toggleTracking(product.id);
  };

  const getCardStyle = () => {
    switch (size) {
      case "small":
        return styles.smallCard;
      case "medium":
        return styles.mediumCard;
      case "large":
        return styles.largeCard;
      default:
        return styles.mediumCard;
    }
  };

  const getImageStyle = () => {
    switch (size) {
      case "small":
        return styles.smallImage;
      case "medium":
        return styles.mediumImage;
      case "large":
        return styles.largeImage;
      default:
        return styles.mediumImage;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.card, getCardStyle(), style]}
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={[styles.image, getImageStyle()]} />
        {product.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{product.discount}%</Text>
          </View>
        )}
        <View style={styles.actionButtons}>
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
            onPress={handleTrackingToggle}
          >
            <BarChart2
              size={20}
              color={product.isTracked ? colors.primary : colors.text}
              strokeWidth={product.isTracked ? 2.5 : 2}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.contentContainer}>
        {product.store && (
          <View style={styles.storeContainer}>
            {product.storeIcon && (
              <Image source={{ uri: product.storeIcon }} style={styles.storeIcon} />
            )}
            <Text style={styles.storeText}>{product.store}</Text>
          </View>
        )}
        <Text style={styles.title} numberOfLines={2}>
          {product.name}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          {product.originalPrice && (
            <Text style={styles.originalPrice}>${product.originalPrice.toFixed(2)}</Text>
          )}
        </View>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>★ {product.rating.toFixed(1)}</Text>
          <Text style={styles.reviewCount}>({product.reviewCount})</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  smallCard: {
    width: 150,
  },
  mediumCard: {
    width: 180,
  },
  largeCard: {
    width: "100%",
    flexDirection: "row",
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    backgroundColor: colors.card,
  },
  smallImage: {
    height: 120,
    width: "100%",
  },
  mediumImage: {
    height: 150,
    width: "100%",
  },
  largeImage: {
    height: 120,
    width: 120,
  },
  discountBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: colors.secondary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  discountText: {
    color: colors.background,
    fontSize: 12,
    fontWeight: "700",
  },
  actionButtons: {
    position: "absolute",
    top: 8,
    right: 8,
    flexDirection: "column",
    gap: 8,
  },
  actionButton: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  contentContainer: {
    padding: 12,
    flex: 1,
  },
  storeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  storeIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  storeText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  title: {
    ...typography.body,
    fontWeight: "500",
    marginBottom: 6,
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
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    ...typography.bodySmall,
    fontWeight: "500",
    color: colors.text,
  },
  reviewCount: {
    ...typography.caption,
    color: colors.textSecondary,
    marginLeft: 4,
  },
});