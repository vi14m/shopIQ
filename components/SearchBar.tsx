import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { Search, Mic, Camera } from "lucide-react-native";
import { colors } from "../constants/colors";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit?: () => void;
  onVoiceSearch?: () => void;
  onImageSearch?: () => void;
  placeholder?: string;
  style?: ViewStyle;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onSubmit,
  onVoiceSearch,
  onImageSearch,
  placeholder = "Search products, brands, and more...",
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.searchContainer}>
        <Search size={20} color={colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          returnKeyType="search"
          onSubmitEditing={onSubmit}
        />
        {value.length > 0 && (
          <TouchableOpacity
            onPress={() => onChangeText("")}
            style={styles.clearButton}
          >
            <View style={styles.clearIcon}>
              <View style={styles.clearIconLine1} />
              <View style={styles.clearIconLine2} />
            </View>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onVoiceSearch}
        >
          <Mic size={20} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onImageSearch}
        >
          <Camera size={20} color={colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    color: colors.text,
  },
  clearButton: {
    padding: 8,
  },
  clearIcon: {
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  clearIconLine1: {
    position: "absolute",
    width: 16,
    height: 2,
    backgroundColor: colors.textSecondary,
    transform: [{ rotate: "45deg" }],
  },
  clearIconLine2: {
    position: "absolute",
    width: 16,
    height: 2,
    backgroundColor: colors.textSecondary,
    transform: [{ rotate: "-45deg" }],
  },
  actionButtons: {
    flexDirection: "row",
    marginLeft: 8,
  },
  actionButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.card,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
});