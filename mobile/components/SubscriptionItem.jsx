import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";
import { styles } from "../assets/styles/Item.styles";
import { formatDate } from "../lib/utils";

const recurrenceLabels = {
  monthly: "Mensuel",
  yearly: "Annuel",
  weekly: "Hebdomadaire",
};

const SubscriptionItem = ({ item, onDelete }) => {
  return (
    <View style={styles.subscriptionCard} key={item.id}>
      <TouchableOpacity style={styles.subscriptionContent}>
        {/* Icône ou image */}
        <View style={styles.subscriptionIconContainer}>
          {item.image_url ? (
            <Image
              source={{ uri: item.image_url }}
              style={styles.subscriptionImage}
              resizeMode="cover"
            />
          ) : (
            <Ionicons 
              name="pricetag-outline" 
              size={28}  // Taille d'icône augmentée
              color={COLORS.primary} 
            />
          )}
        </View>

        {/* Reste du code inchangé */}
        <View style={styles.subscriptionLeft}>
          <Text style={styles.subscriptionTitle}>{item.label}</Text>
          <Text style={styles.subscriptionRecurrence}>
            {recurrenceLabels[item.recurrence] || "Inconnu"}
          </Text>
        </View>

        <View style={styles.subscriptionRight}>
          <Text style={styles.subscriptionAmount}>
            -${parseFloat(item.amount).toFixed(2)}
          </Text>
          <Text style={styles.subscriptionDate}>{formatDate(item.date)}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.subscriptionDeleteButton}
        onPress={() => onDelete(item.id)}
      >
        <Ionicons 
          name="trash-outline" 
          size={25} 
          color={COLORS.expense} 
        />
      </TouchableOpacity>
    </View>
  );
};

export default SubscriptionItem;