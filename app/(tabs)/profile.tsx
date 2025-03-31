import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import {
  User,
  Settings,
  CreditCard,
  Bell,
  ShieldCheck,
  HelpCircle,
  LogOut,
  ChevronRight,
  Heart,
  BarChart2,
  Clock,
  ShoppingBag,
} from "lucide-react-native";
import { colors } from "../../constants/colors";
import { typography } from "../../constants/typography";

export default function ProfileScreen() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);
  const [biometricsEnabled, setBiometricsEnabled] = React.useState(true);

  const handleToggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handleToggleDarkMode = () => {
    setDarkModeEnabled(!darkModeEnabled);
  };

  const handleToggleBiometrics = () => {
    setBiometricsEnabled(!biometricsEnabled);
  };

  const navigateTo = (route: string) => {
    router.push(route);
  };

  const renderMenuItem = (
    icon: React.ReactNode,
    title: string,
    subtitle?: string,
    rightElement?: React.ReactNode,
    onPress?: () => void
  ) => {
    return (
      <TouchableOpacity
        style={styles.menuItem}
        onPress={onPress}
        disabled={!onPress}
      >
        <View style={styles.menuIconContainer}>{icon}</View>
        <View style={styles.menuTextContainer}>
          <Text style={styles.menuTitle}>{title}</Text>
          {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
        </View>
        {rightElement || <ChevronRight size={20} color={colors.textSecondary} />}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
              }}
              style={styles.profileImage}
            />
          </View>
          <Text style={styles.profileName}>Sarah Johnson</Text>
          <Text style={styles.profileEmail}>sarah.johnson@example.com</Text>
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Activity Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Activity</Text>
          <View style={styles.activityGrid}>
            <TouchableOpacity 
              style={styles.activityItem}
              onPress={() => navigateTo("/wishlist")}
            >
              <View style={[styles.activityIcon, { backgroundColor: colors.primaryLight }]}>
                <Heart size={20} color={colors.primary} />
              </View>
              <Text style={styles.activityText}>Wishlist</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.activityItem}
              onPress={() => navigateTo("/tracking")}
            >
              <View style={[styles.activityIcon, { backgroundColor: colors.secondaryLight }]}>
                <BarChart2 size={20} color={colors.secondary} />
              </View>
              <Text style={styles.activityText}>Tracking</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.activityItem}
              onPress={() => navigateTo("/history")}
            >
              <View style={[styles.activityIcon, { backgroundColor: "#E0F2F1" }]}>
                <Clock size={20} color="#009688" />
              </View>
              <Text style={styles.activityText}>History</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.activityItem}
              onPress={() => navigateTo("/orders")}
            >
              <View style={[styles.activityIcon, { backgroundColor: "#FFF3E0" }]}>
                <ShoppingBag size={20} color="#FF9800" />
              </View>
              <Text style={styles.activityText}>Orders</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          {renderMenuItem(
            <User size={20} color={colors.primary} />,
            "Account Settings",
            "Manage your account details"
          )}
          {renderMenuItem(
            <CreditCard size={20} color={colors.primary} />,
            "Payment Methods",
            "Manage your payment options"
          )}
          {renderMenuItem(
            <Bell size={20} color={colors.primary} />,
            "Notifications",
            "Get alerts about price drops",
            <Switch
              value={notificationsEnabled}
              onValueChange={handleToggleNotifications}
              trackColor={{ false: colors.border, true: colors.primary + "80" }}
              thumbColor={notificationsEnabled ? colors.primary : "#f4f3f4"}
            />
          )}
          {renderMenuItem(
            <Settings size={20} color={colors.primary} />,
            "Appearance",
            "Dark mode",
            <Switch
              value={darkModeEnabled}
              onValueChange={handleToggleDarkMode}
              trackColor={{ false: colors.border, true: colors.primary + "80" }}
              thumbColor={darkModeEnabled ? colors.primary : "#f4f3f4"}
            />
          )}
          {renderMenuItem(
            <ShieldCheck size={20} color={colors.primary} />,
            "Privacy & Security",
            "Biometric authentication",
            <Switch
              value={biometricsEnabled}
              onValueChange={handleToggleBiometrics}
              trackColor={{ false: colors.border, true: colors.primary + "80" }}
              thumbColor={biometricsEnabled ? colors.primary : "#f4f3f4"}
            />
          )}
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          {renderMenuItem(
            <HelpCircle size={20} color={colors.primary} />,
            "Help Center",
            "Get help with your purchases"
          )}
          {renderMenuItem(
            <HelpCircle size={20} color={colors.primary} />,
            "About ShopIQ",
            "Version 1.0.0"
          )}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <LogOut size={20} color={colors.error} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  profileHeader: {
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  profileName: {
    ...typography.h2,
    marginBottom: 4,
  },
  profileEmail: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  editProfileButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: colors.primaryLight,
  },
  editProfileText: {
    ...typography.body,
    color: colors.primary,
    fontWeight: "600",
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: 16,
  },
  activityGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  activityItem: {
    width: "48%",
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
  },
  activityIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  activityText: {
    ...typography.body,
    fontWeight: "500",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.card,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    ...typography.body,
    fontWeight: "500",
  },
  menuSubtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    marginVertical: 24,
    marginHorizontal: 16,
    borderRadius: 12,
    backgroundColor: colors.card,
  },
  logoutText: {
    ...typography.body,
    color: colors.error,
    fontWeight: "600",
    marginLeft: 8,
  },
});