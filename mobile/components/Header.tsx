import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import GroceriesCard from "./GroceriesCard";
import { useThemeStore } from "@/store/themeStore"; // ✅ Thème dynamique
import { useGroceries } from "../hooks/useGroceries";
import { useEffect } from "react";
import FeatherIcon from "react-native-vector-icons/Feather";
import { COLORS } from "../constants/colors";

interface HeaderProps {
  groceriesSummary: {
    total: number;
    completed: number;
  };
}

const Header = ({ groceriesSummary }: HeaderProps) => {
  const COLORS = useThemeStore().getCurrentTheme(); // ✅ Récupère le thème actuel

  const { total, completed } = groceriesSummary;
  const progressPercentage = total > 0 ? (completed / total) * 100 : 0;
  const router = useRouter();
  const { user } = useUser();
  const emailPrefix = user?.emailAddresses[0]?.emailAddress.split("@")[0] || "User";
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/png?seed=${emailPrefix}&radius=50&backgroundColor=b6e3f4,c0aede,d1d4f9`;

  const userId = user?.id;
  const { clearAllGroceries } = useGroceries(userId);

useEffect(() => {
  console.log("Current user ID:", user?.id); // Vérifiez dans la console
}, [user]);

  return (
    <View>
      {/* Header Card with avatar and user info */}
      <View style={localStyles.headerCard}>
        <View style={localStyles.headerContent}>

          <TouchableOpacity
                    onPress={() => router.back()} 
                    style={localStyles.headerAction}>
                    <FeatherIcon
                      color="#F82E08"
                      name="arrow-left"
                      size={24} />
          </TouchableOpacity>

          <Image
            source={{ uri: avatarUrl }}
            style={localStyles.avatar}
            accessibilityLabel="User avatar"
          />
          <View style={localStyles.greeting}>
            <Text style={localStyles.welcomeText}>Welcome, 🎯</Text>
            <Text style={localStyles.username} numberOfLines={1} ellipsizeMode="tail">
              {emailPrefix}
            </Text>
          </View>

          <TouchableOpacity
            style={localStyles.sub}
            onPress={() => router.push("/subscription")}
          >
            <Ionicons name="calendar-outline" size={20} color="#FFF" />
           
          </TouchableOpacity>

          <TouchableOpacity
            style={localStyles.addButton}
            onPress={() => router.push("/")}
          >
            <Ionicons name="swap-horizontal" size={20} color="#FFF" />
           
          </TouchableOpacity>
        </View>
      </View>

      <View style={localStyles.TotalCard}>
        <GroceriesCard groceriesSummary={groceriesSummary} 
        onClearAll={clearAllGroceries}
        />
      </View>

      {/* Groceries progress section */}
      <View style={localStyles.groceriesSection}>
        <Text style={[localStyles.loadingText, { color: COLORS.text }]}>Today's Groceries 👀</Text>
        <Text style={localStyles.subtitle}>
          {completed} of {total} completed
        </Text>

        <View style={localStyles.progressBarContainer}>
          <View style={localStyles.progressBar}>
            <View
              style={[
                localStyles.progressFill,
                {
                  width: `${progressPercentage}%`,
                  backgroundColor: COLORS.success,
                },
              ]}
              testID="progress-fill"
            />
          </View>
          <Text style={localStyles.progressText}>
            {Math.round(progressPercentage)}%
          </Text>
        </View>
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
    sub: {
    width: 45,
    height: 45,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.success,
    marginBottom: 4,
  },
    headerAction: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffdada',
    marginBottom: 4,
  },
  TotalCard: {
    position: "relative",
    bottom: 35,
    marginBottom: 10,
    marginHorizontal: 16,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    color: COLORS.white,
    fontWeight: "600",
    marginLeft: 4,
  },
  headerCard: {
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    position: "relative",
    bottom: 45,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  greeting: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 2,
  },
  username: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
    maxWidth: 150,
  },
  groceriesSection: {
    marginTop: 20,
    marginHorizontal: 16,
    position: "relative",
    bottom: 60,
  },
  
  loadingText: {
   fontSize: 20,
    fontWeight: "600",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  progressBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: -40,
  },
  progressBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.border,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  progressText: {
    minWidth: 40,
    fontWeight: "600",
    fontSize: 14,
    color: COLORS.success,
    textAlign: "right",
    
  },
});

export default Header;