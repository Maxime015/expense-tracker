import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { styles } from "../assets/styles/home.styles";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";

const NoTransactionsFound = () => {
  const router = useRouter();

  return (
    <View style={styles.emptyState}>
      <Ionicons
        name="receipt-outline"
        size={60}
        color={COLORS.textLight}
        style={styles.emptyStateIcon}
      />
      <Text style={styles.emptyStateTitle}>No Transactions Yet</Text>
      <Text style={styles.emptyStateText}>
        Start tracking your finances by adding your first transaction
      </Text>
      <TouchableOpacity
        style={styles.emptyStateButton}
        onPress={() => router.push("/create")}
      >
        <Ionicons name="add-circle" size={18} color={COLORS.white} />
        <Text style={styles.emptyStateButtonText}>Add Transactions</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NoTransactionsFound;
