import { styles } from "@/assets/styles/groceries.styles";
import { COLORS } from "../../constants/colors";
import EmptyState from "@/components/EmptyState";
import Header from "@/components/Header";
//import LoadingSpinner from "@/components/LoadingSpinner";
import TodoInput from "@/components/TodoInput";
import { useGroceries } from "@/hooks/useGroceries";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, FlatList, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@clerk/clerk-expo";

export default function GroceriesScreen() {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const { user } = useUser();

  // Utilisation du hook useGroceries
 const {
  groceries,
  groceriesSummary,
  isLoading,
  error,
  loadData,
  addGrocerie,
  updateGrocerie,
  toggleGrocerie,
  deleteGrocerie, // Assurez-vous que c'est bien écrit (et non deleteGrocerie)
  clearAllGroceries,
} = useGroceries(user?.id);

  // if (isLoading) return <LoadingSpinner />;

  const handleToggleGrocerie = async (id) => {
    try {
      await toggleGrocerie(id);
    } catch (error) {
      console.log("Error toggling grocery", error);
    }
  };


 const handleDeleteGrocerie = async (id) => {
  if (!id) {
    console.error("ID is undefined - cannot delete");
    return;
  }
  
  Alert.alert("Supprimer", "Voulez-vous vraiment supprimer cet article ?", [
    { text: "Annuler", style: "cancel" },
    { 
      text: "Supprimer", 
      style: "destructive", 
      onPress: async () => {
        try {
          console.log("Attempting to delete grocery with ID:", id); // Debug log
          await deleteGrocerie(id);
        } catch (error) {
          console.log("Erreur suppression", error);
          Alert.alert("Erreur", error.message || "Échec de la suppression");
        }
      } 
    },
  ]);
};


  const handleEditGrocerie = (grocerie) => {
    setEditText(grocerie.text);
    setEditingId(grocerie.id);
  };

  const handleSaveEdit = async () => {
    if (editingId && editText.trim()) {
      try {
        await updateGrocerie(editingId, editText.trim());
        setEditingId(null);
        setEditText("");
      } catch (error) {
        console.log("Error updating grocery", error);
        Alert.alert("Error", "Failed to update grocery");
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const renderGrocerieItem = ({ item }) => {
    const isEditing = editingId === item.id;
    return (
      <View style={styles.todoItemWrapper}>
        <View style={styles.todoItem}>
          <TouchableOpacity
            style={styles.checkbox}
            activeOpacity={0.7}
            onPress={() => handleToggleGrocerie(item.id)}
          >
            <View
              style={[
                styles.checkboxInner,
                item.is_completed && { backgroundColor: COLORS.success || COLORS.income, borderColor: "transparent" },
              ]}
            >
              {item.is_completed && <Ionicons name="checkmark" size={18} color="#fff" />}
            </View>
          </TouchableOpacity>

          {isEditing ? (
            <View style={styles.editContainer}>
              <TextInput
                style={styles.editInput}
                value={editText}
                onChangeText={setEditText}
                autoFocus
                multiline
                placeholder="Edit your grocery..."
                placeholderTextColor={COLORS.textLight}
              />
              <View style={styles.editButtons}>
                <TouchableOpacity 
                  onPress={handleSaveEdit} 
                  activeOpacity={0.8}
                  style={[styles.editButton, { backgroundColor: COLORS.success || COLORS.income }]}
                >
                  <Ionicons name="checkmark" size={16} color="#fff" />
                  <Text style={styles.editButtonText}>Save</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress={handleCancelEdit} 
                  activeOpacity={0.8}
                  style={[styles.editButton, { backgroundColor: COLORS.border }]}
                >
                  <Ionicons name="close" size={16} color={COLORS.text} />
                  <Text style={[styles.editButtonText, { color: COLORS.text }]}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.todoTextContainer}>
              <Text
                style={[
                  styles.todoText,
                  item.is_completed && {
                    textDecorationLine: "line-through",
                    color: COLORS.textLight,
                    opacity: 0.6,
                  },
                ]}
              >
                {item.text}
              </Text>

              <View style={styles.todoActions}>
                <TouchableOpacity 
                  onPress={() => handleEditGrocerie(item)} 
                  activeOpacity={0.8}
                  style={[styles.actionButton, { backgroundColor: COLORS.count }]}
                >
                  <Ionicons name="pencil" size={14} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => handleDeleteGrocerie(item.id)} // Utilisez item.id plutôt que item._id
                  activeOpacity={0.8}
                  style={[styles.actionButton, { backgroundColor: COLORS.expense }]}
                >
                  <Ionicons name="trash" size={14} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
  <View style={styles.container}>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView style={styles.safeArea}>
      <Header groceriesSummary={groceriesSummary} />
      
      <View style={{ flex: 1 }}>
        <FlatList
          data={groceries}
          renderItem={renderGrocerieItem}
          keyExtractor={(item) => item.id.toString()} // Utilisez uniquement item.id
          style={styles.todoList}
          contentContainerStyle={[
            styles.todoListContent,
            groceries.length === 0 && { flexGrow: 1 }
          ]}
          ListEmptyComponent={<EmptyState />}
        />
      </View>

      {/* Pas besoin de KeyboardAvoidingView ici, il est déjà dans TodoInput */}
      <TodoInput onAddTodo={addGrocerie} />
    </SafeAreaView>
  </View>
);
}