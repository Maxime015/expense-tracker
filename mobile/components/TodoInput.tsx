import { styles } from "@/assets/styles/groceries.styles";
import { COLORS } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { 
  Alert, 
  TextInput, 
  TouchableOpacity, 
  View, 
  KeyboardAvoidingView,
  Platform 
} from "react-native";

interface TodoInputProps {
  onAddTodo: (text: string) => Promise<boolean>;
}

const TodoInput = ({ onAddTodo }: TodoInputProps) => {
  const [newTodo, setNewTodo] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleAddTodo = async () => {
    if (newTodo.trim()) {
      try {
        const success = await onAddTodo(newTodo.trim());
        if (success) {
          setNewTodo("");
        }
      } catch (error) {
        console.log("Error adding a todo", error);
        Alert.alert("Error", "Failed to add todo");
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <View style={styles.inputSection}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.input, isFocused && styles.inputFocused]}
            placeholder="What needs to be done?"
            value={newTodo}
            onChangeText={setNewTodo}
            onSubmitEditing={handleAddTodo}
            placeholderTextColor={COLORS.textLight}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <TouchableOpacity 
            onPress={handleAddTodo} 
            activeOpacity={0.8} 
            disabled={!newTodo.trim()}
            style={[styles.addButton, !newTodo.trim() && styles.addButtonDisabled]}
          >
            <Ionicons name="add" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default TodoInput;