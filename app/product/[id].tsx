import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Share,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import {
  Heart,
  BarChart2,
  Share2,
  ChevronLeft,
  Star,
  ShoppingCart,
  Truck,
  Shield,
  ArrowLeft,
  ArrowRight,
} from "lucide-react-native";
import { colors } from "../../constants/colors";
import { typography } from "../../constants/typography";
import { Button } from "../../components/Button";
import { ProductCard } from "../../components/ProductCard";
import { PriceChart } from "../../components/PriceChart";
import { ProductComparison } from "../../components/ProductComparison";
import { useProductStore } from "../../store/productStore";
import { productDetails, trendingProducts, recommendedProducts, dealProducts } from "../../mocks/products";
import { Product } from "../../types/product";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  
  // Get product details from mock data
  const productId = Array.isArray(id) ? id[0] : id || "";
  
  // Get wishlist and tracked products from store
  const wishlist = useProductStore(state => state.wishlist);
  const trackedProducts = useProductStore(state => state.trackedProducts);
  const addToRecentlyViewed = useProductStore(state => state.addToRecentlyViewed);
  const toggleWishlist = useProductStore(state => state.toggleWishlist);
  const toggleTracking = useProductStore(state => state.toggleTracking);
  
  // Find the product in our data sources
  const findProduct = () => {
    const allProducts = [...trendingProducts, ...recommendedProducts, ...dealProducts];
    const product = allProducts.find(p => p.id === productId);
    
    if (!product) return null;
    
    // Add wishlist and tracking status
    return {
      ...product,
      isInWishlist: wishlist.some(p => p.id === productId),
      isTracked: trackedProducts.some(p => p.id === productId)
    };
  };
  
  const product = findProduct();
  const productDetail = productDetails[productId];
  
  // Get recommended products with status
  const getRecommendedWithStatus = () => {
    return recommendedProducts.slice(0, 4).map(p => ({
      ...p,
      isInWishlist: wishlist.some(item => item.id === p.id),
      isTracked: trackedProducts.some(item => item.id === p.id)
    }));
  };
  
  const recommendedWithStatus = getRecommendedWithStatus();

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    if (product) {
      addToRecentlyViewed(product);
    }
    
    return () => clearTimeout(timer);
  }, [product, addToRecentlyViewed]);

  const handleBack = () => {
    router.back();
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this product: ${product?.name} - $${product?.price}`,
        url: `https://shopiq.app/product/${productId}`,
      });
    } catch (error) {
      console.error("Error sharing product:", error);
    }
  };

  const handleWishlistToggle = () => {
    if (product) {
      toggleWishlist(product.id);
    }
  };

  const handleTrackingToggle = () => {
    if (product) {
      toggleTracking(product.id);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      router.push({
        pathname: "/checkout",
        params: { productId: product.id }
      });
    }
  };

  // If loading, show a loading indicator
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading product details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // If product not found, show error
  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Product not found</Text>
          <Button title="Go Back" onPress={handleBack} variant="outline" />
        </View>
      </SafeAreaView>
    );
  }

  // Create a fallback product detail if not found in productDetails
  const fallbackProductDetail = {
    ...product,
    features: [
      "High-quality product with premium features",
      "Designed for durability and performance",
      "Easy to use with intuitive controls",
      "Energy efficient design",
      "Backed by manufacturer warranty"
    ],
    priceHistory: [
      { date: "2023-01-01", price: product.originalPrice || product.price * 1.2 },
      { date: "2023-02-01", price: product.originalPrice || product.price * 1.2 },
      { date: "2023-03-01", price: product.originalPrice || product.price * 1.15 },
      { date: "2023-04-01", price: product.originalPrice || product.price * 1.1 },
      { date: "2023-05-01", price: product.price * 1.05 },
      { date: "2023-06-01", price: product.price }
    ],
    similarProducts: recommendedWithStatus.slice(0, 2),
    specifications: {
      "Brand": product.store,
      "Category": product.category,
      "Rating": `${product.rating} stars`,
      "Reviews": `${product.reviewCount} reviews`,
      "Price": `$${product.price.toFixed(2)}`
    }
  };

  // Use the actual product detail or the fallback
  const detailToShow = productDetail || fallbackProductDetail;

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity onPress={handleBack} style={styles.headerButton}>
              <ChevronLeft size={24} color={colors.text} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={styles.headerActions}>
              <TouchableOpacity
                onPress={handleWishlistToggle}
                style={styles.headerButton}
              >
                <Heart
                  size={24}
                  color={product.isInWishlist ? colors.secondary : colors.text}
                  fill={product.isInWishlist ? colors.secondary : "transparent"}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleShare}
                style={styles.headerButton}
              >
                <Share2 size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Product Image */}
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: product.image }}
              style={styles.productImage}
              resizeMode="cover"
            />
            {product.discount && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>-{product.discount}%</Text>
              </View>
            )}
          </View>

          {/* Product Info */}
          <View style={styles.infoContainer}>
            <View style={styles.storeContainer}>
              {product.storeIcon && (
                <Image
                  source={{ uri: product.storeIcon }}
                  style={styles.storeIcon}
                />
              )}
              <Text style={styles.storeText}>{product.store}</Text>
            </View>
            <Text style={styles.productName}>{product.name}</Text>
            <View style={styles.ratingContainer}>
              <Star size={16} color="#FFD700" fill="#FFD700" />
              <Text style={styles.ratingText}>
                {product.rating.toFixed(1)} ({product.reviewCount} reviews)
              </Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>${product.price.toFixed(2)}</Text>
              {product.originalPrice && (
                <Text style={styles.originalPrice}>
                  ${product.originalPrice.toFixed(2)}
                </Text>
              )}
            </View>

            {/* AI Price Prediction */}
            <View style={styles.predictionContainer}>
              <Text style={styles.predictionLabel}>AI Price Prediction:</Text>
              <Text style={styles.predictionText}>
                Price likely to {Math.random() > 0.5 ? "drop" : "increase"} in the next 30 days
              </Text>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <Button
                title="Buy Now"
                onPress={handleBuyNow}
                icon={<ShoppingCart size={20} color={colors.background} />}
                style={styles.buyButton}
              />
              <TouchableOpacity
                style={[
                  styles.trackButton,
                  product.isTracked ? styles.trackButtonActive : null,
                ]}
                onPress={handleTrackingToggle}
              >
                <BarChart2
                  size={24}
                  color={product.isTracked ? colors.primary : colors.text}
                  strokeWidth={product.isTracked ? 2.5 : 2}
                />
              </TouchableOpacity>
            </View>

            {/* Shipping & Warranty */}
            <View style={styles.infoCards}>
              <View style={styles.infoCard}>
                <Truck size={20} color={colors.text} />
                <Text style={styles.infoCardText}>Free Shipping</Text>
              </View>
              <View style={styles.infoCard}>
                <Shield size={20} color={colors.text} />
                <Text style={styles.infoCardText}>1 Year Warranty</Text>
              </View>
            </View>
          </View>

          {/* Tabs */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === "overview" ? styles.activeTab : null,
              ]}
              onPress={() => setActiveTab("overview")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "overview" ? styles.activeTabText : null,
                ]}
              >
                Overview
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === "specs" ? styles.activeTab : null,
              ]}
              onPress={() => setActiveTab("specs")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "specs" ? styles.activeTabText : null,
                ]}
              >
                Specifications
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === "reviews" ? styles.activeTab : null,
              ]}
              onPress={() => setActiveTab("reviews")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "reviews" ? styles.activeTabText : null,
                ]}
              >
                Reviews
              </Text>
            </TouchableOpacity>
          </View>

          {/* Tab Content */}
          <View style={styles.tabContent}>
            {activeTab === "overview" && (
              <>
                <Text style={styles.description}>{detailToShow.description}</Text>
                
                <View style={styles.featuresContainer}>
                  <Text style={styles.featuresTitle}>Key Features</Text>
                  {detailToShow.features.map((feature, index) => (
                    <View key={index} style={styles.featureItem}>
                      <View style={styles.featureBullet} />
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>
                
                <PriceChart
                  priceHistory={detailToShow.priceHistory}
                  currentPrice={product.price}
                />
                
                {detailToShow.similarProducts.length > 0 && (
                  <ProductComparison
                    products={[product, ...detailToShow.similarProducts]}
                    features={[
                      "Noise Cancellation",
                      "Battery Life",
                      "Water Resistance",
                      "Voice Assistant",
                      "Multi-device Pairing",
                    ]}
                  />
                )}

                {/* AI Recommendation */}
                <View style={styles.aiRecommendationContainer}>
                  <Text style={styles.aiRecommendationTitle}>AI Recommendation</Text>
                  <View style={styles.aiRecommendationContent}>
                    <Text style={styles.aiRecommendationText}>
                      Based on your browsing history and preferences, our AI recommends this product for you.
                      It matches your interest in {product.category} products and offers excellent value for money.
                    </Text>
                    <View style={styles.aiRecommendationStats}>
                      <View style={styles.aiRecommendationStat}>
                        <Text style={styles.aiRecommendationStatValue}>92%</Text>
                        <Text style={styles.aiRecommendationStatLabel}>Match</Text>
                      </View>
                      <View style={styles.aiRecommendationStat}>
                        <Text style={styles.aiRecommendationStatValue}>4.7/5</Text>
                        <Text style={styles.aiRecommendationStatLabel}>Value</Text>
                      </View>
                      <View style={styles.aiRecommendationStat}>
                        <Text style={styles.aiRecommendationStatValue}>Top 10%</Text>
                        <Text style={styles.aiRecommendationStatLabel}>Quality</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </>
            )}

            {activeTab === "specs" && (
              <View style={styles.specsContainer}>
                {Object.entries(detailToShow.specifications).map(([key, value], index) => (
                  <View
                    key={index}
                    style={[
                      styles.specRow,
                      index % 2 === 0 ? styles.specRowEven : styles.specRowOdd,
                    ]}
                  >
                    <Text style={styles.specLabel}>{key}</Text>
                    <Text style={styles.specValue}>{value}</Text>
                  </View>
                ))}
              </View>
            )}

            {activeTab === "reviews" && (
              <View style={styles.reviewsContainer}>
                <View style={styles.reviewSummary}>
                  <View style={styles.reviewRatingContainer}>
                    <Text style={styles.reviewRatingValue}>
                      {product.rating.toFixed(1)}
                    </Text>
                    <View style={styles.reviewStars}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          color="#FFD700"
                          fill={star <= Math.round(product.rating) ? "#FFD700" : "transparent"}
                        />
                      ))}
                    </View>
                    <Text style={styles.reviewCount}>
                      Based on {product.reviewCount} reviews
                    </Text>
                  </View>
                  <View style={styles.reviewBars}>
                    {[5, 4, 3, 2, 1].map((rating) => {
                      const percentage =
                        rating === 5
                          ? 70
                          : rating === 4
                          ? 20
                          : rating === 3
                          ? 7
                          : rating === 2
                          ? 2
                          : 1;
                      return (
                        <View key={rating} style={styles.reviewBarContainer}>
                          <Text style={styles.reviewBarLabel}>{rating} ★</Text>
                          <View style={styles.reviewBarBackground}>
                            <View
                              style={[
                                styles.reviewBarFill,
                                { width: `${percentage}%` },
                              ]}
                            />
                          </View>
                          <Text style={styles.reviewBarPercentage}>
                            {percentage}%
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </View>

                <View style={styles.reviewsList}>
                  <View style={styles.reviewsHeader}>
                    <Text style={styles.reviewsTitle}>Customer Reviews</Text>
                    <TouchableOpacity>
                      <Text style={styles.reviewsFilterText}>Filter</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Sample reviews */}
                  {[
                    {
                      name: "John D.",
                      rating: 5,
                      date: "2 weeks ago",
                      comment:
                        "Absolutely love this product! The quality is outstanding and it exceeded my expectations in every way.",
                    },
                    {
                      name: "Sarah M.",
                      rating: 4,
                      date: "1 month ago",
                      comment:
                        "Great product overall. The only minor issue is that the battery life could be better, but otherwise it's perfect for my needs.",
                    },
                    {
                      name: "Michael T.",
                      rating: 5,
                      date: "2 months ago",
                      comment:
                        "Best purchase I've made this year. The features are exactly what I needed and the price was reasonable.",
                    },
                  ].map((review, index) => (
                    <View key={index} style={styles.reviewItem}>
                      <View style={styles.reviewHeader}>
                        <Text style={styles.reviewerName}>{review.name}</Text>
                        <Text style={styles.reviewDate}>{review.date}</Text>
                      </View>
                      <View style={styles.reviewStarsRow}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={14}
                            color="#FFD700"
                            fill={star <= review.rating ? "#FFD700" : "transparent"}
                          />
                        ))}
                      </View>
                      <Text style={styles.reviewComment}>{review.comment}</Text>
                    </View>
                  ))}

                  <TouchableOpacity style={styles.seeMoreButton}>
                    <Text style={styles.seeMoreText}>See More Reviews</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>

          {/* Recommended Products */}
          <View style={styles.recommendedContainer}>
            <Text style={styles.recommendedTitle}>You May Also Like</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.recommendedList}
            >
              {recommendedWithStatus.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  style={styles.recommendedCard}
                />
              ))}
            </ScrollView>
          </View>

          {/* Navigation Buttons */}
          <View style={styles.navigationButtons}>
            <TouchableOpacity
              style={styles.navigationButton}
              onPress={handleBack}
            >
              <ArrowLeft size={20} color={colors.text} />
              <Text style={styles.navigationButtonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navigationButton}
              onPress={() => router.push("/")}
            >
              <Text style={styles.navigationButtonText}>Continue Shopping</Text>
              <ArrowRight size={20} color={colors.text} />
            </TouchableOpacity>
          </View>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  loadingText: {
    ...typography.body,
    marginTop: 16,
    color: colors.textSecondary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  errorText: {
    ...typography.h3,
    marginBottom: 16,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.card,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
  },
  headerActions: {
    flexDirection: "row",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 300,
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  discountBadge: {
    position: "absolute",
    top: 16,
    left: 16,
    backgroundColor: colors.secondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  discountText: {
    color: colors.background,
    fontSize: 14,
    fontWeight: "700",
  },
  infoContainer: {
    padding: 16,
  },
  storeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  storeIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  storeText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  productName: {
    ...typography.h2,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  ratingText: {
    ...typography.body,
    color: colors.textSecondary,
    marginLeft: 6,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  price: {
    ...typography.h2,
    color: colors.text,
    marginRight: 8,
  },
  originalPrice: {
    ...typography.body,
    color: colors.textSecondary,
    textDecorationLine: "line-through",
  },
  predictionContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  predictionLabel: {
    ...typography.body,
    fontWeight: "600",
    marginRight: 4,
  },
  predictionText: {
    ...typography.body,
    color: colors.primary,
  },
  actionButtons: {
    flexDirection: "row",
    marginBottom: 16,
  },
  buyButton: {
    flex: 1,
    marginRight: 12,
  },
  trackButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.card,
    justifyContent: "center",
    alignItems: "center",
  },
  trackButtonActive: {
    backgroundColor: colors.primaryLight,
  },
  infoCards: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  infoCardText: {
    ...typography.bodySmall,
    marginLeft: 8,
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
  tabContent: {
    padding: 16,
  },
  description: {
    ...typography.body,
    lineHeight: 24,
    marginBottom: 24,
  },
  featuresContainer: {
    marginBottom: 24,
  },
  featuresTitle: {
    ...typography.h3,
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  featureBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginRight: 12,
  },
  featureText: {
    ...typography.body,
    flex: 1,
  },
  specsContainer: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 24,
  },
  specRow: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  specRowEven: {
    backgroundColor: colors.card,
  },
  specRowOdd: {
    backgroundColor: colors.background,
  },
  specLabel: {
    ...typography.body,
    fontWeight: "600",
    width: "40%",
  },
  specValue: {
    ...typography.body,
    width: "60%",
  },
  reviewsContainer: {
    marginBottom: 24,
  },
  reviewSummary: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  reviewRatingContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  reviewRatingValue: {
    ...typography.h1,
    marginBottom: 8,
  },
  reviewStars: {
    flexDirection: "row",
    marginBottom: 8,
  },
  reviewCount: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  reviewBars: {
    marginTop: 16,
  },
  reviewBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  reviewBarLabel: {
    ...typography.bodySmall,
    width: 40,
  },
  reviewBarBackground: {
    flex: 1,
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    marginHorizontal: 8,
    overflow: "hidden",
  },
  reviewBarFill: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  reviewBarPercentage: {
    ...typography.bodySmall,
    width: 40,
    textAlign: "right",
  },
  reviewsList: {
    marginTop: 16,
  },
  reviewsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  reviewsTitle: {
    ...typography.h3,
  },
  reviewsFilterText: {
    ...typography.body,
    color: colors.primary,
  },
  reviewItem: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  reviewerName: {
    ...typography.body,
    fontWeight: "600",
  },
  reviewDate: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  reviewStarsRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  reviewComment: {
    ...typography.body,
    lineHeight: 22,
  },
  seeMoreButton: {
    alignItems: "center",
    paddingVertical: 12,
  },
  seeMoreText: {
    ...typography.body,
    color: colors.primary,
    fontWeight: "600",
  },
  recommendedContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  recommendedTitle: {
    ...typography.h3,
    marginBottom: 16,
  },
  recommendedList: {
    paddingBottom: 8,
  },
  recommendedCard: {
    marginRight: 12,
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  navigationButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  navigationButtonText: {
    ...typography.body,
    fontWeight: "600",
    marginHorizontal: 8,
  },
  aiRecommendationContainer: {
    marginTop: 24,
    marginBottom: 24,
    backgroundColor: colors.primaryLight,
    borderRadius: 12,
    overflow: "hidden",
  },
  aiRecommendationTitle: {
    ...typography.h3,
    backgroundColor: colors.primary,
    color: colors.background,
    padding: 16,
  },
  aiRecommendationContent: {
    padding: 16,
  },
  aiRecommendationText: {
    ...typography.body,
    marginBottom: 16,
    lineHeight: 22,
  },
  aiRecommendationStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  aiRecommendationStat: {
    alignItems: "center",
    flex: 1,
  },
  aiRecommendationStatValue: {
    ...typography.h3,
    color: colors.primary,
    marginBottom: 4,
  },
  aiRecommendationStatLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
});