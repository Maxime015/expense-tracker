import { styles } from "@/assets/styles/groceries.styles";
import { COLORS } from "../constants/colors";
import { ActivityIndicator, Text, View } from "react-native";

const LoadingSpinner = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={COLORS.primary} />
      <Text style={styles.loadingText}>Loading your groceries...</Text>
    </View>
  );
};

export default LoadingSpinner;