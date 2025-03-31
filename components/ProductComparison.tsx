import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { colors } from "../constants/colors";
import { typography } from "../constants/typography";
import { Product } from "../types/product";

interface ProductComparisonProps {
  products: Product[];
  features: string[];
}

export const ProductComparison: React.FC<ProductComparisonProps> = ({
  products,
  features,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI-Powered Comparison</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.table}>
          {/* Header row with product names */}
          <View style={styles.row}>
            <View style={styles.featureCell}>
              <Text style={styles.headerText}>Features</Text>
            </View>
            {products.map((product) => (
              <View key={product.id} style={styles.productCell}>
                <Text style={styles.headerText} numberOfLines={2}>
                  {product.name}
                </Text>
              </View>
            ))}
          </View>

          {/* Price row */}
          <View style={styles.row}>
            <View style={styles.featureCell}>
              <Text style={styles.featureText}>Price</Text>
            </View>
            {products.map((product) => (
              <View key={product.id} style={styles.productCell}>
                <Text style={styles.valueText}>${product.price.toFixed(2)}</Text>
                {product.originalPrice && (
                  <Text style={styles.discountText}>
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </Text>
                )}
              </View>
            ))}
          </View>

          {/* Rating row */}
          <View style={styles.row}>
            <View style={styles.featureCell}>
              <Text style={styles.featureText}>Rating</Text>
            </View>
            {products.map((product) => (
              <View key={product.id} style={styles.productCell}>
                <Text style={styles.valueText}>
                  ★ {product.rating.toFixed(1)} ({product.reviewCount})
                </Text>
              </View>
            ))}
          </View>

          {/* Feature rows */}
          {features.map((feature, index) => (
            <View key={index} style={styles.row}>
              <View style={styles.featureCell}>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
              {products.map((product) => (
                <View key={product.id} style={styles.productCell}>
                  <Text style={styles.valueText}>
                    {Math.random() > 0.3 ? "✓" : "✗"}
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    ...typography.h3,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  table: {
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 16,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  featureCell: {
    width: 120,
    padding: 12,
    backgroundColor: colors.card,
    justifyContent: "center",
  },
  productCell: {
    width: 120,
    padding: 12,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    ...typography.body,
    fontWeight: "600",
    textAlign: "center",
  },
  featureText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  valueText: {
    ...typography.body,
    textAlign: "center",
  },
  discountText: {
    ...typography.caption,
    color: colors.success,
    marginTop: 4,
  },
});