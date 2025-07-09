import { styles } from "@/assets/styles/groceries.styles";
import { COLORS } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import React from "react";

const EmptyState = () => {
  return (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <Ionicons 
          name="cart-outline" 
          size={60} 
          color={COLORS.textLight} 
          testID="empty-cart-icon"
        />
      </View>
      {typeof "No groceries yet!" === 'string' && (
        <Text style={styles.emptyText}>No groceries yet!</Text>
      )}
      {typeof "Add your first item above to get started" === 'string' && (
        <Text style={styles.emptySubtext}>Add your first item above to get started</Text>
      )}
    </View>
  );
};

export default React.memo(EmptyState);