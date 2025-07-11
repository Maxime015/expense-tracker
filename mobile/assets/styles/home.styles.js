// styles/home.styles.js
import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 20,
    paddingBottom: 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 0,
    paddingHorizontal: 0,
    paddingVertical: 12,
    position: "relative",
    bottom: 15,
  },

  headero: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: -5,
    paddingHorizontal: 0,
    paddingVertical: 12,
    bottom: 25,
  },

  headerLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    top: -10,
  },
  TotalCard:{
    top: 0,
    marginBottom: 10,
  },
 headerLogo: {
  width: 50,
  height: 50,
  borderRadius: 25,
  marginRight: 12,
},
  welcomeContainer: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 2,
  },
  usernameText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.text,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    color: COLORS.white,
    fontWeight: "600",
    marginLeft: 4,
  },
  logoutButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  balanceCard: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: 10,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    position: "relative",
    bottom: 15,
  },
  balanceTitle: {
    fontSize: 16,
    color: COLORS.textLight,
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 20,
  },
  balanceStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  balanceStatItem: {
    flex: 1,
    alignItems: "center",
  },
  statDivider: {
    borderRightWidth: 1,
    borderColor: COLORS.border,
  },
  balanceStatLabel: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  balanceStatAmount: {
    fontSize: 18,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 15,
  },
  transactionCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  transactionContent: {
    flex: 1,
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
  },
  categoryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  transactionLeft: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.text,
    marginBottom: 4,
  },
  transactionCategory: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  transactionRight: {
    alignItems: "flex-end",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  deleteButton: {
    padding: 15,
    borderLeftWidth: 1,
    borderLeftColor: COLORS.border,
  },
  transactionsContainer: {
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  emptyState: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  emptyStateIcon: {
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 8,
  },
  emptyStateText: {
    color: COLORS.textLight,
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 20,
  },
  emptyStateButton: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  emptyStateButtonText: {
    color: COLORS.white,
    fontWeight: "600",
    marginLeft: 6,
  },
  transactionsHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
    marginBottom: -10,
    paddingBottom: 5,
  },

    transactionsHeaderContaineur: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 0,
    paddingBottom: 5,
  },
  transactionsList: {
    flex: 1,
    marginHorizontal: 20,
  },
  transactionsListContent: {
    paddingBottom: 20,
  },

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

totalBox: {
  backgroundColor: COLORS.card,
  borderRadius: 20,
  padding: 20,
  marginBottom: 5,
  shadowColor: COLORS.shadow,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 3,
  bottom: 25,
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

insertButton: {
  backgroundColor: COLORS.primary,
  paddingHorizontal: 16,
  paddingVertical: 10,
  borderRadius: 15,
  flexDirection: "row",
  alignItems: "center",
  alignSelf: "flex-start", // ⬅️ empêche de prendre toute la largeur
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
  margin: 'auto',
  bottom: 10,
},

Button: {
  backgroundColor: COLORS.primary,
  paddingHorizontal: 12,
  paddingVertical: 8,
  borderRadius: 12,
  flexDirection: "row",
  alignItems: "center", // Changé pour mieux centrer l'icône et le texte
  position: 'absolute', // Nouvelle propriété
  right: 15, // Position à droite
  top: 20, // Position en bas
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
},

// Nouveaux styles ajoutés
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  activeTab: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 0,
    color: COLORS.primary,
    textAlign: 'center',
    bottom: 30,
  },
  noDataText: {
    textAlign: 'center',
    marginVertical: 40,
    fontSize: 16,
    color: '#666',
  },
  tabContainer: {
  flexDirection: 'row',
  marginVertical: 20,
  borderRadius: 12,
  backgroundColor: '#F9F9F9',
  overflow: 'hidden',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 4,
  elevation: 2,
},
tabContainero: {
  flexDirection: 'row',
  marginVertical: 20,
  borderRadius: 12,
  backgroundColor: '#F9F9F9',
  overflow: 'hidden',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 4,
  elevation: 2,
  bottom: 30,
},
tabButton: {
  flex: 1,
  paddingVertical: 14,
  alignItems: 'center',
  transition: 'all 0.3s ease-in-out',
},
chart: {
  marginVertical: 20,
  borderRadius: 20,
  alignSelf: 'center',
  backgroundColor: '#fff',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 6,
  elevation: 4,
  paddingVertical: 10,
  bottom: 35,
},

Bar: {
  padding: 'auto',
  marginVertical: 20,
  borderRadius: 20,
  alignSelf: 'center',
  backgroundColor: '#fff',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 6,
  elevation: 4,
  paddingVertical: 10,
  bottom: 40,
},

    headerAction: {
    width: 45,
    height: 45,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'coral',
    marginBottom: 4,
  },
});
