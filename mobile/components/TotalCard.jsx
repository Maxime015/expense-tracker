import { View, Text } from "react-native";
import React from "react";
import { styles } from "../assets/styles/totalCard.styles";
import { COLORS } from "../constants/colors";

const TotalCard = ({ subscriptionSummary }) => {
  const total = parseFloat(subscriptionSummary?.total ?? 0).toFixed(2);
  const count = Math.abs(parseInt(subscriptionSummary?.count ?? 0, 10));

  return (
    <View style={styles.totalCard}>
      <View style={styles.totalStats}>
        <View style={styles.totalStatItem}>
          <Text style={styles.totalStatLabel}>Total Amount</Text>
          <Text style={[styles.totalStatAmount, { color: COLORS.amount }]}>
            +${total}
          </Text>
        </View>

        <View style={styles.totalstatDivider} />

        <View style={styles.totalStatItem}>
          <Text style={styles.totalStatLabel}>Subs Count</Text>
          <Text style={[styles.totalStatAmount, { color: COLORS.count }]}>
            {count}
          </Text>

        </View>
      </View>
    </View>
  );
};

export default TotalCard;
