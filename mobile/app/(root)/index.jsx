import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import {
  Alert,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "expo-image";
import { styles } from "../../assets/styles/home.styles.js";
import { useTransactions } from "../../hooks/useTransactions.js";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import PageLoader from "../../components/PageLoader.jsx";
import { SignOutButton } from "../../components/SignOutButton.jsx";
import BalanceCard from "../../components/BalanceCard.jsx";
import TransactionItem from "../../components/TransactionItem.jsx";
import NoTransactionsFound from "../../components/NoTransactionsFound.jsx";
import { COLORS } from "../../constants/colors";

export default function Page() {
  const { user } = useUser();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  // Génère un avatar aléatoire basé sur l'email
  const emailPrefix = user?.emailAddresses[0]?.emailAddress.split("@")[0] || "user";
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/png?seed=${emailPrefix}&radius=50&backgroundColor=b6e3f4,c0aede,d1d4f9`;

  const { transactions, summary, isLoading, loadData, deleteTransaction } =
    useTransactions(user?.id);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  useEffect(() => {
    if (user?.id) {
      loadData();
    }
  }, [user?.id, loadData]);

  const handleDelete = (id) => {
    Alert.alert(
      "Delete Transaction",
      "Are you sure you want to delete this transaction?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteTransaction(id);
            } catch (error) {
              Alert.alert(
                "Error",
                "Failed to delete transaction. Please try again."
              );
            }
          },
        },
      ]
    );
  };

  if (isLoading && !refreshing) return <PageLoader />;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={{ uri: avatarUrl }}
              style={styles.headerLogo}
              contentFit="cover"
              transition={1000}
            />
            
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome,</Text>
              <Text style={styles.usernameText}>
                {emailPrefix}
              </Text>
            </View>

            <View style={styles.headerRight}>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => router.push("/create")}
              >
                <Ionicons name="add" size={20} color="#FFF" />
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
            <SignOutButton />
          </View>
        </View>


        <BalanceCard summary={summary} />

          {/* Actions Row */}
          <View style={styles.actionsRow}>
                  <TouchableOpacity
                    style={styles.insertButton}
                    onPress={() => router.push("/analytics")}
                  >
                    <Ionicons name="analytics-outline" size={20} color="#FFF" />
                    <Text style={styles.addButtonText}>Analytics</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                  style={styles.insertButton}
                  onPress={() => router.push("/subscription")}
                >
                  <Ionicons name="calendar-outline" size={20} color="#FFF" />
                  <Text style={styles.addButtonText}>Subscriptions</Text>
                </TouchableOpacity>
          </View>

        <View style={styles.transactionsHeaderContaineur}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
        </View>
      </View>

      <FlatList
        style={styles.transactionsList}
        contentContainerStyle={styles.transactionsListContent}
        data={transactions}
        renderItem={({ item }) => (
          <TransactionItem item={item} onDelete={handleDelete} />
        )}
        ListEmptyComponent={<NoTransactionsFound />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
      />
    </View>
  );
} 