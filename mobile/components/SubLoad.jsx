import { styles } from "@/assets/styles/groceries.styles";
import { useThemeStore } from "@/store/themeStore"; // ✅ Thème dynamique
import { ActivityIndicator, Text, View } from "react-native";

const SubLoad = () => {
  const COLORS = useThemeStore().getCurrentTheme(); // ✅ Récupère le thème actuel

  return (
    <View style={[styles.loadingContainer, { backgroundColor: COLORS.background }]}>
      <ActivityIndicator size="large" color={COLORS.textLight} />
         <Text style={[styles.loadingText, { color: COLORS.text }]}>Loading your subscriptions...</Text>
    </View>
  );
};

export default SubLoad;