import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";
import { styles } from "../assets/styles/home.styles";
import { formatDate } from "../lib/utils";

const recurrenceLabels = {
  monthly: "Mensuel",
  yearly: "Annuel",
  weekly: "Hebdomadaire",
};

const SubscriptionItem = ({ item, onDelete }) => {
  return (
    <View style={styles.transactionCard} key={item.id}>
      <TouchableOpacity style={styles.transactionContent}>
        {/* Image si elle existe, sinon une icône de substitution */}
        <View style={styles.categoryIconContainer}>
          {item.image_url ? (
            <Image
              source={{ uri: item.image_url }}
              style={{ width: 28, height: 28, borderRadius: 5 }}
              resizeMode="contain"
            />
          ) : (
            <Ionicons name="pricetag-outline" size={24} color={COLORS.primary} />
          )}
        </View>

        {/* Infos principales */}
        <View style={styles.transactionLeft}>
          <Text style={styles.transactionTitle}>{item.label}</Text>
          <Text style={styles.transactionCategory}>
            {recurrenceLabels[item.recurrence] || "Inconnu"}
          </Text>
        </View>

        {/* Montant et date */}
        <View style={styles.transactionRight}>
          <Text style={[styles.transactionAmount, { color: COLORS.expense }]}>
            -${parseFloat(item.amount).toFixed(2)}
          </Text>
          <Text style={styles.transactionDate}>{formatDate(item.date)}</Text>
        </View>
      </TouchableOpacity>

      {/* Bouton suppression */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(item.id)}
      >
        <Ionicons name="trash-outline" size={20} color={COLORS.expense} />
      </TouchableOpacity>
    </View>
  );
};

export default SubscriptionItem;
