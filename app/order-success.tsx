import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import {
  CheckCircle,
  ChevronLeft,
  Truck,
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  ShoppingBag,
  Home,
} from "lucide-react-native";
import { colors } from "../constants/colors";
import { typography } from "../constants/typography";
import { Button } from "../components/Button";
import { trendingProducts, recommendedProducts, dealProducts } from "../mocks/products";

export default function OrderSuccessScreen() {
  const { productId, orderId } = useLocalSearchParams();
  const router = useRouter();
  
  // Find the product
  const productIdString = Array.isArray(productId) ? productId[0] : productId || "";
  const orderIdString = Array.isArray(orderId) ? orderId[0] : orderId || "";
  const allProducts = [...trendingProducts, ...recommendedProducts, ...dealProducts];
  const product = allProducts.find(p => p.id === productIdString);
  
  // Generate estimated delivery date (5-7 days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5 + Math.floor(Math.random() * 3));
  const formattedDeliveryDate = deliveryDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  
  // Generate order time (now)
  const orderTime = new Date();
  const formattedOrderTime = orderTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const formattedOrderDate = orderTime.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  
  useEffect(() => {
    // In a real app, you might want to clear the cart here
  }, []);
  
  const handleContinueShopping = () => {
    router.push("/");
  };
  
  const handleViewOrders = () => {
    router.push("/orders");
  };
  
  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Order information not found</Text>
          <Button title="Go Home" onPress={handleContinueShopping} variant="outline" style={styles.errorButton} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Order Confirmation",
          headerLeft: () => (
            <TouchableOpacity onPress={handleContinueShopping} style={styles.headerButton}>
              <ChevronLeft size={24} color={colors.text} />
            </TouchableOpacity>
          ),
        }}
      />
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.successContainer}>
            <View style={styles.successIconContainer}>
              <CheckCircle size={48} color={colors.success} />
            </View>
            <Text style={styles.successTitle}>Order Placed Successfully!</Text>
            <Text style={styles.successText}>
              Thank you for your purchase. Your order has been confirmed and will be shipped soon.
            </Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Order Details</Text>
            <View style={styles.orderInfoRow}>
              <Text style={styles.orderInfoLabel}>Order Number:</Text>
              <Text style={styles.orderInfoValue}>{orderIdString}</Text>
            </View>
            <View style={styles.orderInfoRow}>
              <Text style={styles.orderInfoLabel}>Order Date:</Text>
              <Text style={styles.orderInfoValue}>{formattedOrderDate}</Text>
            </View>
            <View style={styles.orderInfoRow}>
              <Text style={styles.orderInfoLabel}>Order Time:</Text>
              <Text style={styles.orderInfoValue}>{formattedOrderTime}</Text>
            </View>
            <View style={styles.orderInfoRow}>
              <Text style={styles.orderInfoLabel}>Payment Method:</Text>
              <Text style={styles.orderInfoValue}>Credit Card (•••• 1234)</Text>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Product</Text>
            <View style={styles.productCard}>
              <Image source={{ uri: product.image }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
                <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
                <Text style={styles.productStore}>{product.store}</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Shipping Information</Text>
            <View style={styles.shippingInfoContainer}>
              <View style={styles.shippingInfoItem}>
                <Truck size={20} color={colors.primary} style={styles.shippingInfoIcon} />
                <View>
                  <Text style={styles.shippingInfoTitle}>Standard Shipping</Text>
                  <Text style={styles.shippingInfoText}>Free</Text>
                </View>
              </View>
              <View style={styles.shippingInfoItem}>
                <Calendar size={20} color={colors.primary} style={styles.shippingInfoIcon} />
                <View>
                  <Text style={styles.shippingInfoTitle}>Estimated Delivery</Text>
                  <Text style={styles.shippingInfoText}>{formattedDeliveryDate}</Text>
                </View>
              </View>
              <View style={styles.shippingInfoItem}>
                <MapPin size={20} color={colors.primary} style={styles.shippingInfoIcon} />
                <View>
                  <Text style={styles.shippingInfoTitle}>Shipping Address</Text>
                  <Text style={styles.shippingInfoText}>123 Main St, Apt 4B</Text>
                  <Text style={styles.shippingInfoText}>New York, NY 10001</Text>
                </View>
              </View>
              <View style={styles.shippingInfoItem}>
                <Clock size={20} color={colors.primary} style={styles.shippingInfoIcon} />
                <View>
                  <Text style={styles.shippingInfoTitle}>Order Status</Text>
                  <Text style={styles.shippingInfoText}>Processing</Text>
                </View>
              </View>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Order Summary</Text>
            <View style={styles.orderSummary}>
              <View style={styles.orderSummaryRow}>
                <Text style={styles.orderSummaryLabel}>Subtotal</Text>
                <Text style={styles.orderSummaryValue}>${product.price.toFixed(2)}</Text>
              </View>
              <View style={styles.orderSummaryRow}>
                <Text style={styles.orderSummaryLabel}>Shipping</Text>
                <Text style={styles.orderSummaryValue}>Free</Text>
              </View>
              <View style={styles.orderSummaryRow}>
                <Text style={styles.orderSummaryLabel}>Tax</Text>
                <Text style={styles.orderSummaryValue}>${(product.price * 0.08).toFixed(2)}</Text>
              </View>
              <View style={[styles.orderSummaryRow, styles.orderTotal]}>
                <Text style={styles.orderTotalLabel}>Total</Text>
                <Text style={styles.orderTotalValue}>${(product.price + product.price * 0.08).toFixed(2)}</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.actionsContainer}>
            <Button
              title="Continue Shopping"
              onPress={handleContinueShopping}
              icon={<Home size={20} color={colors.background} />}
              style={styles.actionButton}
            />
            <Button
              title="View Orders"
              onPress={handleViewOrders}
              variant="outline"
              icon={<ShoppingBag size={20} color={colors.primary} />}
              style={styles.actionButton}
            />
          </View>
          
          <TouchableOpacity style={styles.trackOrderButton} onPress={handleViewOrders}>
            <Text style={styles.trackOrderText}>Track Your Order</Text>
            <ArrowRight size={16} color={colors.primary} />
          </TouchableOpacity>
          
          <View style={styles.supportContainer}>
            <Text style={styles.supportTitle}>Need Help?</Text>
            <Text style={styles.supportText}>
              If you have any questions about your order, please contact our customer support team.
            </Text>
            <TouchableOpacity style={styles.supportButton}>
              <Text style={styles.supportButtonText}>Contact Support</Text>
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
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.card,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
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
  errorButton: {
    width: 200,
  },
  successContainer: {
    alignItems: "center",
    padding: 24,
    backgroundColor: colors.primaryLight,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  successIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  successTitle: {
    ...typography.h2,
    marginBottom: 8,
    textAlign: "center",
  },
  successText: {
    ...typography.body,
    textAlign: "center",
    color: colors.text,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: 16,
  },
  orderInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  orderInfoLabel: {
    ...typography.body,
    color: colors.textSecondary,
  },
  orderInfoValue: {
    ...typography.body,
    fontWeight: "600",
  },
  productCard: {
    flexDirection: "row",
    backgroundColor: colors.card,
    borderRadius: 12,
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
  productStore: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  shippingInfoContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
  },
  shippingInfoItem: {
    flexDirection: "row",
    marginBottom: 16,
  },
  shippingInfoIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  shippingInfoTitle: {
    ...typography.body,
    fontWeight: "600",
    marginBottom: 4,
  },
  shippingInfoText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  orderSummary: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
  },
  orderSummaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  orderSummaryLabel: {
    ...typography.body,
    color: colors.textSecondary,
  },
  orderSummaryValue: {
    ...typography.body,
  },
  orderTotal: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  orderTotalLabel: {
    ...typography.body,
    fontWeight: "700",
  },
  orderTotalValue: {
    ...typography.h3,
    color: colors.primary,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  trackOrderButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
  },
  trackOrderText: {
    ...typography.body,
    color: colors.primary,
    fontWeight: "600",
    marginRight: 8,
  },
  supportContainer: {
    padding: 16,
    marginBottom: 24,
    alignItems: "center",
  },
  supportTitle: {
    ...typography.h4,
    marginBottom: 8,
  },
  supportText: {
    ...typography.body,
    textAlign: "center",
    color: colors.textSecondary,
    marginBottom: 16,
  },
  supportButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: colors.card,
  },
  supportButtonText: {
    ...typography.body,
    color: colors.primary,
    fontWeight: "600",
  },
});