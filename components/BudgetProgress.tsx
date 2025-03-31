import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { colors } from "../constants/colors";
import { typography } from "../constants/typography";
import { Budget } from "../types/product";

interface BudgetProgressProps {
  budget: Budget;
}

export const BudgetProgress: React.FC<BudgetProgressProps> = ({ budget }) => {
  const percentage = (budget.spent / budget.total) * 100;
  const isOverBudget = budget.spent > budget.total;
  
  const getProgressColor = () => {
    if (isOverBudget) return colors.error;
    if (percentage > 80) return colors.warning;
    return colors.success;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Shopping Budget</Text>
        <Text style={styles.amount}>
          ${budget.spent.toFixed(2)} / ${budget.total.toFixed(2)}
        </Text>
      </View>
      <View style={styles.progressContainer}>
        <View style={styles.progressBackground}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${Math.min(percentage, 100)}%`,
                backgroundColor: getProgressColor(),
              },
            ]}
          />
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.remaining}>
          {isOverBudget ? (
            <Text style={[styles.remainingText, { color: colors.error }]}>
              ${Math.abs(budget.remaining).toFixed(2)} over budget
            </Text>
          ) : (
            <Text style={styles.remainingText}>
              ${budget.remaining.toFixed(2)} remaining
            </Text>
          )}
        </Text>
        <Text style={styles.percentageText}>
          {percentage.toFixed(0)}% used
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    ...typography.h4,
  },
  amount: {
    ...typography.body,
    fontWeight: "600",
  },
  progressContainer: {
    marginBottom: 8,
  },
  progressBackground: {
    height: 8,
    backgroundColor: colors.card,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  remaining: {
    ...typography.bodySmall,
  },
  remainingText: {
    fontWeight: "500",
  },
  percentageText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
});