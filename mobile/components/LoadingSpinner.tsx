import { styles } from "@/assets/styles/groceries.styles";
import { useThemeStore } from "@/store/themeStore"; // ✅ Thème dynamique
import { ActivityIndicator, Text, View } from "react-native";

const LoadingSpinner = () => {
  const COLORS = useThemeStore().getCurrentTheme(); // ✅ Récupère le thème actuel

  return (
    <View style={[styles.loadingContainer, { backgroundColor: COLORS.background }]}>
      <ActivityIndicator size="large" color={COLORS.textLight} />
      <Text style={[styles.loadingText, { color: COLORS.text }]}>Loading your groceries...</Text>
    </View>
  );
};

export default LoadingSpinner;