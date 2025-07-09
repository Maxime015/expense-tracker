import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export const styles = StyleSheet.create({
    loadingContainer: { 
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: COLORS.background,
    },
    loadingText: {
      marginTop: 20,
      fontSize: 18,
      fontWeight: "500",
      color: COLORS.text,
    },
    
    inputSection: {
      paddingHorizontal: 24,
      paddingBottom: 12,
    },
    inputWrapper: {
      flexDirection: "row",
      alignItems: "flex-end",
      gap: 16,
    },
    input: {
      flex: 1,
      borderWidth: 2,
      borderRadius: 20,
      paddingHorizontal: 20,
      paddingVertical: 16,
      fontSize: 17,
      maxHeight: 120,
      fontWeight: "500",
      backgroundColor: COLORS.card,
      borderColor: COLORS.border,
      color: COLORS.text,
    },
    inputFocused: {
      borderColor: COLORS.primary,
    },
    addButton: {
      width: 56,
      height: 56,
      borderRadius: 28,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: COLORS.primary,
    },
    addButtonDisabled: {
      opacity: 0.5,
    },
    todoList: {
      flex: 1,
    },
    emptyListContainer: {
      flexGrow: 1,
      justifyContent: "center",
    },
    todoItemWrapper: {
      marginVertical: 12,
    },
    todoItem: {
      flexDirection: "row",
      alignItems: "flex-start",
      padding: 20,
      borderRadius: 20,
      backgroundColor: COLORS.card,
      shadowColor: COLORS.shadow,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 8,
    },
    checkbox: {
      marginRight: 16,
      marginTop: 2,
    },
    checkboxInner: {
      width: 32,
      height: 32,
      borderRadius: 16,
      borderWidth: 2,
      justifyContent: "center",
      alignItems: "center",
      borderColor: COLORS.primary,
    },
    todoTextContainer: {
      flex: 1,
    },
    todoText: {
      fontSize: 17,
      lineHeight: 24,
      fontWeight: "500",
      marginBottom: 16,
      color: COLORS.text,
    },
    todoActions: {
      flexDirection: "row",
      gap: 12,
    },
    actionButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: COLORS.primary,
    },
    editContainer: {
      flex: 1,
    },
    editInput: {
      borderWidth: 2,
      borderRadius: 16,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 17,
      fontWeight: "500",
      marginBottom: 16,
      backgroundColor: COLORS.card,
      borderColor: COLORS.primary,
      color: COLORS.text,
    },
    editButtons: {
      flexDirection: "row",
      gap: 12,
    },
    editButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 12,
      backgroundColor: COLORS.primary,
    },
    editButtonText: {
      color: COLORS.white,
      fontSize: 14,
      fontWeight: "600",
    },

    emptyText: {
      fontSize: 24,
      fontWeight: "700",
      marginBottom: 8,
      color: COLORS.text,
    },
    emptySubtext: {
      fontSize: 17,
      textAlign: "center",
      paddingHorizontal: 40,
      lineHeight: 24,
      color: COLORS.textLight,
    },

 container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 0,
    paddingHorizontal: 4, // Ajout de padding horizontal
  },
    safeArea: {
      flex: 1,
      backgroundColor: COLORS.background,
      paddingTop: 0, // Ajout pour s'assurer qu'il n'y a pas de padding en haut
    },
   emptyContainer: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 80,
      position: "relative", // Changé de 'absolute' à 'relative'
      bottom: 98,               // Réinitialisé
      zIndex: 5,
    },
    emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    backgroundColor: COLORS.border,
  },
todoListContent: {
  paddingHorizontal: 24,
  paddingTop: 16, // Ajouté pour l'espace sous le header
  paddingBottom: 160, // pour laisser plus d'espace à TodoInput
},
});