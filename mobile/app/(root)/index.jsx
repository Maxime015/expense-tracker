import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
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

export default function Page() {
  const { user } = useUser();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const { transactions, summary, isLoading, loadData, deleteTransaction } =
    useTransactions(user.id);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };
  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleDelete = (id) => {
    Alert.alert(
      "Delete Transaction",
      "Are your sure you want to delete this transaction?",
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
              source={require("../../assets/images/logo.png")}
              style={styles.headerLogo}
              contentFit="contain"
            />
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome,</Text>
              <Text style={styles.usernameText}>
                {user?.emailAddresses[0]?.emailAddress.split("@")[0]}
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

      
         <TouchableOpacity
                style={styles.addButton}
                onPress={() => router.push("/subscription")}
              >
                <Ionicons name="add" size={20} color="#FFF" />
                <Text style={styles.addButtonText}>Subscriptions</Text>
          </TouchableOpacity>
    

        <BalanceCard summary={summary} />

        <View style={styles.transactionsHeaderContainer}>
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
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}
