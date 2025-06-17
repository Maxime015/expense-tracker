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
import { useSubscriptions } from "../../hooks/useSubscriptions.js";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import PageLoader from "../../components/PageLoader.jsx";
import { SignOutButton } from "../../components/SignOutButton.jsx";
import TotalCard from "../../components/TotalCard.jsx";
import SubscriptionItem from "../../components/SubscriptionItem.jsx";
import NoSubscriptionsFound from "../../components/NoSubscriptionsFound.jsx";

export default function Sub() {
  const { user } = useUser();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const { subscriptions, summary, isLoading, loadData, deleteSubscription } =
    useSubscriptions(user.id);

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
      "Delete Subscription",
      "Are your sure you want to delete this subscription?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteSubscription(id);
            } catch (error) {
              Alert.alert(
                "Error",
                "Failed to delete subscription. Please try again."
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

    
        <TotalCard summary={summary} />

        <View style={styles.transactionsHeaderContainer}>
          <Text style={styles.sectionTitle}>Recent Subscriptions</Text>
        </View>
      </View>

      <FlatList
        style={styles.transactionsList}
        contentContainerStyle={styles.transactionsListContent}
        data={subscriptions}
        renderItem={({ item }) => (
          <SubscriptionItem item={item} onDelete={handleDelete} />
        )}
        ListEmptyComponent={<NoSubscriptionsFound />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}
