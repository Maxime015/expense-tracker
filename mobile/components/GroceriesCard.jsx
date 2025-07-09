import { View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { styles } from "../assets/styles/GroceriesCard.styles";
import { COLORS } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";

const GroceriesCard = ({ groceriesSummary, onClearAll }) => {
  const total = groceriesSummary?.total || 0;
  const completed = groceriesSummary?.completed || 0;
  const active = total - completed;

  const handleClearAll = () => {
  console.log("Clear all triggered"); // Debug log
  if (!onClearAll) {
    console.error("onClearAll function is not available");
    Alert.alert("Error", "Delete function not available");
    return;
  }

  Alert.alert(
    "Clear All Groceries",
    "Are you sure you want to delete all groceries?",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete All", 
        style: "destructive",
        onPress: async () => {
          try {
            console.log("Attempting to clear all groceries...");
            const success = await onClearAll();
            if (success) {
              Alert.alert("Success", "All groceries deleted");
            }
          } catch (error) {
            console.error("Error in clear all:", error);
            Alert.alert("Error", error.message || "Failed to delete groceries");
          }
        },
      },
    ]
  );
};

  return (
    <View style={styles.totalCard}>
      <View style={styles.totalStats}>
        <View style={styles.totalStatItem}>
          <Text style={styles.totalStatLabel}>Total</Text>
          <Text style={[styles.totalStatAmount, { color: COLORS.textLight }]}>
            {total}
          </Text>
        </View>

        <View style={styles.totalstatDivider} />

        <View style={styles.totalStatItem}>
          <Text style={styles.totalStatLabel}>Completed</Text>
          <Text style={[styles.totalStatAmount, { color: COLORS.success }]}>
            {completed}
          </Text>
        </View>

        <View style={styles.totalstatDivider} />

        <View style={styles.totalStatItem}>
          <Text style={styles.totalStatLabel}>Active</Text>
          <Text style={[styles.totalStatAmount, { color: COLORS.expense }]}>
            {active}
          </Text>
        </View>

        <View style={styles.totalstatDivider} />

        <View style={styles.iconItem}>
          <TouchableOpacity onPress={handleClearAll} activeOpacity={0.7}>
            <Ionicons name="trash" size={25} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default GroceriesCard;