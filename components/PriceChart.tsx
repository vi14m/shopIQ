import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { PriceHistory } from "../types/product";
import { colors } from "../constants/colors";
import { typography } from "../constants/typography";

interface PriceChartProps {
  priceHistory: PriceHistory[];
  currentPrice: number;
}

export const PriceChart: React.FC<PriceChartProps> = ({
  priceHistory,
  currentPrice,
}) => {
  const screenWidth = Dimensions.get("window").width - 48; // Accounting for padding
  const maxPrice = Math.max(...priceHistory.map((item) => item.price), currentPrice);
  const minPrice = Math.min(...priceHistory.map((item) => item.price), currentPrice);
  const priceRange = maxPrice - minPrice;
  
  // Add padding to the price range to make the chart look better
  const paddedMaxPrice = maxPrice + priceRange * 0.1;
  const paddedMinPrice = Math.max(0, minPrice - priceRange * 0.1);
  const paddedPriceRange = paddedMaxPrice - paddedMinPrice;

  const getYPosition = (price: number) => {
    const chartHeight = 150;
    return chartHeight - ((price - paddedMinPrice) / paddedPriceRange) * chartHeight;
  };

  const getXPosition = (index: number) => {
    const chartWidth = screenWidth - 40; // Accounting for padding and labels
    return (index / (priceHistory.length - 1)) * chartWidth + 40; // Add 40px for y-axis labels
  };

  // Generate path for the line chart
  const generatePath = () => {
    let path = "";
    priceHistory.forEach((item, index) => {
      const x = getXPosition(index);
      const y = getYPosition(item.price);
      if (index === 0) {
        path += `M ${x} ${y}`;
      } else {
        path += ` L ${x} ${y}`;
      }
    });
    return path;
  };

  // Format date for x-axis labels
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short" });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Price History</Text>
      <View style={styles.chartContainer}>
        {/* Y-axis labels */}
        <View style={styles.yAxisLabels}>
          <Text style={styles.axisLabel}>${paddedMaxPrice.toFixed(0)}</Text>
          <Text style={styles.axisLabel}>${((paddedMaxPrice + paddedMinPrice) / 2).toFixed(0)}</Text>
          <Text style={styles.axisLabel}>${paddedMinPrice.toFixed(0)}</Text>
        </View>
        
        {/* Chart area */}
        <View style={styles.chart}>
          {/* Horizontal grid lines */}
          <View style={[styles.gridLine, { top: 0 }]} />
          <View style={[styles.gridLine, { top: 75 }]} />
          <View style={[styles.gridLine, { top: 150 }]} />
          
          {/* Price line */}
          <View style={styles.lineContainer}>
            {priceHistory.map((item, index) => (
              <React.Fragment key={index}>
                <View
                  style={[
                    styles.dataPoint,
                    {
                      left: getXPosition(index) - 4,
                      top: getYPosition(item.price) - 4,
                    },
                  ]}
                />
                {index < priceHistory.length - 1 && (
                  <View
                    style={[
                      styles.line,
                      {
                        left: getXPosition(index),
                        top: getYPosition(item.price),
                        width: getXPosition(index + 1) - getXPosition(index),
                        height: 2,
                        transform: [
                          {
                            rotate: `${Math.atan2(
                              getYPosition(priceHistory[index + 1].price) - getYPosition(item.price),
                              getXPosition(index + 1) - getXPosition(index)
                            )}rad`,
                          },
                        ],
                      },
                    ]}
                  />
                )}
              </React.Fragment>
            ))}
          </View>
          
          {/* Current price indicator */}
          <View
            style={[
              styles.currentPriceIndicator,
              {
                top: getYPosition(currentPrice) - 12,
              },
            ]}
          >
            <Text style={styles.currentPriceText}>${currentPrice.toFixed(2)}</Text>
          </View>
        </View>
      </View>
      
      {/* X-axis labels */}
      <View style={styles.xAxisLabels}>
        {priceHistory.map((item, index) => (
          <Text
            key={index}
            style={[
              styles.axisLabel,
              {
                position: "absolute",
                left: getXPosition(index) - 20,
              },
            ]}
          >
            {formatDate(item.date)}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  title: {
    ...typography.h3,
    marginBottom: 16,
  },
  chartContainer: {
    flexDirection: "row",
    height: 150,
    marginBottom: 24,
  },
  yAxisLabels: {
    width: 40,
    height: 150,
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingRight: 8,
  },
  chart: {
    flex: 1,
    height: 150,
    position: "relative",
  },
  gridLine: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: colors.border,
  },
  lineContainer: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  line: {
    position: "absolute",
    height: 2,
    backgroundColor: colors.primary,
    transformOrigin: "left center",
  },
  dataPoint: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  currentPriceIndicator: {
    position: "absolute",
    right: 0,
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  currentPriceText: {
    color: colors.background,
    fontSize: 12,
    fontWeight: "600",
  },
  xAxisLabels: {
    height: 20,
    position: "relative",
    marginLeft: 40,
  },
  axisLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});