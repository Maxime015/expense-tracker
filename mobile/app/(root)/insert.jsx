import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Modal,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { API_URL } from "../../constants/api";
import { styles } from "../../assets/styles/create.styles.js";
import { Ionicons } from "@expo/vector-icons";
import { useThemeStore } from "../../store/themeStore"; // ✅ Thème dynamique
import * as ImagePicker from "expo-image-picker";
import * as Animatable from "react-native-animatable";
import * as ImageManipulator from "expo-image-manipulator";

const recurrenceOptions = ["monthly", "yearly", "weekly"];

const CreateScreen = () => {
  const router = useRouter();
  const { user } = useUser();
  const COLORS = useThemeStore().getCurrentTheme(); // ✅ Thème sombre appliqué ici

  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");
  const [recurrence, setRecurrence] = useState("");
  const [date, setDate] = useState("");
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [showRecurrenceModal, setShowRecurrenceModal] = useState(false);

  const handleInputChange = (value) => {
    setInput(value);
    if (value.length === 8) {
      try {
        const day = parseInt(value.slice(0, 2), 10);
        const month = parseInt(value.slice(2, 4), 10);
        const year = parseInt(value.slice(4, 8), 10);

        if (isNaN(year) || year < 1900 || year > 2100) throw new Error();
        if (isNaN(month) || month < 1 || month > 12) throw new Error();
        const maxDays = new Date(year, month, 0).getDate();
        if (isNaN(day) || day < 1 || day > maxDays) throw new Error();

        const formatted = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        setDate(formatted);
      } catch {
        Alert.alert("Invalid date", "Please enter a valid date in DDMMYYYY format.");
        setInput("");
      }
    }
  };

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied", "We need access to your gallery.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: false,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        setImage(asset.uri);

        const manipulatedImage = await ImageManipulator.manipulateAsync(
          asset.uri,
          [{ resize: { width: 1000 } }],
          {
            compress: 0.5,
            format: ImageManipulator.SaveFormat.JPEG,
            base64: true,
          }
        );

        setImageBase64(manipulatedImage.base64);
      }
    } catch (error) {
      console.error("Image picker error:", error);
      Alert.alert("Error", "Failed to process image");
    }
  };

  const handleCreate = async () => {
    if (!label.trim()) return Alert.alert("Error", "Please enter a subscription label");
    if (!amount || isNaN(parseFloat(amount))) return Alert.alert("Error", "Please enter a valid amount");
    if (!date) return Alert.alert("Error", "Please enter a valid date (DDMMYYYY)");
    if (!recurrence.trim()) return Alert.alert("Error", "Please select a recurrence");

    setIsLoading(true);
    try {
      let imageDataUrl = null;
      if (imageBase64) {
        const uriParts = image.split(".");
        const fileType = uriParts[uriParts.length - 1];
        const imageType = fileType ? `image/${fileType.toLowerCase()}` : "image/jpeg";
        imageDataUrl = `data:${imageType};base64,${imageBase64}`;
      }

      const response = await fetch(`${API_URL}/subscriptions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          label,
          amount,
          date,
          recurrence,
          image: imageDataUrl,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create subscription");
      }

      Alert.alert("Success", "Subscription created successfully");
      router.back();
    } catch (error) {
      Alert.alert("Error", error.message || "An error occurred");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDisplayDate = (inputValue) => {
    let display = "DD / MM / YYYY".split("");
    let inputIndex = 0;

    for (let i = 0; i < display.length; i++) {
      if (display[i] === "D" || display[i] === "M" || display[i] === "Y") {
        if (inputIndex < inputValue.length) {
          display[i] = inputValue[inputIndex];
          inputIndex++;
        }
      }
    }

    return display;
  };

  return (
    <View style={[styles.container, { backgroundColor: COLORS.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: COLORS.text }]}>New Subscription</Text>
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

      {/* Form */}
      <View style={[styles.card, { backgroundColor: COLORS.card }]}>
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

        {/* Label */}
        <View style={styles.inputContainer}>
          <Ionicons
            name="pricetag-outline"
            size={22}
            color={COLORS.textLight}
            style={styles.inputIcon}
          />
          <TextInput
            style={[styles.input, { color: COLORS.text }]}
            placeholder="Subscription Label"
            placeholderTextColor={COLORS.textLight}
            value={label}
            onChangeText={setLabel}
          />
        </View>

        {/* Recurrence */}
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => setShowRecurrenceModal(true)}
        >
          <Ionicons
            name="repeat-outline"
            size={22}
            color={COLORS.textLight}
            style={styles.inputIcon}
          />
          <View style={{ flex: 1, padding: 12 }}>
            <Text style={{ color: recurrence ? COLORS.text : COLORS.textLight }}>
              {recurrence || "Select Recurrence"}
            </Text>
          </View>
          <Ionicons
            name="chevron-down"
            size={20}
            color={COLORS.textLight}
            style={{ marginRight: 12 }}
          />
        </TouchableOpacity>

        {/* Date Input */}
        <View style={{ marginBottom: 20 }}>
          <Text style={[styles.sectionTitle, { color: COLORS.text }]}>Start Date (DDMMYYYY)</Text>
          <View style={{ position: "relative" }}>
            <TextInput
              keyboardType="number-pad"
              maxLength={8}
              onChangeText={handleInputChange}
              returnKeyType="done"
              style={{
                height: 50,
                backgroundColor: "transparent",
                paddingHorizontal: 16,
                borderRadius: 12,
                fontSize: 15,
                fontWeight: "500",
                color: "transparent",
                borderWidth: 1,
                borderColor: COLORS.border,
                zIndex: 2,
              }}
              value={input}
            />
            <View
              style={{
                backgroundColor: COLORS.card,
                borderRadius: 12,
                zIndex: 1,
                position: "absolute",
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
                width: "100%",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 16,
              }}
            >
              {formatDisplayDate(input).map((char, i) => {
                const isSlash = char === "/";
                const isPlaceholder = ["D", "M", "Y"].includes(char);

                return (
                  <Text
                    key={i}
                    style={{
                      fontSize: 28,
                      fontWeight: "600",
                      color: isPlaceholder ? COLORS.textLight : COLORS.text,
                      marginHorizontal: isSlash ? 5 : 0,
                    }}
                  >
                    {char}
                  </Text>
                );
              })}
            </View>
          </View>
        </View>

        {/* Image Picker */}
        <Text style={[styles.sectionTitle, { color: COLORS.text }]}>Subscription Image</Text>
        <TouchableOpacity
          onPress={pickImage}
          style={[
            styles.inputContainer,
            {
              height: 180,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: COLORS.card,
            },
          ]}
        >
          {image ? (
            <Animatable.Image
              animation="fadeIn"
              duration={600}
              source={{ uri: image }}
              style={{ width: "100%", height: "100%", borderRadius: 12 }}
              resizeMode="cover"
            />
          ) : (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Ionicons name="image-outline" size={40} color={COLORS.textLight} />
              <Text style={{ color: COLORS.textLight }}>Tap to select image</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Recurrence Modal */}
      <Modal
        visible={showRecurrenceModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowRecurrenceModal(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: COLORS.card, margin: 20, borderRadius: 16, padding: 20 }}>
            {recurrenceOptions.map((option) => (
              <Pressable
                key={option}
                style={({ pressed }) => [
                  { padding: 16, borderRadius: 8 },
                  pressed && { backgroundColor: COLORS.border },
                  recurrence === option && { backgroundColor: COLORS.primary },
                ]}
                onPress={() => {
                  setRecurrence(option);
                  setShowRecurrenceModal(false);
                }}
              >
                <Text style={[
                  { fontSize: 16, color: COLORS.text },
                  recurrence === option && { color: "#fff" },
                ]}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </Modal>

      {/* Loading Spinner */}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      )}
    </View>
  );
};

export default CreateScreen;
