// styles/home.styles.js
import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export const styles = StyleSheet.create({
  totalCard: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 16,
    marginBottom: 8,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },

  totalStats: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  totalStatItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  iconItem: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#ffdada',
    borderRadius: 50,
    paddingHorizontal: 4,
    paddingVertical: 8,
  },

  totalstatDivider: {
    width: 1,
    height: "70%",
    backgroundColor: COLORS.border,
    marginHorizontal: 4,
  },

  totalStatLabel: {
    fontSize: 14,
    color: COLORS.primary,
    marginBottom: 4,
    fontWeight: "600",
  },

  totalStatAmount: {
    fontSize: 18,
    fontWeight: "bold",
  },
});