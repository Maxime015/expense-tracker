import { styles } from "@/assets/styles/groceries.styles";
import { ActivityIndicator, Text, View } from "react-native";
import { useThemeStore } from "@/store/themeStore"; // ✅ Thème dynamique

const PageLoader = () => {
  const COLORS = useThemeStore().getCurrentTheme(); // ✅ Récupère le thème actuel

  return (
    <View style={[styles.loadingContainer, { backgroundColor: COLORS.background }]}>
      <ActivityIndicator size="large" color={COLORS.textLight} />
      <Text style={[styles.loadingText, { color: COLORS.text }]}>
        Loading your transactions...
      </Text>
    </View>
  );
};

export default PageLoader;
