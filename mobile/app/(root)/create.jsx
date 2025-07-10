import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { API_URL } from "../../constants/api";
import { styles } from "../../assets/styles/create.styles.js";
import { Ionicons } from "@expo/vector-icons";
import { useThemeStore } from "../../store/themeStore"; // ✅ thème dynamique

const CATEGORIES = [
  { id: "food", name: "Foods & Drinks", icon: "fast-food" },
  { id: "shopping", name: "Shopping", icon: "cart" },
  { id: "transportation", name: "Transportation", icon: "car" },
  { id: "entertainment", name: "Entertainment", icon: "film" },
  { id: "bills", name: "Bills", icon: "receipt" },
  { id: "income", name: "Income", icon: "cash" },
  { id: "health", name: "Health", icon: "medkit" },
  { id: "education", name: "Education", icon: "school" },
  { id: "travel", name: "Travel", icon: "airplane" },
  { id: "gifts", name: "Gifts & Donations", icon: "gift" },
  { id: "subscriptions", name: "Subscriptions", icon: "albums" },
  { id: "home", name: "Home & Rent", icon: "home" },
  { id: "saving", name: "Savings", icon: "wallet" },
  { id: "investment", name: "Investments", icon: "trending-up" },
  { id: "tax", name: "Taxes", icon: "document-text" },
  { id: "pets", name: "Pets", icon: "paw" },
  { id: "other", name: "Other", icon: "ellipsis-horizontal" },
];

const CreateScreen = () => {
  const router = useRouter();
  const { user } = useUser();
  const COLORS = useThemeStore().getCurrentTheme(); // ✅ thème dynamique

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isExpense, setIsExpense] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async () => {
    if (!title.trim()) return Alert.alert("Error", "Please enter a transaction title");
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0)
      return Alert.alert("Error", "Please enter a valid amount");
    if (!selectedCategory)
      return Alert.alert("Error", "Please select a category");

    setIsLoading(true);
    try {
      const formattedAmount = isExpense
        ? -Math.abs(parseFloat(amount))
        : Math.abs(parseFloat(amount));

      const response = await fetch(`${API_URL}/transactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          title,
          amount: formattedAmount,
          category: selectedCategory,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create transaction");
      }

      Alert.alert("Success", "Transaction created successfully");
      router.back();
    } catch (error) {
      Alert.alert("Error", error.message || "Transaction failed");
      console.log("Error creating transaction:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: COLORS.background }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: COLORS.text }]}>New Transaction</Text>
        <TouchableOpacity
          style={[
            styles.saveButtonContainer,
            isLoading && styles.saveButtonDisabled,
          ]}
          onPress={handleCreate}
          disabled={isLoading}
        >
          <Text style={[styles.saveButton, { color: COLORS.primary }]}>
            {isLoading ? "Saving" : "Save"}
          </Text>
          {!isLoading && (
            <Ionicons name="checkmark" size={18} color={COLORS.primary} />
          )}
        </TouchableOpacity>
      </View>

      <View style={[styles.card, { backgroundColor: COLORS.card }]}>
        {/* Expense / Income selector */}
        <View style={styles.typeSelector}>
          <TouchableOpacity
            style={[
              styles.typeButton,
              isExpense && { backgroundColor: COLORS.expense },
            ]}
            onPress={() => setIsExpense(true)}
          >
            <Ionicons
              name="arrow-down-circle"
              size={22}
              color={COLORS.white}
              style={styles.typeIcon}
            />
            <Text style={[styles.typeButtonText, { color: COLORS.white }]}>Expense</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.typeButton,
              !isExpense && { backgroundColor: COLORS.income },
            ]}
            onPress={() => setIsExpense(false)}
          >
            <Ionicons
              name="arrow-up-circle"
              size={22}
              color={COLORS.white}
              style={styles.typeIcon}
            />
            <Text style={[styles.typeButtonText, { color: COLORS.white }]}>Income</Text>
          </TouchableOpacity>
        </View>

        {/* Amount */}
        <View style={styles.amountContainer}>
          <Text style={[styles.currencySymbol, { color: COLORS.text }]}>$</Text>
          <TextInput
            style={[styles.amountInput, { color: COLORS.text }]}
            placeholder="0.00"
            placeholderTextColor={COLORS.textLight}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
        </View>

        {/* Title */}
        <View style={styles.inputContainer}>
          <Ionicons
            name="create-outline"
            size={22}
            color={COLORS.textLight}
            style={styles.inputIcon}
          />
          <TextInput
            style={[styles.input, { color: COLORS.text }]}
            placeholder="Transaction Title"
            placeholderTextColor={COLORS.textLight}
            value={title}
            onChangeText={setTitle}
          />
        </View>

        {/* Category */}
        <Text style={[styles.sectionTitle, { color: COLORS.text }]}>
          <Ionicons name="pricetag-outline" size={16} color={COLORS.text} /> Category
        </Text>
        <View style={styles.categoryGrid}>
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category.name;
            return (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  isSelected && {
                    backgroundColor: COLORS.primary,
                  },
                ]}
                onPress={() => setSelectedCategory(category.name)}
              >
                <Ionicons
                  name={category.icon}
                  size={20}
                  color={isSelected ? COLORS.white : COLORS.text}
                  style={styles.categoryIcon}
                />
                <Text
                  style={[
                    styles.categoryButtonText,
                    { color: isSelected ? COLORS.white : COLORS.text },
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      )}
    </View>
  );
};

export default CreateScreen;
