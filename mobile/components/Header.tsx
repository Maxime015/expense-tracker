import { StyleSheet, Text, View, Image } from "react-native";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { SignOutButton } from "./SignOutButton";
import { COLORS } from "../constants/colors";
import { styles } from "@/assets/styles/home.styles";

interface HeaderProps {
  groceriesSummary: {
    total: number;
    completed: number;
  };
}

const Header = ({ groceriesSummary }: HeaderProps) => {
  const { total, completed } = groceriesSummary;
  const progressPercentage = total > 0 ? (completed / total) * 100 : 0;
  const router = useRouter();
  const { user } = useUser();
  const emailPrefix = user?.emailAddresses[0]?.emailAddress.split("@")[0] || "User";
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/png?seed=${emailPrefix}&radius=50&backgroundColor=b6e3f4,c0aede,d1d4f9`;

  return (
    <View style={styles.container}>
      {/* Header avec avatar et actions */}
      <View style={localStyles.headerCard}>
        <View style={localStyles.headerContent}>
          <Image
            source={{ uri: avatarUrl }}
            style={localStyles.avatar}
          />
          <View style={localStyles.greeting}>
            <Text style={localStyles.welcomeText}>Welcome,</Text>
            <Text style={localStyles.username}>{emailPrefix}</Text>
          </View>
  
          <SignOutButton />
        </View>
      </View>

      {/* Section de suivi des courses */}
      <View style={localStyles.groceriesSection}>
        <Text style={localStyles.title}>Today's Groceries 👀</Text>
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
                  backgroundColor: COLORS.success || COLORS.income,
                },
              ]}
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
  headerCard: {
  marginHorizontal: 16,
  marginTop: -35, // Changé de -35 à 16
  padding: 16,
  borderRadius: 16,
  backgroundColor: "#FFF",
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 10,
  elevation: 4,
},
groceriesSection: {
  marginTop: 16, // Réduit de 20 à 16
  marginHorizontal: 16,
  marginBottom: 16, // Ajouté pour l'espace
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
  },
  greeting: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  username: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    color: COLORS.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textLight,
    marginBottom: 12,
  },
  progressBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.border,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 6,
  },
  progressText: {
    minWidth: 40,
    fontWeight: "600",
    fontSize: 14,
    color: COLORS.success || COLORS.income,
    textAlign: "right",
  },
});

export default Header;
