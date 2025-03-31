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
import { ChevronLeft, Package, ChevronRight, Truck, CheckCircle, Clock } from "lucide-react-native";
import { colors } from "../constants/colors";
import { typography } from "../constants/typography";

// Mock orders data
const orders = [
  {
    id: "ORD-12345",
    date: "June 15, 2023",
    total: 349.99,
    status: "Delivered",
    items: [
      {
        id: "1",
        name: "Sony WH-1000XM5 Wireless Headphones",
        price: 349.99,
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      }
    ],
    deliveryDate: "June 20, 2023",
    trackingNumber: "TRK-987654321"
  },
  {
    id: "ORD-67890",
    date: "May 28, 2023",
    total: 929.98,
    status: "Delivered",
    items: [
      {
        id: "2",
        name: "Apple iPad Air (5th Generation)",
        price: 599.00,
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      },
      {
        id: "6",
        name: "Bose QuietComfort Earbuds II",
        price: 279.99,
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      },
      {
        id: "12",
        name: "Logitech MX Master 3S Mouse",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      }
    ],
    deliveryDate: "June 2, 2023",
    trackingNumber: "TRK-123456789"
  },
  {
    id: "ORD-24680",
    date: "April 10, 2023",
    total: 649.99,
    status: "Delivered",
    items: [
      {
        id: "3",
        name: "Dyson V12 Detect Slim",
        price: 649.99,
        image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      }
    ],
    deliveryDate: "April 15, 2023",
    trackingNumber: "TRK-246813579"
  },
  {
    id: "ORD-13579",
    date: "June 25, 2023",
    total: 89.99,
    status: "In Transit",
    items: [
      {
        id: "11",
        name: "Instant Pot Duo Plus 9-in-1",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1593759608142-e976b59a9f49?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      }
    ],
    deliveryDate: "June 30, 2023",
    trackingNumber: "TRK-135792468"
  }
];

export default function OrdersScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

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

  const toggleOrderExpand = (orderId: string) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  const handleProductPress = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle size={16} color={colors.success} />;
      case "In Transit":
        return <Truck size={16} color={colors.primary} />;
      case "Processing":
        return <Clock size={16} color={colors.warning} />;
      default:
        return <Package size={16} color={colors.textSecondary} />;
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "My Orders",
          headerLeft: () => (
            <TouchableOpacity onPress={handleBack} style={styles.headerButton}>
              <ChevronLeft size={24} color={colors.text} />
            </TouchableOpacity>
          ),
        }}
      />
      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          contentContainerStyle={styles.scrollContent}
        >
          {orders.length === 0 ? (
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIconContainer}>
                <Package size={48} color={colors.textSecondary} />
              </View>
              <Text style={styles.emptyTitle}>No orders yet</Text>
              <Text style={styles.emptyText}>
                Your orders will appear here once you make a purchase
              </Text>
            </View>
          ) : (
            <>
              <Text style={styles.sectionTitle}>Your Orders</Text>
              {orders.map((order) => (
                <View key={order.id} style={styles.orderCard}>
                  <TouchableOpacity
                    style={styles.orderHeader}
                    onPress={() => toggleOrderExpand(order.id)}
                  >
                    <View style={styles.orderInfo}>
                      <Text style={styles.orderId}>{order.id}</Text>
                      <Text style={styles.orderDate}>{order.date}</Text>
                    </View>
                    <View style={styles.orderStatus}>
                      <View style={styles.statusContainer}>
                        {getStatusIcon(order.status)}
                        <Text style={styles.statusText}>{order.status}</Text>
                      </View>
                      <ChevronRight
                        size={20}
                        color={colors.textSecondary}
                        style={[
                          styles.chevron,
                          expandedOrder === order.id && styles.chevronExpanded,
                        ]}
                      />
                    </View>
                  </TouchableOpacity>

                  {expandedOrder === order.id && (
                    <View style={styles.orderDetails}>
                      <View style={styles.orderItems}>
                        {order.items.map((item) => (
                          <TouchableOpacity
                            key={item.id}
                            style={styles.orderItem}
                            onPress={() => handleProductPress(item.id)}
                          >
                            <Image
                              source={{ uri: item.image }}
                              style={styles.itemImage}
                            />
                            <View style={styles.itemInfo}>
                              <Text style={styles.itemName} numberOfLines={2}>
                                {item.name}
                              </Text>
                              <Text style={styles.itemPrice}>
                                ${item.price.toFixed(2)}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        ))}
                      </View>

                      <View style={styles.orderSummary}>
                        <View style={styles.summaryRow}>
                          <Text style={styles.summaryLabel}>Order Total:</Text>
                          <Text style={styles.summaryValue}>
                            ${order.total.toFixed(2)}
                          </Text>
                        </View>
                        <View style={styles.summaryRow}>
                          <Text style={styles.summaryLabel}>
                            {order.status === "Delivered"
                              ? "Delivered on:"
                              : "Estimated Delivery:"}
                          </Text>
                          <Text style={styles.summaryValue}>
                            {order.deliveryDate}
                          </Text>
                        </View>
                        <View style={styles.summaryRow}>
                          <Text style={styles.summaryLabel}>Tracking #:</Text>
                          <Text style={styles.summaryValue}>
                            {order.trackingNumber}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.orderActions}>
                        <TouchableOpacity style={styles.actionButton}>
                          <Text style={styles.actionButtonText}>
                            Track Package
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]}>
                          <Text style={styles.secondaryButtonText}>
                            View Invoice
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>
              ))}
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
  orderCard: {
    backgroundColor: colors.background,
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.border,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: colors.card,
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    ...typography.body,
    fontWeight: "600",
    marginBottom: 4,
  },
  orderDate: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  orderStatus: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  statusText: {
    ...typography.bodySmall,
    marginLeft: 4,
    color: colors.text,
  },
  chevron: {
    transform: [{ rotate: "0deg" }],
  },
  chevronExpanded: {
    transform: [{ rotate: "90deg" }],
  },
  orderDetails: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  orderItems: {
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: "row",
    marginBottom: 12,
    backgroundColor: colors.card,
    borderRadius: 8,
    overflow: "hidden",
  },
  itemImage: {
    width: 80,
    height: 80,
  },
  itemInfo: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
  },
  itemName: {
    ...typography.body,
    marginBottom: 4,
  },
  itemPrice: {
    ...typography.body,
    fontWeight: "600",
    color: colors.primary,
  },
  orderSummary: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryLabel: {
    ...typography.body,
    color: colors.textSecondary,
  },
  summaryValue: {
    ...typography.body,
    fontWeight: "600",
  },
  orderActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginHorizontal: 4,
  },
  actionButtonText: {
    ...typography.body,
    color: colors.background,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  secondaryButtonText: {
    ...typography.body,
    color: colors.primary,
    fontWeight: "600",
  },
});