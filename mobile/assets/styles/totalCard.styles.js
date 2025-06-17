// styles/home.styles.js
import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export const styles = StyleSheet.create({
  
totalCard: {
  backgroundColor: COLORS.card,
  borderRadius: 20,
  padding: 20,
  marginBottom: 20,
  shadowColor: COLORS.shadow,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 3,
},

totalStats: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-evenly",
},

totalStatItem: {
  flex: 1,
  alignItems: "center",
},

totalstatDivider: {
  width: 1,
  height: "70%",
  backgroundColor: COLORS.border,
  marginHorizontal: 10,
},

totalStatLabel: {
  fontSize: 18,
  color: COLORS.primary,
  marginBottom: 4,
  fontWeight: "600",
},

totalStatAmount: {
  fontSize: 20,
  fontWeight: "bold",
},

});

