import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import {
  ChevronLeft,
  CreditCard,
  CheckCircle,
  Lock,
  MapPin,
  Truck,
  Calendar,
  AlertCircle,
} from "lucide-react-native";
import { colors } from "../constants/colors";
import { typography } from "../constants/typography";
import { Button } from "../components/Button";
import { trendingProducts, recommendedProducts, dealProducts } from "../mocks/products";

// Payment method types
type PaymentMethod = "credit_card" | "paypal" | "apple_pay" | "google_pay";

// Shipping method types
type ShippingMethod = "standard" | "express" | "next_day";

export default function CheckoutScreen() {
  const { productId } = useLocalSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(false);
  
  // Form state
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("United States");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCvv] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("credit_card");
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>("standard");
  
  // Find the product
  const productIdString = Array.isArray(productId) ? productId[0] : productId || "";
  const allProducts = [...trendingProducts, ...recommendedProducts, ...dealProducts];
  const product = allProducts.find(p => p.id === productIdString);
  
  // Calculate order summary
  const subtotal = product ? product.price : 0;
  const shippingCost = shippingMethod === "standard" ? 0 : shippingMethod === "express" ? 9.99 : 19.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shippingCost + tax;
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleBack = () => {
    router.back();
  };
  
  const formatCardNumber = (value: string) => {
    // Remove non-digit characters
    const digits = value.replace(/\D/g, "");
    // Add space after every 4 digits
    const formatted = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
    // Limit to 19 characters (16 digits + 3 spaces)
    return formatted.slice(0, 19);
  };
  
  const formatExpiry = (value: string) => {
    // Remove non-digit characters
    const digits = value.replace(/\D/g, "");
    // Format as MM/YY
    if (digits.length > 2) {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
    }
    return digits;
  };
  
  const handleCardNumberChange = (text: string) => {
    setCardNumber(formatCardNumber(text));
  };
  
  const handleExpiryChange = (text: string) => {
    setCardExpiry(formatExpiry(text));
  };
  
  const handleCvvChange = (text: string) => {
    // Only allow digits and limit to 3-4 characters
    const digits = text.replace(/\D/g, "").slice(0, 4);
    setCvv(digits);
  };
  
  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    setPaymentMethod(method);
  };
  
  const handleShippingMethodSelect = (method: ShippingMethod) => {
    setShippingMethod(method);
  };
  
  const handlePlaceOrder = () => {
    setProcessingPayment(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessingPayment(false);
      router.push({
        pathname: "/order-success",
        params: { 
          productId: productIdString,
          orderId: `ORD-${Math.floor(100000 + Math.random() * 900000)}`
        }
      });
    }, 2000);
  };
  
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading checkout...</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <AlertCircle size={48} color={colors.error} />
          <Text style={styles.errorText}>Product not found</Text>
          <Button title="Go Back" onPress={handleBack} variant="outline" style={styles.errorButton} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Checkout",
          headerLeft: () => (
            <TouchableOpacity onPress={handleBack} style={styles.headerButton}>
              <ChevronLeft size={24} color={colors.text} />
            </TouchableOpacity>
          ),
        }}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <SafeAreaView style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Order Summary */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Order Summary</Text>
              <View style={styles.productCard}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <View style={styles.productInfo}>
                  <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
                  <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
                  <Text style={styles.productStore}>{product.store}</Text>
                </View>
              </View>
            </View>
            
            {/* Contact Information */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Contact Information</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="your.email@example.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>
            
            {/* Shipping Information */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Shipping Information</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder="John Doe"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Address</Text>
                <TextInput
                  style={styles.input}
                  value={address}
                  onChangeText={setAddress}
                  placeholder="123 Main St, Apt 4B"
                />
              </View>
              <View style={styles.rowInputs}>
                <View style={[styles.inputContainer, { flex: 2, marginRight: 8 }]}>
                  <Text style={styles.inputLabel}>City</Text>
                  <TextInput
                    style={styles.input}
                    value={city}
                    onChangeText={setCity}
                    placeholder="New York"
                  />
                </View>
                <View style={[styles.inputContainer, { flex: 1 }]}>
                  <Text style={styles.inputLabel}>ZIP Code</Text>
                  <TextInput
                    style={styles.input}
                    value={zipCode}
                    onChangeText={setZipCode}
                    placeholder="10001"
                    keyboardType="numeric"
                  />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Country</Text>
                <TextInput
                  style={styles.input}
                  value={country}
                  onChangeText={setCountry}
                  placeholder="United States"
                />
              </View>
            </View>
            
            {/* Shipping Method */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Shipping Method</Text>
              <TouchableOpacity
                style={[
                  styles.shippingOption,
                  shippingMethod === "standard" && styles.selectedOption
                ]}
                onPress={() => handleShippingMethodSelect("standard")}
              >
                <View style={styles.shippingOptionLeft}>
                  <View style={styles.radioButton}>
                    {shippingMethod === "standard" && <View style={styles.radioButtonSelected} />}
                  </View>
                  <View>
                    <Text style={styles.shippingOptionTitle}>Standard Shipping</Text>
                    <Text style={styles.shippingOptionDescription}>Delivery in 5-7 business days</Text>
                  </View>
                </View>
                <Text style={styles.shippingOptionPrice}>Free</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.shippingOption,
                  shippingMethod === "express" && styles.selectedOption
                ]}
                onPress={() => handleShippingMethodSelect("express")}
              >
                <View style={styles.shippingOptionLeft}>
                  <View style={styles.radioButton}>
                    {shippingMethod === "express" && <View style={styles.radioButtonSelected} />}
                  </View>
                  <View>
                    <Text style={styles.shippingOptionTitle}>Express Shipping</Text>
                    <Text style={styles.shippingOptionDescription}>Delivery in 2-3 business days</Text>
                  </View>
                </View>
                <Text style={styles.shippingOptionPrice}>$9.99</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.shippingOption,
                  shippingMethod === "next_day" && styles.selectedOption
                ]}
                onPress={() => handleShippingMethodSelect("next_day")}
              >
                <View style={styles.shippingOptionLeft}>
                  <View style={styles.radioButton}>
                    {shippingMethod === "next_day" && <View style={styles.radioButtonSelected} />}
                  </View>
                  <View>
                    <Text style={styles.shippingOptionTitle}>Next Day Delivery</Text>
                    <Text style={styles.shippingOptionDescription}>Delivery by tomorrow</Text>
                  </View>
                </View>
                <Text style={styles.shippingOptionPrice}>$19.99</Text>
              </TouchableOpacity>
            </View>
            
            {/* Payment Method */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Payment Method</Text>
              <View style={styles.paymentOptions}>
                <TouchableOpacity
                  style={[
                    styles.paymentOption,
                    paymentMethod === "credit_card" && styles.selectedPaymentOption
                  ]}
                  onPress={() => handlePaymentMethodSelect("credit_card")}
                >
                  <CreditCard size={24} color={paymentMethod === "credit_card" ? colors.primary : colors.text} />
                  <Text style={styles.paymentOptionText}>Credit Card</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[
                    styles.paymentOption,
                    paymentMethod === "paypal" && styles.selectedPaymentOption
                  ]}
                  onPress={() => handlePaymentMethodSelect("paypal")}
                >
                  <Text style={[styles.paymentOptionLogo, paymentMethod === "paypal" ? styles.selectedPaymentOptionText : {}]}>PayPal</Text>
                </TouchableOpacity>
                
                {Platform.OS === "ios" && (
                  <TouchableOpacity
                    style={[
                      styles.paymentOption,
                      paymentMethod === "apple_pay" && styles.selectedPaymentOption
                    ]}
                    onPress={() => handlePaymentMethodSelect("apple_pay")}
                  >
                    <Text style={[styles.paymentOptionLogo, paymentMethod === "apple_pay" ? styles.selectedPaymentOptionText : {}]}>Apple Pay</Text>
                  </TouchableOpacity>
                )}
                
                {Platform.OS === "android" && (
                  <TouchableOpacity
                    style={[
                      styles.paymentOption,
                      paymentMethod === "google_pay" && styles.selectedPaymentOption
                    ]}
                    onPress={() => handlePaymentMethodSelect("google_pay")}
                  >
                    <Text style={[styles.paymentOptionLogo, paymentMethod === "google_pay" ? styles.selectedPaymentOptionText : {}]}>Google Pay</Text>
                  </TouchableOpacity>
                )}
              </View>
              
              {paymentMethod === "credit_card" && (
                <View style={styles.creditCardForm}>
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Card Number</Text>
                    <TextInput
                      style={styles.input}
                      value={cardNumber}
                      onChangeText={handleCardNumberChange}
                      placeholder="1234 5678 9012 3456"
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={styles.rowInputs}>
                    <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
                      <Text style={styles.inputLabel}>Expiry Date</Text>
                      <TextInput
                        style={styles.input}
                        value={cardExpiry}
                        onChangeText={handleExpiryChange}
                        placeholder="MM/YY"
                        keyboardType="numeric"
                      />
                    </View>
                    <View style={[styles.inputContainer, { flex: 1 }]}>
                      <Text style={styles.inputLabel}>CVV</Text>
                      <TextInput
                        style={styles.input}
                        value={cardCvv}
                        onChangeText={handleCvvChange}
                        placeholder="123"
                        keyboardType="numeric"
                        secureTextEntry
                      />
                    </View>
                  </View>
                </View>
              )}
              
              <View style={styles.securePaymentNote}>
                <Lock size={16} color={colors.textSecondary} />
                <Text style={styles.securePaymentText}>Your payment information is secure and encrypted</Text>
              </View>
            </View>
            
            {/* Order Total */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Order Total</Text>
              <View style={styles.orderSummary}>
                <View style={styles.orderSummaryRow}>
                  <Text style={styles.orderSummaryLabel}>Subtotal</Text>
                  <Text style={styles.orderSummaryValue}>${subtotal.toFixed(2)}</Text>
                </View>
                <View style={styles.orderSummaryRow}>
                  <Text style={styles.orderSummaryLabel}>Shipping</Text>
                  <Text style={styles.orderSummaryValue}>
                    {shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}
                  </Text>
                </View>
                <View style={styles.orderSummaryRow}>
                  <Text style={styles.orderSummaryLabel}>Tax</Text>
                  <Text style={styles.orderSummaryValue}>${tax.toFixed(2)}</Text>
                </View>
                <View style={[styles.orderSummaryRow, styles.orderTotal]}>
                  <Text style={styles.orderTotalLabel}>Total</Text>
                  <Text style={styles.orderTotalValue}>${total.toFixed(2)}</Text>
                </View>
              </View>
            </View>
            
            {/* Place Order Button */}
            <Button
              title={processingPayment ? "Processing..." : "Place Order"}
              onPress={handlePlaceOrder}
              loading={processingPayment}
              disabled={processingPayment}
              style={styles.placeOrderButton}
            />
            
            {/* Order Policies */}
            <View style={styles.policiesContainer}>
              <View style={styles.policyItem}>
                <Truck size={16} color={colors.textSecondary} />
                <Text style={styles.policyText}>Free shipping on orders over $50</Text>
              </View>
              <View style={styles.policyItem}>
                <Calendar size={16} color={colors.textSecondary} />
                <Text style={styles.policyText}>30-day return policy</Text>
              </View>
              <View style={styles.policyItem}>
                <CheckCircle size={16} color={colors.textSecondary} />
                <Text style={styles.policyText}>Satisfaction guaranteed</Text>
              </View>
              <View style={styles.policyItem}>
                <MapPin size={16} color={colors.textSecondary} />
                <Text style={styles.policyText}>Shipping to over 100 countries</Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
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
    marginVertical: 16,
  },
  errorButton: {
    width: 200,
    marginTop: 16,
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
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    ...typography.bodySmall,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    ...typography.body,
    backgroundColor: colors.card,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  rowInputs: {
    flexDirection: "row",
    marginBottom: 16,
  },
  shippingOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedOption: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  shippingOptionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  shippingOptionTitle: {
    ...typography.body,
    fontWeight: "600",
  },
  shippingOptionDescription: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  shippingOptionPrice: {
    ...typography.body,
    fontWeight: "600",
  },
  paymentOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
    minWidth: 100,
  },
  selectedPaymentOption: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  paymentOptionText: {
    ...typography.body,
    marginLeft: 8,
  },
  selectedPaymentOptionText: {
    color: colors.primary,
  },
  paymentOptionLogo: {
    ...typography.body,
    fontWeight: "700",
  },
  creditCardForm: {
    marginTop: 8,
  },
  securePaymentNote: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  securePaymentText: {
    ...typography.caption,
    color: colors.textSecondary,
    marginLeft: 8,
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
  placeOrderButton: {
    margin: 16,
  },
  policiesContainer: {
    padding: 16,
    paddingTop: 0,
    marginBottom: 24,
  },
  policyItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  policyText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginLeft: 8,
  },
});