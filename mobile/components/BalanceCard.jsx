import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Correct import for Ionicons
import React from "react";
import { styles } from "../assets/styles/home.styles";
import { COLORS } from "../constants/colors";
import { useRouter } from "expo-router";

const BalanceCard = ({ summary }) => {
  const router = useRouter();
  return (
    <View style={styles.balanceCard}>
      <Text style={styles.balanceTitle}>Total Balance</Text>
      <TouchableOpacity
        style={styles.Button}
        onPress={() => router.push("/groceries")}
      >
        <Ionicons name="flash-outline" size={20} color="#FFF" />
        <Text style={styles.addButtonText}>Groceries</Text>
      </TouchableOpacity>
      <Text style={styles.balanceAmount}>
        ${parseFloat(summary.balance).toFixed(2)}
      </Text>
      <View style={styles.balanceStats}>
        <View style={styles.balanceStatItem}>
          <Text style={styles.balanceStatLabel}>Income</Text>
          <Text style={[styles.balanceStatAmount, { color: COLORS.income }]}>
            +${parseFloat(summary.income).toFixed(2)}
          </Text>
        </View>
        <View style={[styles.balanceStatItem, styles.statDivider]} />
        <View style={styles.balanceStatItem}>
          <Text style={styles.balanceStatLabel}>Expenses</Text>
          <Text style={[styles.balanceStatAmount, { color: COLORS.expense }]}>
            -${Math.abs(parseFloat(summary.expenses)).toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default BalanceCard;