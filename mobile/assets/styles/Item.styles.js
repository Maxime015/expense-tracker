// styles/Item.styles.js
import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export const styles = StyleSheet.create({
  subscriptionCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  subscriptionContent: {
    flex: 1,
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center',
  },
  subscriptionIconContainer: {
    width: 60,  // Augmenté de 44 à 56
    height: 60, // Augmenté de 44 à 56
    borderRadius: 14, // Légèrement augmenté
    backgroundColor: 'rgba(118, 118, 128, 0.08)', // Plus transparent
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  subscriptionImage: {
    width: 50,  // Nouveau style pour l'image
    height: 50, // Taille augmentée
    borderRadius: 8,
  },
  subscriptionLeft: {
    flex: 1,
  },
  subscriptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  subscriptionRecurrence: {
    fontSize: 13,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  subscriptionRight: {
    alignItems: 'flex-end',
  },
  subscriptionAmount: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
    color: COLORS.expense,
  },
  subscriptionDate: {
    fontSize: 12,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  subscriptionDeleteButton: {
    padding: 16,
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(118, 118, 128, 0.12)',
  },
});