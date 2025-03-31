import React from "react";
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import { colors } from "../constants/colors";
import { typography } from "../constants/typography";
import * as Icons from "lucide-react-native";

interface CategoryButtonProps {
  name: string;
  icon: string;
  isSelected?: boolean;
  onPress: () => void;
  style?: ViewStyle;
}

export const CategoryButton: React.FC<CategoryButtonProps> = ({
  name,
  icon,
  isSelected = false,
  onPress,
  style,
}) => {
  // Dynamically get the icon component
  const IconComponent = (Icons as any)[icon] || Icons.ShoppingBag;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isSelected ? styles.selectedButton : styles.unselectedButton,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <IconComponent
        size={20}
        color={isSelected ? colors.primary : colors.textSecondary}
        strokeWidth={isSelected ? 2.5 : 2}
      />
      <Text
        style={[
          styles.text,
          isSelected ? styles.selectedText : styles.unselectedText,
        ]}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  selectedButton: {
    backgroundColor: colors.primaryLight,
  },
  unselectedButton: {
    backgroundColor: colors.card,
  },
  text: {
    marginLeft: 6,
    ...typography.bodySmall,
  },
  selectedText: {
    color: colors.primary,
    fontWeight: "600",
  },
  unselectedText: {
    color: colors.textSecondary,
  },
});