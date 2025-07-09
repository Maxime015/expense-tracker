import { styles } from "@/assets/styles/groceries.styles";
import { COLORS } from "../constants/colors";
import { ActivityIndicator, Text, View } from "react-native";

const SubLoad = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={COLORS.primary} />
      <Text style={styles.loadingText}>Loading your subscriptions...</Text>
    </View>
  );
};

export default SubLoad;